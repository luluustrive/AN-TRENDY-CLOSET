"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, Search, Truck, CheckCircle2, Clock, MapPin, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface SampleOrder {
  id: string;
  customerName: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  courier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  deliveryAddress: string;
}

const mockOrdersDatabase: Record<string, SampleOrder> = {
  "ANC-ORD-948102": {
    id: "ANC-ORD-948102",
    customerName: "Ayesha Rahman",
    status: "Shipped",
    date: "2026-09-11",
    courier: "Steadfast Courier BD",
    trackingNumber: "STF-BD-8849201",
    estimatedDelivery: "2026-09-14",
    items: [
      { name: "Rose Gold Elegance Watch", quantity: 1, price: 4500 },
      { name: "Velvet Matte Lipstick Set", quantity: 1, price: 1800 },
    ],
    total: 6370,
    deliveryAddress: "House 42, Road 11, Block D, Banani, Dhaka-1213",
  },
  "ANC-ORD-948103": {
    id: "ANC-ORD-948103",
    customerName: "Tanvir Ahmed",
    status: "Processing",
    date: "2026-09-12",
    courier: "Pathao Courier",
    trackingNumber: "PTH-902184",
    estimatedDelivery: "2026-09-15",
    items: [{ name: "Luxe Leather Tote Bag", quantity: 1, price: 5800 }],
    total: 5870,
    deliveryAddress: "GEC Circle, Nasirabad, Chattogram",
  },
};

export default function TrackOrderPage() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<SampleOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const query = orderIdInput.trim().toUpperCase();
    if (!query) {
      setErrorMsg("Please enter a valid Order Number (e.g. ANC-ORD-948102)");
      return;
    }

    const order = mockOrdersDatabase[query];
    if (order) {
      setSearchedOrder(order);
    } else {
      setSearchedOrder(null);
      setErrorMsg(`No active order found with ID "${query}". Please check your order confirmation invoice or contact hotline.`);
    }
  };

  const steps = [
    { title: "Order Placed", status: "Pending" },
    { title: "Processing & Quality Check", status: "Processing" },
    { title: "Handed to Courier", status: "Shipped" },
    { title: "Out for Delivery", status: "Shipped" },
    { title: "Delivered", status: "Delivered" },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case "Pending": return 0;
      case "Processing": return 1;
      case "Shipped": return 2;
      case "Delivered": return 4;
      default: return 0;
    }
  };

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C89C7A] font-bold flex items-center justify-center space-x-1.5">
            <Truck className="w-4 h-4 text-[#C89C7A]" />
            <span>EXPRESS LOGISTICS</span>
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2F2F2F] mt-1">
            Track Your Order
          </h1>
          <p className="text-sm text-[#666666] mt-2">
            Enter your order number (e.g. <span className="font-semibold text-[#2F2F2F]">ANC-ORD-948102</span>) to trace your delivery status live across Bangladesh.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9DED4] shadow-sm mb-8">
          <form onSubmit={handleTrack} className="space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
            <div className="flex-1 relative">
              <Package className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#C89C7A]" />
              <input
                type="text"
                placeholder="Order Number (e.g. ANC-ORD-948102)"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E9DED4] focus:outline-none focus:border-[#C89C7A] font-mono text-sm text-[#2F2F2F]"
              />
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Phone Number (Optional)"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E9DED4] focus:outline-none focus:border-[#C89C7A] text-sm text-[#2F2F2F]"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 bg-[#C89C7A] hover:bg-[#D4AF37] text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>Track Order</span>
            </button>
          </form>

          {errorMsg && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Order Details Display */}
        {searchedOrder && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9DED4] shadow-md space-y-8 animate-fade-in">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E9DED4] gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#C89C7A]/30 text-[#C89C7A] text-xs font-bold uppercase tracking-wider mb-2">
                  Order Status: {searchedOrder.status}
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#2F2F2F]">
                  Order #{searchedOrder.id}
                </h2>
                <p className="text-xs text-[#666666] mt-1">
                  Placed on {searchedOrder.date} • Customer: <span className="font-semibold text-[#2F2F2F]">{searchedOrder.customerName}</span>
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs text-[#666666]">Estimated Delivery</div>
                <div className="text-lg font-bold text-[#2F2F2F] flex items-center space-x-1 justify-end">
                  <Clock className="w-4 h-4 text-[#C89C7A]" />
                  <span>{searchedOrder.estimatedDelivery}</span>
                </div>
                <div className="text-[11px] text-[#C89C7A] font-semibold">
                  Courier: {searchedOrder.courier} ({searchedOrder.trackingNumber})
                </div>
              </div>
            </div>

            {/* Tracking Progress Bar */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#666666] mb-6">
                Shipment Progress
              </h3>
              <div className="relative flex items-center justify-between">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[#E9DED4] z-0" />
                {steps.map((step, index) => {
                  const currentIdx = getStepIndex(searchedOrder.status);
                  const isCompleted = index <= currentIdx;
                  return (
                    <div key={step.title} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted
                            ? "bg-[#C89C7A] text-white shadow-md"
                            : "bg-white border-2 border-[#E9DED4] text-[#666666]"
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                      </div>
                      <span className="text-[11px] font-semibold text-[#2F2F2F] mt-2 text-center max-w-[80px]">
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Items summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E9DED4]">
              <div>
                <h4 className="text-xs font-bold text-[#2F2F2F] uppercase tracking-wider mb-2 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C89C7A]" />
                  <span>Shipping Address</span>
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {searchedOrder.deliveryAddress}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#2F2F2F] uppercase tracking-wider mb-2">
                  Ordered Items
                </h4>
                <ul className="space-y-1.5 text-xs text-[#2F2F2F]">
                  {searchedOrder.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between py-1 border-b border-[#E9DED4]/50">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-semibold">{formatPrice(item.price * item.quantity, "৳")}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center pt-2 font-bold text-sm text-[#2F2F2F]">
                  <span>Total Amount</span>
                  <span>{formatPrice(searchedOrder.total, "৳")}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
