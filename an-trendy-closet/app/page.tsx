"use client";

import React, { useState } from "react";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FlashSale from "@/components/home/FlashSale";
import ReviewsSection from "@/components/home/ReviewsSection";
import Newsletter from "@/components/home/Newsletter";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";
import { getNewArrivals, getBestSellers } from "@/lib/products-helper";
import { Product } from "@/lib/types";
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from "lucide-react";

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const newArrivals = getNewArrivals().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Categories Section */}
      <FeaturedCategories />

      {/* 3. New Arrivals Section */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C89C7A] font-bold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Just Landed</span>
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2F2F2F] mt-1">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/products?filter=new-arrivals"
              className="inline-flex items-center space-x-1 text-sm font-semibold text-[#C89C7A] hover:text-[#D4AF37] transition-colors mt-2 md:mt-0"
            >
              <span>Explore All New Styles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Flash Sale Section with Countdown Timer */}
      <FlashSale onQuickView={(p) => setQuickViewProduct(p)} />

      {/* 5. Best Sellers Section */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold flex items-center space-x-1">
                <Award className="w-3.5 h-3.5" />
                <span>Most Popular</span>
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2F2F2F] mt-1">
                Best Selling Collection
              </h2>
            </div>
            <Link
              href="/products?filter=bestseller"
              className="inline-flex items-center space-x-1 text-sm font-semibold text-[#C89C7A] hover:text-[#D4AF37] transition-colors mt-2 md:mt-0"
            >
              <span>View All Best Sellers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Banner Section */}
      <section className="py-16 bg-[#F4EADF] border-y border-[#E9DED4]">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C89C7A] font-bold">
            The AN Closet Promise
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2F2F2F]">
            Uncompromising Quality & Luxury Care
          </h2>
          <p className="text-sm text-[#666666] leading-relaxed">
            Every piece in our boutique is individually inspected for flawless finishing, premium materials, and authentic craftsmanship before being presented in our iconic gift packaging.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-8 text-xs font-semibold text-[#2F2F2F]">
            <span className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#C89C7A]" />
              <span>Fast BD Shipping</span>
            </span>
            <span className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>100% Authentic Products</span>
            </span>
            <span className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-[#EECFCB]" />
              <span>7-Day Return & Exchange</span>
            </span>
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews Carousel Section */}
      <ReviewsSection />

      {/* 8. VIP Newsletter Signup */}
      <Newsletter />

      {/* Quick View Modal Overlay */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
