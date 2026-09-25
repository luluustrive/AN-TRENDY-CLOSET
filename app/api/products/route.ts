import { NextResponse } from "next/server";
import productsDataRaw from "@/data/products.json";
import { getAuthenticatedUser, hasPermission } from "@/lib/auth";
import { Product } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const filter = searchParams.get("filter");

  let products = [...(productsDataRaw as unknown as Product[])];

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (category && category !== "all") {
    products = products.filter((p) => p.categorySlug === category);
  }

  if (filter === "new-arrivals") products = products.filter((p) => p.isNewArrival);
  if (filter === "bestseller") products = products.filter((p) => p.isBestSeller);
  if (filter === "flash-sale") products = products.filter((p) => p.isFlashSale);

  return NextResponse.json({ success: true, count: products.length, products });
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user || !hasPermission(user.role, "product_manager")) {
    return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const createdProduct: Product = {
      ...body,
      id: `prod_${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json({ success: true, product: createdProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product." }, { status: 400 });
  }
}
