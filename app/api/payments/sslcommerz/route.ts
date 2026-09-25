import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { orderId, amount, customerName, customerEmail } = await request.json();

    const storeId = process.env.SSLCOMMERZ_STORE_ID;
    const storePass = process.env.SSLCOMMERZ_STORE_PASS;

    if (!storeId || !storePass) {
      return NextResponse.json({
        success: false,
        status: "NOT_CONFIGURED",
        message: "SSLCommerz Gateway credentials missing. Please configure SSLCOMMERZ_STORE_ID & SSLCOMMERZ_STORE_PASS in environment.",
        orderId,
      });
    }

    const gatewayUrl = `https://sandbox.sslcommerz.com/gwprocess/v4/api.php`;
    return NextResponse.json({
      success: true,
      status: "INITIATED",
      gatewayUrl,
      orderId,
    });
  } catch (error) {
    return NextResponse.json({ error: "SSLCommerz gateway initiation failed" }, { status: 500 });
  }
}
