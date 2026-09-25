"use client";

import React, { useState } from "react";
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const currentColor = selectedColor || product.colors?.[0]?.name || "";
  const currentSize = selectedSize || product.sizes?.[0] || "";

  const handleAddToCart = () => {
    addItem(product, quantity, currentColor, currentSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E9DED4] grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#EECFCB] flex items-center justify-center text-[#2F2F2F] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Visual Area */}
        <div className="bg-[#FAF7F2] p-6 flex flex-col items-center justify-center relative min-h-[300px]">
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md bg-white border border-[#E9DED4]">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">
                ✨
              </div>
            )}
            {product.discount > 0 && (
              <span className="absolute top-3 left-3 bg-[#D4AF37] text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
                -{product.discount}%
              </span>
            )}
          </div>
          <span className="mt-4 text-xs font-serif uppercase tracking-widest text-[#C89C7A] font-bold">
            {product.brand}
          </span>
        </div>

        {/* Product Details Form */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#666666] font-semibold mb-1">
              {product.category} • SKU: {product.sku}
            </div>

            <h2 className="font-serif text-xl font-bold text-[#2F2F2F] mb-2">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center text-[#D4AF37]">
                <Star className="w-4 h-4 fill-[#D4AF37]" />
              </div>
              <span className="text-sm font-bold text-[#2F2F2F]">{product.rating}</span>
              <span className="text-xs text-[#666666]">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 mb-4">
              <span className="text-2xl font-bold text-[#2F2F2F]">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-[#666666] line-through">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-xs font-bold text-[#D4AF37] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                  Save {product.discount}%
                </span>
              )}
            </div>

            <p className="text-xs text-[#666666] leading-relaxed mb-6 line-clamp-3">
              {product.description}
            </p>

            {/* Color selector if available */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#2F2F2F] mb-2">
                  Select Color: <span className="text-[#C89C7A]">{currentColor}</span>
                </label>
                <div className="flex items-center space-x-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        currentColor === c.name ? "border-[#C89C7A] scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector if available */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#2F2F2F] mb-2">
                  Select Size:
                </label>
                <div className="flex items-center space-x-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 text-xs rounded-lg border font-medium transition-all ${
                        currentSize === s
                          ? "bg-[#C89C7A] text-white border-[#C89C7A]"
                          : "bg-[#FAF7F2] text-[#2F2F2F] border-[#E9DED4] hover:border-[#C89C7A]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center border border-[#E9DED4] rounded-full bg-[#FAF7F2] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[#2F2F2F] hover:bg-white"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[#2F2F2F] hover:bg-white"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-md ${
                  added
                    ? "bg-[#25D366] text-white"
                    : "bg-[#C89C7A] hover:bg-[#D4AF37] text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Cart</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#666666] pt-3 border-t border-[#E9DED4]">
              <span className="flex items-center space-x-1">
                <Truck className="w-3.5 h-3.5 text-[#C89C7A]" />
                <span>Express Delivery</span>
              </span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Authentic Guarantee</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
