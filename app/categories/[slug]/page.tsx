"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import categoriesData from "@/data/categories.json";
import { getProductsByCategory } from "@/lib/products-helper";
import { ArrowLeft, Grid, ShieldCheck } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const category = categoriesData.find((c) => c.slug === slug);

  if (!category && slug !== "all") {
    notFound();
  }

  const categoryProducts = getProductsByCategory(slug);

  return (
    <div className="py-10 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <Link
          href="/products"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </Link>

        {/* Category Header Banner */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-stone-200 shadow-sm mb-10 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
          <div className="relative z-10">
            <span className="text-[11px] uppercase tracking-widest text-amber-700 font-extrabold flex items-center space-x-1.5 justify-center md:justify-start">
              <Grid className="w-3.5 h-3.5" />
              <span>MARKETPLACE HUB</span>
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-stone-900 mt-1">
              {category ? category.name : "All Marketplace Products"}
            </h1>
            <p className="text-sm text-stone-600 mt-2 max-w-xl">
              {category ? category.description : "Explore our complete multi-category boutique and tech catalog."}
            </p>
          </div>

          <div className="bg-amber-50 px-6 py-4 rounded-2xl border border-amber-200 text-center shrink-0">
            <div className="font-extrabold text-2xl text-stone-900">
              {categoryProducts.length}
            </div>
            <div className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">
              Verified Items
            </div>
          </div>
        </div>

        {/* Subcategory Pills */}
        {category?.subcategories && category.subcategories.length > 0 && (
          <div className="mb-8 flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-stone-500 shrink-0">Subcategories:</span>
            {category.subcategories.map((sub, i) => (
              <Link
                key={i}
                href={`/products?category=${slug}&search=${encodeURIComponent(sub)}`}
                className="px-3.5 py-1.5 bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-full text-xs font-bold text-stone-700 hover:text-amber-800 transition-colors whitespace-nowrap shadow-sm"
              >
                {sub}
              </Link>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              No products found in this category yet.
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              We are constantly adding new verified sellers and products to this hub. Check out our main catalog.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-stone-900 text-white text-xs font-bold rounded-xl shadow-md hover:bg-amber-600 transition-colors"
            >
              Browse Complete Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
