import React from "react";
import Link from "next/link";
import { ArrowRight, Grid } from "lucide-react";
import categoriesData from "@/data/categories.json";

export default function FeaturedCategories() {
  return (
    <section className="py-12 bg-[#FAF7F2] border-b border-[#E9DED4]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C89C7A] font-bold flex items-center space-x-1.5">
              <Grid className="w-3.5 h-3.5" />
              <span>MARKETPLACE CATALOG</span>
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2F2F2F] mt-1">
              Popular Product Categories
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center space-x-1 text-sm font-semibold text-[#C89C7A] hover:text-[#D4AF37] transition-colors mt-2 md:mt-0"
          >
            <span>Explore All 12 Marketplace Hubs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoriesData.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative bg-white rounded-2xl p-4 border border-[#E9DED4] hover:border-[#C89C7A] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center flex flex-col items-center justify-between overflow-hidden"
            >
              {/* Category Thumbnail Image */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-stone-100 relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-md">
                  {category.productCount}+ items
                </span>
              </div>

              <div className="w-full text-left">
                <h3 className="font-sans text-sm font-bold text-[#2F2F2F] group-hover:text-[#C89C7A] transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-[11px] text-[#666666] line-clamp-1 mt-0.5">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
