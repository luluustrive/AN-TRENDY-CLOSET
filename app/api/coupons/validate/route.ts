import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code, subtotal } = await request.json();
    if (!code) {
      return NextResponse.json({ valid: false, error: "Coupon code is required." }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "ANLUXURY10" || cleanCode === "SAVE10" || cleanCode === "WELCOME10") {
      const discountPercentage = 10;
      const discountAmount = Math.round((subtotal || 0) * 0.1);
      return NextResponse.json({
        valid: true,
        code: cleanCode,
        discountPercentage,
        discountAmount,
        message: "10% Luxury discount applied!",
      });
    }

    return NextResponse.json(
      { valid: false, error: "Invalid or expired coupon code." },
      { status: 400 }
    );
  } catch (e) {
    return NextResponse.json({ valid: false, error: "Validation failed." }, { status: 500 });
  }
}
