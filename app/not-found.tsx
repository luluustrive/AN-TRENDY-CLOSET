"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF7F2] p-6 text-center">
      <span className="font-serif text-6xl md:text-8xl font-extrabold text-[#C89C7A]/40">
        404
      </span>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2F2F2F] mt-2 mb-2">
        Page Not Found
      </h1>
      <p className="text-xs text-[#666666] max-w-md mb-6">
        The luxury product, category, or page you are searching for does not exist or may have been relocated.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 bg-[#C89C7A] hover:bg-[#D4AF37] text-white rounded-full font-bold text-xs transition-all flex items-center space-x-2 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-white border border-[#E9DED4] hover:border-[#C89C7A] text-[#2F2F2F] rounded-full font-bold text-xs transition-all flex items-center space-x-2 shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse Catalog</span>
        </Link>
      </div>
    </div>
  );
}
