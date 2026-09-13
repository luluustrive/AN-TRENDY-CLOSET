import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, currency: string = "৳"): string {
  return `${currency}${price.toLocaleString("en-BD")}`;
}

export function calculateDiscount(price: number, originalPrice: number): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function getStarRating(rating: number): string[] {
  const stars: string[] = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push("full");
    } else if (i - 0.5 <= rating) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }
  return stars;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getTimeRemaining(endDate: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const total = new Date(endDate).getTime() - Date.now();
  return {
    total,
    days: Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24))),
    hours: Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24)),
    minutes: Math.max(0, Math.floor((total / (1000 * 60)) % 60)),
    seconds: Math.max(0, Math.floor((total / 1000) % 60)),
  };
}
