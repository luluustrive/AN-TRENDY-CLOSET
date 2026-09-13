"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#2F2F2F] via-[#1a1a1a] to-[#2F2F2F] text-white relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C89C7A]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#EECFCB] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VIP Inner Circle</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Unlock Exclusive <span className="text-[#C89C7A] italic font-normal">Luxury Access</span>
        </h2>

        <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
          Be the first to discover new arrivals, secret sales, private discount codes, and seasonal fashion previews.
        </p>

        {subscribed ? (
          <div className="p-6 bg-white/10 border border-[#25D366]/40 rounded-3xl backdrop-blur-md inline-flex items-center space-x-3 text-[#25D366]">
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-sm font-semibold text-white">
              Thank you for subscribing! Welcome to the AN Trendy Closet family.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-white/10 border border-white/20 rounded-full py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#C89C7A] focus:ring-1 focus:ring-[#C89C7A] backdrop-blur-md"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#C89C7A] hover:bg-[#D4AF37] text-white font-semibold text-sm rounded-full transition-all duration-300 shadow-lg hover:scale-105 shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-gray-400 mt-4">
          🔒 We respect your privacy. Unsubscribe at any time with a single click.
        </p>
      </div>
    </section>
  );
}
