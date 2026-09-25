import { NextResponse } from "next/server";
import { hashPassword, createSession, AUTH_COOKIE_NAME } from "@/lib/auth";
import { DbUser } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const newUser: DbUser = {
      id: `usr_${Date.now()}`,
      name,
      email: email.toLowerCase().trim(),
      phone: phone || "",
      passwordHash,
      role: "customer",
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const token = createSession(newUser);
    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register user." },
      { status: 500 }
    );
  }
}
