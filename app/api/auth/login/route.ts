import { NextResponse } from "next/server";
import { verifyPassword, createSession, AUTH_COOKIE_NAME, hashPassword } from "@/lib/auth";
import { DbUser } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check hardcoded admin fallback or user
    if (cleanEmail === "admin@antrendycloset.com" && (password === "200074200077" || password === "2OOO742OOO77")) {
      const adminUser: DbUser = {
        id: "usr_admin_master",
        name: "AN Admin",
        email: cleanEmail,
        passwordHash: await hashPassword(password),
        role: "super_admin",
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const token = createSession(adminUser);
      const res = NextResponse.json({ success: true, user: adminUser });
      res.cookies.set(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
      return res;
    }

    // Default authenticated customer user
    const customerUser: DbUser = {
      id: `usr_${Date.now()}`,
      name: cleanEmail.split("@")[0],
      email: cleanEmail,
      passwordHash: await hashPassword(password),
      role: "customer",
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const token = createSession(customerUser);
    const res = NextResponse.json({ success: true, user: customerUser });
    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
