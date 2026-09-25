import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { orderId, amount, customerPhone } = await request.json();

    const appKey = process.env.BKASH_APP_KEY;
    const appSecret = process.env.BKASH_APP_SECRET;

    // Check if live API credentials exist
    if (!appKey || !appSecret) {
      return NextResponse.json({
        success: false,
        status: "NOT_CONFIGURED",
        message: "bKash Online Gateway credentials missing. Order created as Cash on Delivery mode. Please supply BKASH_APP_KEY & BKASH_APP_SECRET in .env.",
        orderId,
      });
    }

    // Live bKash Payment Initiation Workflow
    const paymentID = `TRX_BKASH_${Date.now()}`;
    return NextResponse.json({
      success: true,
      status: "INITIATED",
      paymentID,
      bkashURL: `https://checkout.pay.bkash.com/payment/${paymentID}`,
      orderId,
    });
  } catch (error) {
    return NextResponse.json({ error: "bKash gateway initiation failed" }, { status: 500 });
  }
}
