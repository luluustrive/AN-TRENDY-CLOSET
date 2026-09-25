"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Uncaught application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF7F2] p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2F2F2F] mb-2">
        Something Went Wrong
      </h1>
      <p className="text-xs text-[#666666] max-w-md mb-6 leading-relaxed">
        We encountered an unexpected error while loading this page. Please try refreshing or return to our homepage.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#C89C7A] hover:bg-[#D4AF37] text-white rounded-full font-bold text-xs transition-all flex items-center space-x-2 shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-white border border-[#E9DED4] hover:border-[#C89C7A] text-[#2F2F2F] rounded-full font-bold text-xs transition-all flex items-center space-x-2 shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
