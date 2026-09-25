/**
 * AN Trendy Closet - Production Normalized Relational Database Schema Specification
 * Compatible with PostgreSQL / Supabase / Neon / Prisma / Drizzle
 */

export interface DbUser {
  id: string;
  email: string;
  phone?: string;
  name: string;
  passwordHash: string;
  role: "super_admin" | "admin" | "order_manager" | "product_manager" | "support_agent" | "supplier" | "customer";
  avatarUrl?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DbAddress {
  id: string;
  userId: string;
  label: string;
  recipientName: string;
  phone: string;
  division: string;
  district: string;
  upazila: string;
  addressDetails: string;
  isDefault: boolean;
}

export interface DbProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  currency: string;
  images: string[];
  categorySlug: string;
  categoryName: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  lowStockThreshold: number;
  status: "draft" | "active" | "scheduled" | "archived";
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFlashSale: boolean;
  flashSaleEnds?: string;
  specifications: Record<string, string>;
  supplierId?: string;
  supplierName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  subcategories: string[];
  productCount: number;
}

export interface DbSupplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  commissionRate: number;
  isVerified: boolean;
  status: "Active" | "Pending" | "Inactive";
  activeProductsCount: number;
}

export interface DbOrder {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryDivision: string;
  deliveryDistrict: string;
  deliveryAddress: string;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  couponCode?: string;
  total: number;
  paymentMethod: "cod" | "bkash" | "nagad" | "sslcommerz";
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  transactionId?: string;
  orderStatus: "Pending" | "Confirmed" | "Processing" | "Packed" | "Shipped" | "Out for Delivery" | "Delivered" | "Cancelled" | "Returned" | "Refunded";
  courierName?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DbOrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface DbCoupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue: number;
  maxUsageLimit: number;
  usedCount: number;
  expiryDate: string;
  isActive: boolean;
}

export interface DbReview {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
}

export interface DbSupportTicket {
  id: string;
  ticketNumber: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  subject: string;
  category: "order" | "shipping" | "payment" | "product" | "general";
  priority: "low" | "medium" | "high" | "urgent";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  messages: Array<{
    sender: "customer" | "ai" | "agent";
    senderName: string;
    text: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface DbAiKnowledgeDoc {
  id: string;
  title: string;
  category: "policy" | "shipping" | "faq" | "product_guide" | "cod";
  content: string;
  keywords: string[];
  updatedAt: string;
}

export interface DbAuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  timestamp: string;
}
