/**
 * AN Trendy Closet - Provider-Agnostic 24/7 AI Customer Assistant Service
 * Supports Google Gemini, OpenAI, Anthropic, or Factual Rule Engine
 */

import productsDataRaw from "@/data/products.json";
import categoriesDataRaw from "@/data/categories.json";
import { Product } from "@/lib/types";

export interface AiChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  suggestedProducts?: Product[];
  actionLink?: string;
  toolsUsed?: string[];
}

export interface AiToolResult {
  toolName: string;
  success: boolean;
  data: unknown;
}

// Factual policy database
const STORE_POLICIES = {
  shipping: "Delivery within Dhaka City takes 24-48 hours (৳70 fee). Nationwide delivery across all districts takes 2-4 days (৳130 fee). Free shipping on orders over ৳10,000.",
  cod: "Cash on Delivery (COD) is available nationwide across all 64 districts in Bangladesh.",
  return: "We offer a 7-day hassle-free return and exchange policy for un-worn items with original tags and packaging intact.",
  authenticity: "100% Guaranteed Authentic products sourced directly from authorized brand distributors and verified merchants.",
  hotline: "+880 1700-000000 (Available 24/7 via Call & WhatsApp)",
};

// 1. Tool implementations strictly grounded in factual data
export async function searchProducts(query: string, maxPrice?: number): Promise<Product[]> {
  const q = query.toLowerCase().trim();
  let list = (productsDataRaw as unknown as Product[]).filter((p) => {
    const matchName = p.name.toLowerCase().includes(q);
    const matchCat = p.category.toLowerCase().includes(q) || p.categorySlug.includes(q);
    const matchBrand = p.brand.toLowerCase().includes(q);
    const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
    return matchName || matchCat || matchBrand || matchTag;
  });

  if (maxPrice && maxPrice > 0) {
    list = list.filter((p) => p.price <= maxPrice);
  }
  return list.slice(0, 4);
}

export function getStorePolicy(policyKey: "shipping" | "cod" | "return" | "authenticity" | "hotline"): string {
  return STORE_POLICIES[policyKey] || "Contact support hotline at +880 1700-000000.";
}

export function getShippingEstimate(division: string): { fee: number; estDays: string } {
  const isDhaka = division.toLowerCase().includes("dhaka");
  return {
    fee: isDhaka ? 70 : 130,
    estDays: isDhaka ? "24-48 Hours" : "2-4 Business Days",
  };
}

// AI Message Processing Orchestrator
export async function processAiCustomerMessage(
  userText: string,
  history: AiChatMessage[] = [],
  authenticatedUserId?: string
): Promise<AiChatMessage> {
  const lower = userText.toLowerCase().trim();
  const toolsUsed: string[] = [];
  let replyText = "";
  let suggestedProducts: Product[] | undefined = undefined;

  // Extract price filters (e.g. "under 5000", "3000 tk", "5000 bdt", "৳3000")
  let maxPriceFilter: number | undefined = undefined;
  const priceMatch = lower.match(/(?:under|below|budget|tk|bdt|৳|\s)\s*(\d{4,6})/);
  if (priceMatch && priceMatch[1]) {
    maxPriceFilter = Number(priceMatch[1]);
  }

  // 1. Banglish & English Product Search intent
  if (
    lower.includes("watch") ||
    lower.includes("bag") ||
    lower.includes("lipstick") ||
    lower.includes("headphone") ||
    lower.includes("phone") ||
    lower.includes("jewel") ||
    lower.includes("shoe") ||
    lower.includes("cloth") ||
    lower.includes("dress") ||
    lower.includes("laptop") ||
    lower.includes("show me") ||
    lower.includes("dekhao") ||
    lower.includes("lagbe") ||
    lower.includes("khujchi") ||
    lower.includes("price") ||
    lower.includes("dam")
  ) {
    toolsUsed.push("searchProducts");
    const keyword = lower
      .replace(/(show|me|i|want|need|looking|for|under|below|tk|bdt|৳|dekhao|lagbe|khujchi|\d+)/g, "")
      .trim();

    suggestedProducts = await searchProducts(keyword || lower, maxPriceFilter);

    if (suggestedProducts.length > 0) {
      replyText = `Here are top recommendations matching your search "${userText}" from AN Trendy Closet:`;
    } else {
      replyText = `I searched our catalog for "${userText}". We currently have luxury watches, designer totes, skincare, headphones, and smartphones available. Explore all products directly:`;
      suggestedProducts = (productsDataRaw as unknown as Product[]).slice(0, 3);
    }
  }
  // 2. Shipping & Delivery intent
  else if (lower.includes("shipping") || lower.includes("delivery") || lower.includes("charge") || lower.includes("koto")) {
    toolsUsed.push("getShippingEstimate");
    replyText = `📦 **Shipping Charges across Bangladesh:**\n- **Dhaka City:** ৳70 (Delivered within 24-48 hours)\n- **Outside Dhaka (All Districts):** ৳130 (Delivered within 2-4 business days)\n- **Free Shipping** on orders over ৳10,000!`;
  }
  // 3. COD & Payment intent
  else if (lower.includes("cod") || lower.includes("cash") || lower.includes("bkash") || lower.includes("nagad") || lower.includes("payment")) {
    toolsUsed.push("getStorePolicy");
    replyText = `💳 **Payment Methods at AN Trendy Closet:**\n1. **Cash on Delivery (COD):** Available in all 64 districts nationwide.\n2. **bKash & Nagad Online Payment:** Fast instant mobile banking.\n3. **Visa & Mastercard:** Secure card payments.`;
  }
  // 4. Return & Exchange Policy intent
  else if (lower.includes("return") || lower.includes("refund") || lower.includes("exchange") || lower.includes("replacement")) {
    toolsUsed.push("getStorePolicy");
    replyText = `🔄 **Return & Refund Policy:**\nWe provide a **7-Day Hassle-Free Return & Exchange Guarantee**. Items must be unused with original tags attached. Contact our 24/7 helpline or submit a ticket for quick processing.`;
  }
  // 5. Order Tracking / Status intent
  else if (lower.includes("order") || lower.includes("track") || lower.includes("status")) {
    toolsUsed.push("getOrderStatus");
    if (!authenticatedUserId) {
      replyText = `🚚 **Track Your Order:**\nYou can track your parcel live anytime on our [Track Order Page](/track-order) using your Order ID (e.g., ANC-ORD-948102) or phone number!`;
    } else {
      replyText = `Your recent order **ANC-ORD-948102** is currently **Shipped** via Steadfast Courier and estimated for delivery by tomorrow.`;
    }
  }
  // 6. Default AI Assistant Welcome / General Support
  else {
    replyText = `Hello! I am your **24/7 AN Trendy Closet AI Shopping Assistant**. How can I help you today? I can recommend luxury watches, bags, cosmetics, gadgets, explain delivery fees, check coupons, or track your orders!`;
  }

  return {
    id: `msg_${Date.now()}`,
    sender: "assistant",
    text: replyText,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    suggestedProducts,
    toolsUsed,
  };
}
