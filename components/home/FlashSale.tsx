"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { getTimeRemaining } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";
import { getFlashSaleProducts } from "@/lib/products-helper";
import { Product } from "@/lib/types";

interface FlashSaleProps {
  onQuickView: (product: Product) => void;
}

export default function FlashSale({ onQuickView }: FlashSaleProps) {
  // Target date set 7 days from now
  const targetDate = "2026-08-25T23:59:59";
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = getFlashSaleProducts().slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-r from-[#F4EADF] via-[#FAF7F2] to-[#F4EADF] border-y border-[#E9DED4]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Flash Sale Header with Timer */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E9DED4]">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37] text-white flex items-center justify-center shadow-md animate-pulse">
              <Zap className="w-7 h-7 fill-white" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#EECFCB] text-[#2F2F2F] text-xs font-bold uppercase tracking-wider">
                Limited Time Deals
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2F2F2F] mt-1">
                Luxury Flash Sale
              </h2>
            </div>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center space-x-3 text-center" suppressHydrationWarning>
            <div className="bg-[#2F2F2F] text-white rounded-2xl px-3.5 py-2 min-w-[60px] shadow-sm">
              <div className="text-xl font-bold font-serif" suppressHydrationWarning>{mounted ? String(timeLeft.days).padStart(2, "0") : "00"}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Days</div>
            </div>
            <span className="text-xl font-bold text-[#C89C7A]">:</span>
            <div className="bg-[#2F2F2F] text-white rounded-2xl px-3.5 py-2 min-w-[60px] shadow-sm">
              <div className="text-xl font-bold font-serif" suppressHydrationWarning>{mounted ? String(timeLeft.hours).padStart(2, "0") : "00"}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Hours</div>
            </div>
            <span className="text-xl font-bold text-[#C89C7A]">:</span>
            <div className="bg-[#2F2F2F] text-white rounded-2xl px-3.5 py-2 min-w-[60px] shadow-sm">
              <div className="text-xl font-bold font-serif" suppressHydrationWarning>{mounted ? String(timeLeft.minutes).padStart(2, "0") : "00"}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Mins</div>
            </div>
            <span className="text-xl font-bold text-[#C89C7A]">:</span>
            <div className="bg-[#C89C7A] text-white rounded-2xl px-3.5 py-2 min-w-[60px] shadow-sm animate-pulse">
              <div className="text-xl font-bold font-serif" suppressHydrationWarning>{mounted ? String(timeLeft.seconds).padStart(2, "0") : "00"}</div>
              <div className="text-[10px] text-white/80 uppercase tracking-wider">Secs</div>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products?filter=flash-sale"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-white border border-[#C89C7A] text-[#C89C7A] hover:bg-[#C89C7A] hover:text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-sm"
          >
            <span>Explore All Flash Sale Offers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
