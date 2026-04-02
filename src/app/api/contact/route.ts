import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { createZohoLead, isZohoConfigured } from "@/lib/zoho";
import { prisma } from "@/lib/db";

/* ── Simple in-memory rate limiter (per IP, resets on server restart) ─ */
const rateLimit = new Map<string, { count: number; reset: number }>();
const LIMIT = 5;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 422 });
  }

  const data = parsed.data;

  // Save lead to database
  try {
    await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        budget: data.budget,
        timeline: data.timeline,
        message: data.message,
        source: "website",
        ip,
      },
    });
  } catch (err) {
    console.error("[contact] Failed to save lead:", err);
  }

  // Push to Zoho CRM if configured (fire-and-forget)
  if (isZohoConfigured()) {
    createZohoLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      budget: data.budget,
      timeline: data.timeline,
      message: data.message,
      source: "Website Contact Form",
    }).catch((err) => console.error("[contact] Zoho CRM push failed:", err));
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
