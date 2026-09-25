"use client";

import React from "react";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C89C7A] font-bold flex items-center space-x-1.5 justify-center md:justify-start">
              <Heart className="w-4 h-4 fill-[#C89C7A]" />
              <span>SAVED ITEMS</span>
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2F2F2F] mt-1">
              Your Wishlist ({wishlist.length})
            </h1>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-[#C89C7A] hover:underline"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-[#E9DED4] text-center max-w-lg mx-auto my-12 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#FAF7F2] text-[#C89C7A] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2F2F2F] mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm text-[#666666] mb-6">
              Explore our curated collections of watches, fashion, beauty, and electronics, and click the heart icon on items you love.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#C89C7A] hover:bg-[#D4AF37] text-white rounded-full font-bold text-sm transition-all shadow-md"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#E9DED4] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square bg-[#FAF7F2] overflow-hidden group">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center shadow-md transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C89C7A] tracking-wider">
                      {product.brand}
                    </span>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-bold text-sm text-[#2F2F2F] hover:text-[#C89C7A] transition-colors line-clamp-1 mt-0.5">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="text-base font-extrabold text-[#2F2F2F] mt-1">
                      {formatPrice(product.price, product.currency)}
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-[#666666] line-through ml-2 font-normal">
                          {formatPrice(product.originalPrice, product.currency)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => addItem(product, 1)}
                      className="flex-1 py-2.5 px-4 bg-[#C89C7A] hover:bg-[#D4AF37] text-white rounded-xl font-medium text-xs transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
