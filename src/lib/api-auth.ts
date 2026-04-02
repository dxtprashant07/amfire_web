import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, type TokenPayload } from "@/lib/auth";

/** Extract and verify the Bearer token from a request. Returns payload or error response. */
export async function requireAuth(
  req: NextRequest,
  allowedRoles?: string[]
): Promise<{ payload: TokenPayload } | { error: NextResponse }> {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const payload = await verifyAccessToken(auth.slice(7));
  if (!payload) {
    return { error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
  }

  if (allowedRoles && !allowedRoles.includes(payload.role)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { payload };
}
