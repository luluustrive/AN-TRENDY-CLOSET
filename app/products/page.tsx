"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";
import { useCategories } from "@/lib/categories-context";
import { productsData } from "@/lib/products-helper";
import { Product } from "@/lib/types";
import { Filter, SlidersHorizontal, Search, RefreshCw } from "lucide-react";

function ProductsContent() {
  const { categories: categoriesData } = useCategories();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialFilter = searchParams.get("filter") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [sortBy, setSortBy] = useState("featured");
  const [priceLimit, setPriceLimit] = useState(10000);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesCat = product.category.toLowerCase().includes(q);
          const matchesBrand = product.brand.toLowerCase().includes(q);
          if (!matchesName && !matchesCat && !matchesBrand) return false;
        }

        // Category match
        if (selectedCategory !== "all" && product.categorySlug !== selectedCategory) {
          return false;
        }

        // Tag filter match
        if (selectedFilter === "new-arrivals" && !product.isNewArrival) return false;
        if (selectedFilter === "bestseller" && !product.isBestSeller) return false;
        if (selectedFilter === "flash-sale" && !product.isFlashSale) return false;

        // Price range match
        if (product.price > priceLimit) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") return b.discount - a.discount;
        return 0; // Default featured
      });
  }, [searchQuery, selectedCategory, selectedFilter, priceLimit, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedFilter("all");
    setSortBy("featured");
    setPriceLimit(10000);
    setSearchQuery("");
  };

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Title */}
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest text-[#C89C7A] font-bold">
            Curated Catalog
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2F2F2F] mt-1">
            Shop All Collections
          </h1>
          <p className="text-sm text-[#666666] mt-2 max-w-xl">
            Browse our complete collection of luxury watches, designer bags, cosmetics, and fine jewelry.
          </p>
        </div>

        {/* Filter & Toolbar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#E9DED4] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9DED4]">
                <div className="flex items-center space-x-2 font-serif font-bold text-lg text-[#2F2F2F]">
                  <Filter className="w-5 h-5 text-[#C89C7A]" />
                  <span>Filters</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#C89C7A] hover:underline flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Search input in sidebar */}
              <div>
                <label className="block text-xs font-semibold text-[#2F2F2F] mb-2 uppercase tracking-wider">
                  Search Keywords
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full bg-[#FAF7F2] border border-[#E9DED4] rounded-xl py-2 px-3 pl-9 text-xs text-[#2F2F2F]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#2F2F2F] mb-3 uppercase tracking-wider">
                  Category
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedCategory === "all"
                        ? "bg-[#C89C7A] text-white"
                        : "text-[#2F2F2F] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    All Categories ({productsData.length})
                  </button>
                  {categoriesData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? "bg-[#C89C7A] text-white"
                          : "text-[#2F2F2F] hover:bg-[#FAF7F2]"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-75">
                        ({productsData.filter((p) => p.categorySlug === cat.slug).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Tag Filters */}
              <div>
                <label className="block text-xs font-semibold text-[#2F2F2F] mb-3 uppercase tracking-wider">
                  Collection Type
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: "all", label: "All Items" },
                    { id: "new-arrivals", label: "New Arrivals" },
                    { id: "bestseller", label: "Best Sellers" },
                    { id: "flash-sale", label: "Flash Sale" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        selectedFilter === filter.id
                          ? "bg-[#D4AF37] text-white"
                          : "text-[#2F2F2F] hover:bg-[#FAF7F2]"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#2F2F2F] uppercase tracking-wider">
                    Max Price
                  </label>
                  <span className="text-xs font-bold text-[#C89C7A]">
                    ৳{priceLimit.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={priceLimit}
                  onChange={(e) => setPriceLimit(Number(e.target.value))}
                  className="w-full accent-[#C89C7A] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Main Product Grid Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Controls Bar */}
            <div className="bg-white rounded-2xl p-4 border border-[#E9DED4] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[#666666]">
                Showing <span className="font-bold text-[#2F2F2F]">{filteredProducts.length}</span> of {productsData.length} products
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs text-[#666666] flex items-center space-x-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Sort by:</span>
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF7F2] border border-[#E9DED4] text-xs font-medium rounded-xl py-2 px-3 text-[#2F2F2F] focus:outline-none focus:border-[#C89C7A]"
                >
                  <option value="featured">Featured Items</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E9DED4] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4EADF] text-[#C89C7A] mx-auto flex items-center justify-center text-3xl">
                  🔍
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2F2F2F]">
                  No products matched your criteria
                </h3>
                <p className="text-xs text-[#666666] max-w-sm mx-auto">
                  Try clearing your filters or search keywords to view all items in our catalog.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#C89C7A] text-white text-xs font-semibold rounded-full shadow-md hover:bg-[#D4AF37] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal Overlay */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading product catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
