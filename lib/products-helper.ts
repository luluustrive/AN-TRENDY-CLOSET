import productsJson from "@/data/products.json";
import { Product } from "@/lib/types";

export const productsData: Product[] = (productsJson as unknown) as Product[];

export function getProductById(id: string): Product | undefined {
  return productsData.find((p) => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "all") return productsData;
  return productsData.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return productsData.filter((p) => p.isFeatured);
}

export function getNewArrivals(): Product[] {
  return productsData.filter((p) => p.isNewArrival);
}

export function getBestSellers(): Product[] {
  return productsData.filter((p) => p.isBestSeller);
}

export function getFlashSaleProducts(): Product[] {
  return productsData.filter((p) => p.isFlashSale);
}
