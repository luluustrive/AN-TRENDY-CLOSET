"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Trash2, 
  ArrowLeft, 
  Tag, 
  CheckCircle2, 
  ShieldCheck, 
  Truck,
  ArrowRight,
  Phone,
  MapPin,
  User,
  CreditCard
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useStoreSettings } from "@/lib/store-settings-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const { settings } = useStoreSettings();
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [shippingLocation, setShippingLocation] = useState<"dhaka" | "outside">("dhaka");

  // Checkout modal states
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">("cod");

  const shippingCost = shippingLocation === "dhaka" ? 70 : 130;
  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalTotal = Math.max(0, totalPrice - discountAmount + (items.length > 0 ? shippingCost : 0));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (couponCode.trim().toUpperCase() === "ANLUXURY10" || couponCode.trim().toUpperCase() === "SAVE10") {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else {
      setCouponError("Invalid coupon code. Try 'ANLUXURY10' for 10% OFF!");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill in all mandatory shipping details.");
      return;
    }

    const generatedId = "ANC-ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderPlaced(true);
  };

  const handleFinish = () => {
    clearCart();
    setCheckoutModalOpen(false);
    setOrderPlaced(false);
  };

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <Link
          href="/products"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#C89C7A] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2F2F2F] mb-8">
          Your Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)} Items)
        </h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-[#E9DED4] shadow-sm space-y-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-[#E9DED4] last:border-0 last:pb-0 gap-4"
                  >
                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                      <div className="w-20 h-20 bg-[#FAF7F2] rounded-2xl flex items-center justify-center text-3xl border border-[#E9DED4] shrink-0">
                        {item.product.categorySlug === "watches" ? "⌚" : 
                         item.product.categorySlug === "bags" ? "👜" : 
                         item.product.categorySlug === "cosmetics" ? "💄" : 
                         item.product.categorySlug === "jewelry" ? "💎" : "✨"}
                      </div>
                      <div>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-serif font-bold text-base text-[#2F2F2F] hover:text-[#C89C7A] line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-xs text-[#666666] mt-1 space-x-2">
                          {item.selectedColor && (
                            <span>Color: <strong>{item.selectedColor}</strong></span>
                          )}
                          {item.selectedSize && (
                            <span>Size: <strong>{item.selectedSize}</strong></span>
                          )}
                        </div>
                        <div className="text-sm font-bold text-[#2F2F2F] mt-1">
                          {formatPrice(item.product.price, item.product.currency)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto space-x-6">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-[#E9DED4] rounded-full bg-[#FAF7F2] p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[#2F2F2F] hover:bg-white text-xs"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[#2F2F2F] hover:bg-white text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal for item */}
                      <div className="text-sm font-bold text-[#2F2F2F] min-w-[70px] text-right">
                        {formatPrice(item.product.price * item.quantity, item.product.currency)}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary & Coupon */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-[#E9DED4] shadow-sm space-y-6">
                <h2 className="font-serif text-xl font-bold text-[#2F2F2F]">Order Summary</h2>

                {/* Coupon input */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="block text-xs font-semibold text-[#2F2F2F] uppercase tracking-wider">
                    Discount Coupon
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. ANLUXURY10"
                      className="flex-1 bg-[#FAF7F2] border border-[#E9DED4] rounded-xl px-3 py-2 text-xs uppercase font-medium focus:outline-none focus:border-[#C89C7A]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#C89C7A] text-white text-xs font-bold rounded-xl hover:bg-[#D4AF37] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <div className="text-xs text-[#25D366] font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>10% VIP Discount Applied!</span>
                    </div>
                  )}
                  {couponError && (
                    <div className="text-xs text-red-500 font-medium">{couponError}</div>
                  )}
                </form>

                {/* Shipping Location selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#2F2F2F] uppercase tracking-wider">
                    Delivery Region
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setShippingLocation("dhaka")}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        shippingLocation === "dhaka"
                          ? "bg-[#C89C7A] text-white border-[#C89C7A]"
                          : "bg-[#FAF7F2] text-[#2F2F2F] border-[#E9DED4]"
                      }`}
                    >
                      Inside Dhaka (৳70)
                    </button>
                    <button
                      onClick={() => setShippingLocation("outside")}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        shippingLocation === "outside"
                          ? "bg-[#C89C7A] text-white border-[#C89C7A]"
                          : "bg-[#FAF7F2] text-[#2F2F2F] border-[#E9DED4]"
                      }`}
                    >
                      Outside Dhaka (৳130)
                    </button>
                  </div>
                </div>

                {/* Price Calculations Breakdown */}
                <div className="space-y-3 pt-4 border-t border-[#E9DED4] text-xs">
                  <div className="flex justify-between text-[#666666]">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-[#2F2F2F]">{formatPrice(totalPrice)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#25D366] font-semibold">
                      <span>Promo Discount (10%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#666666]">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-[#2F2F2F]">{formatPrice(shippingCost)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#2F2F2F] pt-3 border-t border-[#E9DED4]">
                    <span>Total Amount</span>
                    <span className="text-[#C89C7A]">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-4 bg-[#C89C7A] hover:bg-[#D4AF37] text-white rounded-full font-bold text-sm shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#E9DED4] space-y-4 max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#FAF7F2] text-[#C89C7A] mx-auto flex items-center justify-center text-4xl">
              🛍️
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2F2F2F]">
              Your Shopping Cart is Empty
            </h2>
            <p className="text-xs text-[#666666]">
              Explore our boutique collection and add your favorite luxury items to your cart.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-[#C89C7A] text-white text-xs font-bold rounded-full shadow-md hover:bg-[#D4AF37] transition-all"
            >
              Start Shopping Now
            </Link>
          </div>
        )}

        {/* Checkout Modal */}
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-[#E9DED4] max-h-[90vh] overflow-y-auto">
              {!orderPlaced ? (
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-[#2F2F2F] pb-2 border-b border-[#E9DED4]">
                    Complete Your Order
                  </h2>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-[#FAF7F2] border border-[#E9DED4] rounded-xl py-2.5 px-3 text-xs text-[#2F2F2F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">
                        Phone Number (For Delivery Confirmation) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="01700-000000"
                        className="w-full bg-[#FAF7F2] border border-[#E9DED4] rounded-xl py-2.5 px-3 text-xs text-[#2F2F2F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">
                        Delivery Address *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="House no, Road no, Area, City"
                        className="w-full bg-[#FAF7F2] border border-[#E9DED4] rounded-xl p-3 text-xs text-[#2F2F2F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2F2F2F] mb-2">
                        Payment Method *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "cod", label: "Cash on Delivery" },
                          { id: "bkash", label: "bKash" },
                          { id: "nagad", label: "Nagad" },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPaymentMethod(m.id as any)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                              paymentMethod === m.id
                                ? "bg-[#C89C7A] text-white border-[#C89C7A]"
                                : "bg-[#FAF7F2] text-[#2F2F2F] border-[#E9DED4]"
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E9DED4] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#666666]">Total Payable</div>
                      <div className="text-xl font-bold text-[#C89C7A]">{formatPrice(finalTotal)}</div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutModalOpen(false)}
                        className="px-4 py-2.5 border border-[#E9DED4] rounded-full text-xs font-semibold text-[#2F2F2F]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#C89C7A] hover:bg-[#D4AF37] text-white rounded-full text-xs font-bold shadow-md"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/20 text-[#25D366] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F2F2F]">
                    Order Placed Successfully!
                  </h2>
                  <p className="text-xs text-[#666666]">
                    Thank you, <strong>{customerName}</strong>! Your order ID is{" "}
                    <span className="font-bold text-[#C89C7A]">{orderId}</span>.
                  </p>

                  <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E9DED4] text-xs text-left space-y-1">
                    <div><strong>Payable Amount:</strong> {formatPrice(finalTotal)}</div>
                    <div><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</div>
                    <div><strong>Delivery Location:</strong> {customerAddress}</div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <a
                      href={`https://wa.me/${settings.hotline.replace(/[^0-9]/g, "")}?text=Hi! I just placed order ${orderId} on ${encodeURIComponent(settings.shopName)} for ${formatPrice(finalTotal)}. Please confirm.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#25D366] text-white rounded-full text-xs font-bold shadow-md flex items-center justify-center space-x-2"
                    >
                      <span>Send Order Confirmation on WhatsApp</span>
                    </a>
                    <button
                      onClick={handleFinish}
                      className="w-full py-3 border border-[#E9DED4] rounded-full text-xs font-semibold text-[#2F2F2F]"
                    >
                      Close & Return to Home
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
