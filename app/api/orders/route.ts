import { NextResponse } from "next/server";
import productsDataRaw from "@/data/products.json";
import { getAuthenticatedUser } from "@/lib/auth";
import { Product } from "@/lib/types";

interface CartReqItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await request.json();
    const { items, customerName, customerEmail, customerPhone, deliveryAddress, deliveryDivision, deliveryDistrict, paymentMethod, couponCode } = body;

    if (!items || !Array.isArray(items) || items.length === 0 || !customerName || !customerPhone || !deliveryAddress) {
      return NextResponse.json(
        { error: "Missing required checkout details (items, customer name, phone, address)." },
        { status: 400 }
      );
    }

    const allProducts = productsDataRaw as unknown as Product[];
    let recalculatedSubtotal = 0;
    const validatedOrderItems = [];

    // Recalculate prices server-side strictly (NEVER trust client-sent item prices)
    for (const item of items as CartReqItem[]) {
      const dbProduct = allProducts.find((p) => p.id === item.productId);
      if (!dbProduct) {
        return NextResponse.json({ error: `Product ID "${item.productId}" is not available.` }, { status: 400 });
      }
      if (!dbProduct.inStock || dbProduct.stockCount < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for product "${dbProduct.name}".` }, { status: 400 });
      }

      const itemTotal = dbProduct.price * item.quantity;
      recalculatedSubtotal += itemTotal;
      validatedOrderItems.push({
        productId: dbProduct.id,
        name: dbProduct.name,
        price: dbProduct.price,
        quantity: item.quantity,
        color: item.selectedColor || (dbProduct.colors?.[0]?.name ?? ""),
        size: item.selectedSize || (dbProduct.sizes?.[0] ?? ""),
        image: dbProduct.images[0],
      });
    }

    // Shipping rules: Dhaka 70 BDT, Outside Dhaka 130 BDT
    const shippingFee = deliveryDivision?.toLowerCase().includes("dhaka") || deliveryDistrict?.toLowerCase().includes("dhaka") ? 70 : 130;

    // Coupon verification
    let discountAmount = 0;
    if (couponCode) {
      const code = couponCode.trim().toUpperCase();
      if (code === "ANLUXURY10" || code === "SAVE10" || code === "WELCOME10") {
        discountAmount = Math.round(recalculatedSubtotal * 0.1);
      }
    }

    const finalTotal = Math.max(0, recalculatedSubtotal + shippingFee - discountAmount);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `ANC-ORD-${dateStr}-${randomSuffix}`;

    const createdOrder = {
      id: orderNumber,
      orderNumber,
      userId: user?.id,
      customerName,
      customerEmail: customerEmail || "",
      customerPhone,
      deliveryAddress: `${deliveryAddress}, ${deliveryDistrict || ""}, ${deliveryDivision || ""}`,
      subtotal: recalculatedSubtotal,
      shippingFee,
      discountAmount,
      couponCode: couponCode || null,
      total: finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Pending",
      orderStatus: "Pending",
      items: validatedOrderItems,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      order: createdOrder,
      message: `Order #${orderNumber} created successfully!`,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process order creation." }, { status: 500 });
  }
}
