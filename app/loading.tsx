"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FAF7F2] p-6">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-[#E9DED4] border-t-[#C89C7A] animate-spin" />
        <Sparkles className="w-6 h-6 text-[#C89C7A] absolute animate-pulse" />
      </div>
      <p className="mt-4 text-xs font-serif font-bold uppercase tracking-widest text-[#C89C7A]">
        AN TRENDY CLOSET
      </p>
      <p className="text-xs text-[#666666] mt-1">Loading luxury collections...</p>
    </div>
  );
}
