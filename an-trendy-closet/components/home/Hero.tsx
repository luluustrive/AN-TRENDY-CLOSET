"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Zap, ShieldCheck, Tag, ShoppingBag, Clock } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    badge: "GLOBAL MARKETPLACE DEALS",
    title: "Big Deals. Better Prices.",
    highlight: "Up to 60% OFF",
    subtitle: "Shop top tech, smartphones, fashion, cosmetics, luxury watches & home essentials.",
    ctaText: "Explore Flash Deals",
    ctaLink: "/products?filter=flash-sale",
    secondaryText: "Browse All Categories",
    secondaryLink: "/products",
    bgGradient: "from-amber-900/90 via-stone-900 to-black",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000&auto=format&fit=crop&q=80",
    tag: "FEATURED PROMO"
  },
  {
    id: 2,
    badge: "NEW ARRIVALS 2026",
    title: "Next-Gen Tech & Accessories",
    highlight: "Latest Gadgets",
    subtitle: "Discover high-performance wireless audio, smart watches, smartphones & gaming gear.",
    ctaText: "Shop Electronics",
    ctaLink: "/products?category=electronics",
    secondaryText: "View Gadgets",
    secondaryLink: "/products?category=gaming",
    bgGradient: "from-slate-900 via-indigo-950 to-stone-900",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
    tag: "NEW TECH"
  },
  {
    id: 3,
    badge: "BOUTIQUE FASHION & BEAUTY",
    title: "Luxury Leather & Skincare",
    highlight: "Elegant Style",
    subtitle: "Premium handbags, rose gold timepieces, lip oils & authentic luxury skincare.",
    ctaText: "Shop Women's Fashion",
    ctaLink: "/products?category=women-fashion",
    secondaryText: "Beauty & Cosmetics",
    secondaryLink: "/products?category=beauty",
    bgGradient: "from-stone-900 via-rose-950 to-amber-950",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80",
    tag: "BOUTIQUE COLLECTION"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const active = HERO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white py-10 md:py-14 border-b border-stone-800">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Slide Card */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl border border-stone-800 bg-stone-900 min-h-[380px] sm:min-h-[420px] flex items-center">
            {/* Slide Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-40 scale-105"
              style={{ backgroundImage: `url(${active.image})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${active.bgGradient} opacity-90`} />

            <div className="relative p-6 sm:p-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 tracking-wider uppercase">
                  {active.badge}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {active.title} <br className="hidden sm:inline"/>
                <span className="text-amber-400 italic underline decoration-amber-500/50 decoration-wavy underline-offset-8">
                  {active.highlight}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
                {active.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={active.ctaLink}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                >
                  <span>{active.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={active.secondaryLink}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 backdrop-blur-md transition-all text-center"
                >
                  {active.secondaryText}
                </Link>
              </div>

              {/* Slider Indicator Dots */}
              <div className="flex items-center space-x-2 pt-4">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === idx ? "w-8 bg-amber-400" : "w-2 bg-stone-600 hover:bg-stone-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Promotional Mini-Deals Widget Column */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="bg-gradient-to-br from-amber-500/10 via-stone-900 to-stone-900 border border-amber-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />
                  <span>Marketplace Today's Highlight</span>
                </span>
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  HOT DEAL
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-1">
                Verified Seller Direct Hub
              </h3>
              <p className="text-xs text-stone-400 mb-4">
                Over 50,000+ orders fulfilled with 98.7% positive buyer satisfaction across BD.
              </p>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
                  <div className="font-bold text-amber-400 text-base">50+</div>
                  <div className="text-[10px] text-stone-400">Categories</div>
                </div>
                <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
                  <div className="font-bold text-emerald-400 text-base">৳70/130</div>
                  <div className="text-[10px] text-stone-400">BD Shipping</div>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Buyer Protection Guarantee</h4>
                <p className="text-xs text-stone-400">
                  Full refund if items do not match description or arrive damaged.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
