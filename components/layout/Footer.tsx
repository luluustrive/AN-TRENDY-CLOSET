"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  RefreshCw,
  Store,
  CreditCard,
  Lock,
  Headphones
} from "lucide-react";
import { useStoreSettings } from "@/lib/store-settings-context";

export default function Footer() {
  const { settings } = useStoreSettings();

  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      {/* 1. Value Proposition Strip */}
      <div className="container mx-auto px-4 md:px-6 pb-10 border-b border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Fast BD Express Shipping</h4>
            <p className="text-[11px] text-stone-400">Dhaka {settings.currencySymbol}70 | Outside {settings.currencySymbol}130</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">100% Authentic Guarantee</h4>
            <p className="text-[11px] text-stone-400">Verified Marketplace Merchants</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">7-Day Easy Returns</h4>
            <p className="text-[11px] text-stone-400">Hassle-free buyer exchange</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">24/7 Hotline Support</h4>
            <p className="text-[11px] text-stone-400">{settings.hotline}</p>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="container mx-auto px-4 md:px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand Information */}
        <div className="col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <span className="font-serif text-2xl font-extrabold tracking-tight text-white">
              {settings.shopName.includes(" ") ? (
                <>
                  {settings.shopName.substring(0, settings.shopName.indexOf(" "))}{" "}
                  <span className="text-amber-500 italic font-bold">
                    {settings.shopName.substring(settings.shopName.indexOf(" ") + 1)}
                  </span>
                </>
              ) : (
                <span className="text-amber-500 font-bold">{settings.shopName}</span>
              )}
            </span>
          </Link>
          <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
            {settings.shopTagline}. Bangladesh&apos;s premier destination for fashion, luxury watches, handbags, skincare, electronics, and lifestyle essentials.
          </p>
          <div className="flex items-center space-x-3 text-xs text-stone-400 pt-1">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Dhaka, Bangladesh</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.supportEmail}</span>
            </span>
          </div>
        </div>

        {/* Column 1: Shopping */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-extrabold text-white mb-3">Shopping Hub</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li><Link href="/products?category=electronics" className="hover:text-amber-400 transition-colors">Electronics & Gadgets</Link></li>
            <li><Link href="/products?category=smartphones" className="hover:text-amber-400 transition-colors">Smartphones</Link></li>
            <li><Link href="/products?category=women-fashion" className="hover:text-amber-400 transition-colors">Women&apos;s Fashion</Link></li>
            <li><Link href="/products?category=watches" className="hover:text-amber-400 transition-colors">Watches & Luxury</Link></li>
            <li><Link href="/products?category=beauty" className="hover:text-amber-400 transition-colors">Beauty & Skincare</Link></li>
          </ul>
        </div>

        {/* Column 2: Customer Service */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-extrabold text-white mb-3">Customer Care</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li><Link href="/faq" className="hover:text-amber-400 transition-colors">Help Center & FAQ</Link></li>
            <li><Link href="/track-order" className="hover:text-amber-400 transition-colors">Track Order</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Support</Link></li>
            <li><Link href="/about" className="hover:text-amber-400 transition-colors">About AN Marketplace</Link></li>
            <li><Link href="/faq" className="hover:text-amber-400 transition-colors">Return Policy</Link></li>
          </ul>
        </div>

        {/* Column 3: Seller Hub */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-extrabold text-white mb-3">Merchant Center</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li><Link href="/admin" className="hover:text-amber-400 transition-colors font-bold text-amber-300">Seller Dashboard</Link></li>
            <li><Link href="/admin" className="hover:text-amber-400 transition-colors">List New Products</Link></li>
            <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Fulfillment Center</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Merchant Guidelines</Link></li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Legal & Payment Badges */}
      <div className="container mx-auto px-4 md:px-6 pt-6 border-t border-stone-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <p>© 2026 {settings.shopName}. All rights reserved.</p>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800 text-stone-300 font-bold">bKash</span>
          <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800 text-stone-300 font-bold">Nagad</span>
          <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800 text-stone-300 font-bold">Cash on Delivery</span>
          <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800 text-stone-300 font-bold">Visa/Mastercard</span>
        </div>
      </div>
    </footer>
  );
}
