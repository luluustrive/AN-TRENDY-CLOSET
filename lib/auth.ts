/**
 * AN Trendy Closet - Secure Authentication & Authorization Core Service
 * Production-ready server-side auth utilities
 */

import { cookies } from "next/headers";
import { DbUser } from "./db/schema";

export const AUTH_COOKIE_NAME = "an_session_token";

// In-memory mock session table for non-DB mode fallback
const activeSessions: Map<string, { user: DbUser; expiresAt: number }> = new Map();

// Helper for Web Crypto password hashing
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "_AN_TRENDY_SECRET_SALT_2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const computed = await hashPassword(password);
  return computed === hash;
}

export function createSession(user: DbUser): string {
  const token = `an_sess_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  activeSessions.set(token, { user, expiresAt });
  return token;
}

export async function getAuthenticatedUser(): Promise<DbUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;

    const session = activeSessions.get(token);
    if (!session) return null;

    if (Date.now() > session.expiresAt) {
      activeSessions.delete(token);
      return null;
    }

    return session.user;
  } catch (e) {
    return null;
  }
}

export function hasPermission(
  userRole: DbUser["role"],
  requiredRole: "super_admin" | "admin" | "order_manager" | "product_manager" | "support_agent" | "customer"
): boolean {
  if (userRole === "super_admin") return true;
  if (userRole === "admin") return requiredRole !== "super_admin";
  if (userRole === "product_manager" && requiredRole === "product_manager") return true;
  if (userRole === "order_manager" && requiredRole === "order_manager") return true;
  if (userRole === "support_agent" && requiredRole === "support_agent") return true;
  if (userRole === "customer" && requiredRole === "customer") return true;
  return false;
}
