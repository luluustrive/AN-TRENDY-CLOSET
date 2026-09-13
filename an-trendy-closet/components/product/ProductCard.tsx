"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Eye, Check, ShieldCheck, Truck } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  rankIndex?: number;
}

export default function ProductCard({ product, onQuickView, rankIndex }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Image source resolution with secondary hover swap support
  const mainImg = product.images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80";
  const hoverImg = product.images?.[1] || mainImg;
  const currentImg = isHovered && hoverImg !== mainImg ? hoverImg : mainImg;

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-[#E9DED4] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ranking Badge if provided */}
      {typeof rankIndex === "number" && (
        <div className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-extrabold text-sm flex items-center justify-center shadow-lg border-2 border-white">
          #{rankIndex + 1}
        </div>
      )}

      {/* Top Badges */}
      <div className={`absolute top-3 ${typeof rankIndex === "number" ? "left-12" : "left-3"} z-10 flex flex-col gap-1.5 pointer-events-none`}>
        {product.discount > 0 && (
          <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
            -{product.discount}%
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
            NEW
          </span>
        )}
        {product.isBestSeller && !product.isNewArrival && (
          <span className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
            BESTSELLER
          </span>
        )}
      </div>

      {/* Wishlist Action Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isWishlisted
            ? "bg-rose-500 text-white shadow-md scale-105"
            : "bg-white/90 hover:bg-white text-stone-700 hover:text-rose-500 shadow-sm"
        } backdrop-blur-md`}
        aria-label="Add to wishlist"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
      </button>

      {/* Product Dedicated Image Container */}
      <Link href={`/products/${product.id}`} className="relative block overflow-hidden aspect-square bg-stone-100">
        {!imageError ? (
          <img
            src={currentImg}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-stone-200 text-stone-500 text-center">
            <span className="text-3xl mb-1">🛍️</span>
            <span className="text-xs font-semibold">{product.brand}</span>
          </div>
        )}

        {/* Hover Quick View Overlay Action */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="bg-white/95 hover:bg-white text-stone-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-md flex items-center space-x-1.5 transition-transform hover:scale-105"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          )}
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium mb-1">
            <span className="uppercase tracking-wider font-semibold text-amber-700">{product.brand}</span>
            <span>{product.category}</span>
          </div>

          <Link href={`/products/${product.id}`} className="block group-hover:text-amber-700 transition-colors">
            <h3 className="font-sans text-sm font-bold text-stone-900 line-clamp-2 mb-1.5 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Seller / Trust Info */}
          {product.seller && (
            <div className="text-[11px] text-stone-500 flex items-center space-x-1 mb-2">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span className="truncate">Seller: <strong>{product.seller.name}</strong></span>
            </div>
          )}

          {/* Rating & Sold count */}
          <div className="flex items-center space-x-1.5 mb-3">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-xs font-bold text-stone-900 ml-1">{product.rating}</span>
            </div>
            <span className="text-[11px] text-stone-400">({product.reviewCount})</span>
            {product.soldCount && (
              <>
                <span className="text-stone-300">•</span>
                <span className="text-[11px] text-stone-500 font-medium">{product.soldCount}+ sold</span>
              </>
            )}
          </div>
        </div>

        {/* Price, Shipping Tag & Add to Cart */}
        <div>
          <div className="flex items-center space-x-1 text-[10px] text-emerald-700 font-semibold mb-2">
            <Truck className="w-3 h-3" />
            <span>Free BD Delivery Available</span>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-stone-100">
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-base font-extrabold text-stone-900">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-stone-400 line-through">
                    {formatPrice(product.originalPrice, product.currency)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center space-x-1.5 ${
                addedAnimation
                  ? "bg-emerald-600 text-white scale-105"
                  : "bg-stone-900 hover:bg-amber-600 text-white shadow-sm"
              }`}
              title="Add to shopping cart"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
