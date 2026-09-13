"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  Sparkles,
  Phone,
  Clock,
  Settings,
  Sun,
  Moon,
  Grid,
  Store,
  HelpCircle,
  TrendingUp,
  Award,
  Zap,
  Tag
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useTheme } from "@/lib/theme-context";
import { useStoreSettings } from "@/lib/store-settings-context";
import { useCategories } from "@/lib/categories-context";
import { productsData } from "@/lib/products-helper";

export default function Header() {
  const router = useRouter();
  const { totalItems, totalPrice } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, palette, toggleTheme, setTheme, setPalette } = useTheme();
  const { settings } = useStoreSettings();
  const { categories: categoriesData } = useCategories();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchFocused, setSearchFocused] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [themePanelOpen, setThemePanelOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchResults = searchQuery.trim()
    ? productsData.filter((p) => {
        const matchesCategory = selectedCategory === "all" || p.categorySlug === selectedCategory;
        const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesQuery;
      }).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      let targetUrl = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedCategory !== "all") {
        targetUrl += `&category=${selectedCategory}`;
      }
      router.push(targetUrl);
      setSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white border-b border-stone-200">
      {/* 1. Marketplace Top Utility Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{settings.announcement}</span>
            </span>
            <span className="hidden md:inline text-stone-700">|</span>
            <span className="hidden md:flex items-center space-x-1 text-stone-300">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Hotline: {settings.hotline}</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] font-medium">
            <Link href="/admin" className="hover:text-amber-400 flex items-center space-x-1 text-amber-300">
              <Store className="w-3 h-3" />
              <span>Seller Center</span>
            </Link>
            <span className="text-stone-700">|</span>
            <Link href="/contact" className="hover:text-amber-400 flex items-center space-x-1">
              <HelpCircle className="w-3 h-3" />
              <span>Help Center</span>
            </Link>
            <span className="text-stone-700">|</span>
            <span className="text-stone-400">BDT ({settings.currencySymbol})</span>
          </div>
        </div>
      </div>

      {/* 2. Main Marketplace Search & Logo Header */}
      <div className="py-3 md:py-4 px-4 bg-white border-b border-stone-100">
        <div className="container mx-auto flex items-center justify-between gap-4">
          
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-stone-900 hover:text-amber-600 p-1.5"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-start group shrink-0">
            <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-stone-950 group-hover:text-amber-600 transition-colors">
              {settings.shopName.includes(" ") ? (
                <>
                  {settings.shopName.substring(0, settings.shopName.indexOf(" "))}{" "}
                  <span className="text-amber-600 font-bold italic">
                    {settings.shopName.substring(settings.shopName.indexOf(" ") + 1)}
                  </span>
                </>
              ) : (
                <span className="text-amber-600 font-bold">{settings.shopName}</span>
              )}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-sans -mt-1 font-semibold">
              {settings.shopTagline}
            </span>
          </Link>

          {/* Mega Search Bar (Category Selector + Search Input) */}
          <div className="relative flex-1 max-w-2xl hidden md:block mx-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center rounded-xl bg-stone-100 border border-stone-300 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 overflow-hidden shadow-inner">
              
              {/* Category Dropdown Selector inside Search */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-stone-200/80 text-stone-800 text-xs font-semibold px-3 py-2.5 outline-none border-r border-stone-300 cursor-pointer max-w-[140px] truncate"
              >
                <option value="all">All Categories</option>
                {categoriesData.map((cat) => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="Search 10,000+ products, electronics, fashion, lip oils, watches..."
                className="w-full bg-transparent py-2.5 px-4 text-sm text-stone-900 placeholder-stone-400 outline-none"
              />

              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm transition-colors flex items-center space-x-1"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </form>

            {/* Instant Search Results Dropdown */}
            {searchFocused && searchQuery.trim() !== "" && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 p-3 z-50">
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-bold px-3 py-1 mb-1 flex justify-between">
                  <span>Matching Marketplace Products</span>
                  <span>{searchResults.length} results</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/products/${item.id}`}
                        className="flex items-center justify-between p-2 hover:bg-amber-50 rounded-xl transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.images?.[0]} 
                            alt={item.name} 
                            className="w-10 h-10 object-cover rounded-lg bg-stone-100" 
                          />
                          <div>
                            <div className="text-sm font-bold text-stone-900 line-clamp-1">
                              {item.name}
                            </div>
                            <div className="text-xs text-stone-500">
                              {item.category} • <span className="text-amber-600 font-medium">{item.brand}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-extrabold text-stone-900">
                          {item.currency}{item.price}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-stone-500">
                    No products found matching &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* Account Link */}
            <Link
              href="/admin"
              className="hidden lg:flex items-center space-x-2 text-stone-700 hover:text-amber-600 p-2 transition-colors"
              title="Merchant / Admin Portal"
            >
              <User className="w-5 h-5" />
              <div className="flex flex-col text-left text-xs leading-none">
                <span className="text-stone-400 text-[10px]">Hello, Sign In</span>
                <span className="font-bold text-stone-800">Account / Admin</span>
              </div>
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/products?filter=bestseller"
              className="text-stone-700 hover:text-amber-600 p-2 transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="relative bg-amber-50 hover:bg-amber-100 border border-amber-200 text-stone-900 px-3.5 py-2 rounded-xl transition-all flex items-center space-x-2.5 shadow-sm"
              title="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-amber-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-stone-500 font-semibold uppercase">Cart</span>
                <span className="text-xs font-extrabold text-stone-900">৳{totalPrice}</span>
              </div>
            </Link>

            {/* Theme Settings Toggle */}
            <button
              onClick={() => setThemePanelOpen(!themePanelOpen)}
              className="text-stone-700 hover:text-amber-600 p-2 rounded-xl border border-stone-200 hover:bg-stone-100 transition-colors"
              title="Theme Settings"
            >
              <Settings className="w-5 h-5 text-amber-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Secondary Marketplace Navigation Bar & Mega Menu */}
      <div className="bg-stone-900 text-white text-xs font-semibold">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 overflow-x-auto py-2.5 scrollbar-none">
            
            {/* All Categories Mega Menu Button */}
            <div className="relative">
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold px-4 py-2 rounded-lg transition-colors mr-3"
              >
                <Grid className="w-4 h-4" />
                <span>ALL CATEGORIES</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* Multi-Column Mega Menu Dropdown */}
              {megaMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-[700px] bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 p-6 z-50 grid grid-cols-3 gap-6 animate-in fade-in duration-200">
                  {categoriesData.map((cat) => (
                    <div key={cat.id} className="space-y-2">
                      <Link
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setMegaMenuOpen(false)}
                        className="font-bold text-sm text-stone-900 hover:text-amber-600 flex items-center space-x-1.5 border-b border-stone-100 pb-1"
                      >
                        <span>{cat.name}</span>
                      </Link>
                      <ul className="space-y-1">
                        {cat.subcategories?.map((sub, i) => (
                          <li key={i}>
                            <Link
                              href={`/products?category=${cat.slug}&search=${encodeURIComponent(sub)}`}
                              onClick={() => setMegaMenuOpen(false)}
                              className="text-xs text-stone-600 hover:text-amber-600 block transition-colors"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <Link href="/products?filter=flash-sale" className="hover:text-amber-400 px-3 py-1 flex items-center space-x-1 text-amber-300">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>Today's Deals</span>
            </Link>
            <Link href="/products?filter=bestseller" className="hover:text-amber-400 px-3 py-1 flex items-center space-x-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Best Sellers</span>
            </Link>
            <Link href="/products?filter=new-arrivals" className="hover:text-amber-400 px-3 py-1 flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>New Arrivals</span>
            </Link>
            <Link href="/products?category=electronics" className="hover:text-amber-400 px-3 py-1">
              Electronics
            </Link>
            <Link href="/products?category=women-fashion" className="hover:text-amber-400 px-3 py-1">
              Fashion
            </Link>
            <Link href="/products?category=beauty" className="hover:text-amber-400 px-3 py-1">
              Beauty
            </Link>
            <Link href="/products?category=watches" className="hover:text-amber-400 px-3 py-1">
              Watches
            </Link>
          </div>
        </div>
      </div>
      {/* Theme Settings Slide-Out Panel */}
      {themePanelOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
            onClick={() => setThemePanelOpen(false)}
          />

          {/* Settings Panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[70] flex flex-col animate-slide-in-right">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-stone-900">Theme Settings</h3>
              </div>
              <button
                onClick={() => setThemePanelOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Theme Mode Toggle */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Appearance</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                      theme === 'light'
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                    }`}
                    type="button"
                  >
                    <Sun className={`w-6 h-6 mb-2 ${theme === 'light' ? 'text-amber-600' : 'text-stone-400'}`} />
                    <span className={`text-xs font-bold ${theme === 'light' ? 'text-amber-700' : 'text-stone-500'}`}>
                      Light
                    </span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                      theme === 'dark'
                        ? 'border-amber-500 bg-stone-800 shadow-md'
                        : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                    }`}
                    type="button"
                  >
                    <Moon className={`w-6 h-6 mb-2 ${theme === 'dark' ? 'text-amber-400' : 'text-stone-400'}`} />
                    <span className={`text-xs font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-stone-500'}`}>
                      Dark
                    </span>
                  </button>
                </div>
              </div>

              {/* Color Palette Selector */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Color Palette</h4>
                <div className="space-y-2">
                  {[
                    { id: 'classic' as const, name: 'Classic Gold', colors: ['#F59E0B', '#78716C', '#1C1917'], description: 'Warm amber & stone' },
                    { id: 'rose' as const, name: 'Rose Elegance', colors: ['#F43F5E', '#FB7185', '#FDA4AF'], description: 'Romantic pink tones' },
                    { id: 'emerald' as const, name: 'Emerald Forest', colors: ['#10B981', '#34D399', '#6EE7B7'], description: 'Fresh green vibes' },
                    { id: 'midnight' as const, name: 'Midnight Blue', colors: ['#6366F1', '#818CF8', '#A5B4FC'], description: 'Cool indigo nights' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPalette(p.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl border-2 transition-all text-left ${
                        palette === p.id
                          ? 'border-amber-500 bg-amber-50 shadow-sm'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                      type="button"
                    >
                      <div className="flex -space-x-1.5">
                        {p.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${palette === p.id ? 'text-amber-700' : 'text-stone-800'}`}>
                          {p.name}
                        </div>
                        <div className="text-[10px] text-stone-400">{p.description}</div>
                      </div>
                      {palette === p.id && (
                        <div className="ml-auto">
                          <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info note */}
              <div className="bg-stone-100 rounded-xl p-4 text-xs text-stone-500 leading-relaxed">
                <span className="font-bold text-stone-700">💡 Tip:</span> Your theme preferences are automatically saved and will persist across sessions.
              </div>
            </div>

            {/* Panel Footer */}
            <div className="px-6 py-4 border-t border-stone-200">
              <button
                onClick={() => setThemePanelOpen(false)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 rounded-xl text-sm transition-colors shadow-sm"
                type="button"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[90] flex flex-col lg:hidden animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between p-5 border-b border-stone-200 bg-stone-900 text-white">
              <div>
                <div className="font-serif text-lg font-extrabold text-white">
                  {settings.shopName}
                </div>
                <div className="text-[10px] text-amber-400 font-medium">
                  {settings.shopTagline}
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Mobile Search */}
              <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search catalog..."
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl py-2.5 px-4 pr-10 text-xs text-stone-900 font-medium outline-none"
                  />
                  <button type="submit" className="absolute right-3 top-2.5 text-stone-500">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Navigation Links */}
              <div className="space-y-1 text-xs font-bold">
                <div className="text-[10px] uppercase text-stone-400 font-extrabold tracking-wider px-3 pb-1">
                  Browse Shop
                </div>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 text-stone-800"
                >
                  <Store className="w-4 h-4 text-amber-600" />
                  <span>Home Page</span>
                </Link>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 text-stone-800"
                >
                  <Grid className="w-4 h-4 text-amber-600" />
                  <span>All Products</span>
                </Link>
                <Link
                  href="/products?filter=flash-sale"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 text-amber-700"
                >
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Today's Deals</span>
                </Link>
                <Link
                  href="/products?filter=bestseller"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 text-stone-800"
                >
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Best Sellers</span>
                </Link>
                <Link
                  href="/products?filter=new-arrivals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 text-stone-800"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>New Arrivals</span>
                </Link>
              </div>

              {/* Categories */}
              <div className="space-y-1 text-xs">
                <div className="text-[10px] uppercase text-stone-400 font-extrabold tracking-wider px-3 pb-1">
                  Categories
                </div>
                {categoriesData.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-amber-50 text-stone-700 font-semibold"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded-md text-stone-500">
                      {cat.productCount}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Merchant / Help */}
              <div className="pt-4 border-t border-stone-200 space-y-2 text-xs font-bold">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200"
                >
                  <User className="w-4 h-4 text-amber-600" />
                  <span>Admin / Seller Dashboard</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 text-stone-700"
                >
                  <HelpCircle className="w-4 h-4 text-stone-500" />
                  <span>Help & Contact Center</span>
                </Link>
              </div>
            </div>

            <div className="p-4 border-t border-stone-200 bg-stone-50 text-[11px] text-stone-500 font-semibold text-center">
              Hotline: {settings.hotline}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
