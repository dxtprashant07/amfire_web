import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { Role } from "@/generated/prisma/client";

function getSecret(envVar: string, label: string): Uint8Array {
  const val = process.env[envVar];
  if (!val) throw new Error(`${label} (${envVar}) is not set`);
  return new TextEncoder().encode(val);
}

let _accessSecret: Uint8Array | null = null;
let _refreshSecret: Uint8Array | null = null;

function accessSecret() {
  return (_accessSecret ??= getSecret("JWT_ACCESS_SECRET", "Access token secret"));
}
function refreshSecret() {
  return (_refreshSecret ??= getSecret("JWT_REFRESH_SECRET", "Refresh token secret"));
}

export interface TokenPayload {
  sub: string;
  email: string;
  role: Role;
  name: string;
}

/** Create a short-lived access token (15 min) */
export async function createAccessToken(payload: TokenPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("amfire")
    .setAudience("amfire-api")
    .setExpirationTime("15m")
    .sign(accessSecret());
}

/** Create a long-lived refresh token (7 days) */
export async function createRefreshToken(payload: TokenPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("amfire")
    .setAudience("amfire-api")
    .setExpirationTime("7d")
    .sign(refreshSecret());
}

/** Verify an access token */
export async function verifyAccessToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, accessSecret(), {
      issuer: "amfire",
      audience: "amfire-api",
    });
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

/** Verify a refresh token */
export async function verifyRefreshToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, refreshSecret(), {
      issuer: "amfire",
      audience: "amfire-api",
    });
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

/** Set the refresh token as an httpOnly cookie */
export async function setRefreshCookie(token: string) {
  const jar = await cookies();
  jar.set("amfire_refresh", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/** Clear the refresh cookie on logout */
export async function clearRefreshCookie() {
  const jar = await cookies();
  jar.delete("amfire_refresh");
}

/** Read refresh token from cookies (server-side) */
export async function getRefreshCookie(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get("amfire_refresh")?.value;
}

/** Login lockout: 5 failures = 15 min lock */
export const MAX_FAILED_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000;
