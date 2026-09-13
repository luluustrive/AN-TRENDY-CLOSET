"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Award, Users } from "lucide-react";
import { useStoreSettings } from "@/lib/store-settings-context";

export default function AboutPage() {
  const { settings } = useStoreSettings();

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-[#E9DED4] text-[#C89C7A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Our Story & Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2F2F2F] tracking-tight">
            Crafting Timeless <span className="text-[#C89C7A] italic font-normal">Feminine Luxury</span>
          </h1>
          <p className="text-sm md:text-base text-[#666666] leading-relaxed">
            {settings.shopName} was founded with a singular vision: to bring world-class soft luxury, elegant fashion pieces, and accessible sophistication to fashion lovers across Bangladesh.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 md:p-12 border border-[#E9DED4] shadow-sm mb-16">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2F2F2F]">
              Inspired by Modern Grace & Elegance
            </h2>
            <p className="text-xs md:text-sm text-[#666666] leading-relaxed">
              We believe luxury is not merely about price tags — it is about the feeling of refined beauty, meticulous craftsmanship, and thoughtful design. From our hand-picked rose gold watches to our full-grain leather totes and artisanal jewelry, every piece in our collection is curated to elevate your daily style.
            </p>
            <p className="text-xs md:text-sm text-[#666666] leading-relaxed">
              Whether you are shopping for a signature piece or finding a memorable gift for a loved one, our boutique guarantees authentic quality, fast nationwide delivery, and iconic signature gift wrapping.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-block px-8 py-3.5 bg-[#C89C7A] hover:bg-[#D4AF37] text-white rounded-full text-xs font-bold shadow-md transition-all"
              >
                Explore Our Collection
              </Link>
            </div>
          </div>

          <div className="bg-[#F4EADF] rounded-2xl p-8 text-center space-y-6 border border-[#E9DED4]">
            <div className="w-24 h-24 rounded-full bg-white mx-auto flex items-center justify-center text-4xl shadow-md">
              👑
            </div>
            <div className="font-serif text-2xl font-bold text-[#2F2F2F]">
              &quot;Elegance is the only beauty that never fades.&quot;
            </div>
            <p className="text-xs text-[#C89C7A] font-semibold uppercase tracking-widest">
              — {settings.shopName} Creative Team
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-3xl p-8 border border-[#E9DED4] shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EECFCB]/30 text-[#C89C7A] mx-auto flex items-center justify-center">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2F2F2F]">Passionate Curation</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Every design is meticulously evaluated for quality, aesthetic harmony, and comfort before joining our catalog.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#E9DED4] shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] mx-auto flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2F2F2F]">Authentic Quality</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              We stand 100% behind the authenticity of all our products with direct warranties and exchange protection.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#E9DED4] shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#C89C7A]/20 text-[#C89C7A] mx-auto flex items-center justify-center">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2F2F2F]">Dedicated Care</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Our customer happiness team is available 7 days a week via WhatsApp, phone, and messenger to assist you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
