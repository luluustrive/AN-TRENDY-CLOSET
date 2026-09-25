"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  ArrowLeft,
  MessageCircle,
  Phone,
  Store,
  Clock,
  Award
} from "lucide-react";
import { getProductById, getProductsByCategory } from "@/lib/products-helper";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import ProductCard from "@/components/product/ProductCard";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  const router = useRouter();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews" | "shipping">("desc");

  const isWishlisted = isInWishlist(product.id);

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    router.push("/cart");
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"];

  return (
    <div className="py-10 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center space-x-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-amber-600">Products</Link>
          <span>/</span>
          <Link href={`/categories/${product.categorySlug}`} className="hover:text-amber-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-bold line-clamp-1">{product.name}</span>
        </div>

        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 md:p-10 border border-stone-200 shadow-sm mb-12">
          
          {/* Left Column: Dedicated Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 relative group">
              <img
                src={images[selectedImage] || images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-md shadow-md">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? "border-amber-500 ring-2 ring-amber-500/20" : "border-stone-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-widest font-extrabold text-amber-700">{product.brand}</span>
                <span className="bg-stone-100 px-2.5 py-1 rounded-md font-semibold text-stone-700">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-stone-900 leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Sold count */}
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-stone-400">({product.reviewCount} customer reviews)</span>
                {product.soldCount && (
                  <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px]">
                    🔥 {product.soldCount}+ Sold
                  </span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-baseline space-x-3">
              <span className="text-3xl font-extrabold text-stone-900">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-stone-400 line-through">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
            </div>

            {/* Seller / Supplier Info Box */}
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-stone-900 flex items-center space-x-1.5">
                    <span>Sold & Fulfilled by: {product.supplierName || product.seller?.name || "Verified Merchant Partner"}</span>
                    <span className="bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                      VERIFIED
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-600 font-medium mt-0.5">
                    {product.seller?.rating || 98.9}% Positive Rating • Direct Wholesale Partner
                  </div>
                </div>
              </div>

              {product.seller?.phone && (
                <a
                  href={`https://wa.me/${product.seller.phone.replace(/[^0-9]/g, "")}?text=Hi! I have a question about ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shrink-0 shadow-sm transition-transform hover:scale-105"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat Supplier</span>
                </a>
              )}
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700">Select Color: {selectedColor}</label>
                <div className="flex items-center space-x-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center space-x-2 ${
                        selectedColor === c.name ? "border-amber-500 bg-amber-50 text-amber-900" : "border-stone-200 text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  Select Size: <span className="text-amber-600 font-semibold">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        selectedSize === s ? "border-amber-500 bg-amber-50 text-amber-900" : "border-stone-200 text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
                    added ? "bg-emerald-600 text-white" : "bg-stone-900 hover:bg-amber-600 text-white shadow-lg"
                  }`}
                >
                  {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{added ? "Added to Shopping Cart" : "Add to Cart"}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-colors"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition-colors flex items-center justify-center ${
                    isWishlisted ? "bg-rose-500 text-white border-rose-500" : "border-stone-300 hover:bg-stone-100 text-stone-700"
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-white" : ""}`} />
                </button>
              </div>
            </div>

            {/* BD Delivery Assurance */}
            <div className="border-t border-stone-200 pt-4 grid grid-cols-2 gap-3 text-xs text-stone-600">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Express Shipping BD</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Buyer Guarantee Included</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Specs & Reviews Section */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-stone-200 shadow-sm mb-12">
          <div className="flex border-b border-stone-200 space-x-8 mb-6 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveTab("desc")}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "desc" ? "border-amber-500 text-amber-700" : "border-transparent text-stone-500 hover:text-stone-900"
              }`}
            >
              Overview & Details
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "specs" ? "border-amber-500 text-amber-700" : "border-transparent text-stone-500 hover:text-stone-900"
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "reviews" ? "border-amber-500 text-amber-700" : "border-transparent text-stone-500 hover:text-stone-900"
              }`}
            >
              Verified Customer Reviews ({product.reviewCount || 12})
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "shipping" ? "border-amber-500 text-amber-700" : "border-transparent text-stone-500 hover:text-stone-900"
              }`}
            >
              Shipping & Return Policy
            </button>
          </div>

          {activeTab === "desc" && (
            <div className="space-y-4 text-sm text-stone-600 leading-relaxed max-w-3xl">
              <p>{product.description}</p>
              <p>All items undergo strict quality control before being packed and shipped to your doorstep across Bangladesh.</p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <span className="font-bold text-stone-700">{key}</span>
                  <span className="text-stone-900 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center space-x-4 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="text-3xl font-extrabold text-stone-900">{product.rating}</div>
                <div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs text-stone-600 font-medium mt-0.5">
                    Based on {product.reviewCount || 12} verified buyer reviews
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-stone-900">Anika T. — Dhaka</span>
                    <span className="text-stone-400">Verified Purchase</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600">
                    Extremely fast delivery inside Dhaka! Product condition is 10/10, authentic quality as described.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-stone-900">Tanvir H. — Chattogram</span>
                    <span className="text-stone-400">Verified Purchase</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600">
                    Great packaging and responsive seller support. Will order again!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-4 text-xs text-stone-600 max-w-3xl leading-relaxed">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 text-sm">🚚 Nationwide Delivery Costs</h4>
                <p>• Inside Dhaka: ৳70 (Estimated 24–48 hours)</p>
                <p>• Outside Dhaka: ৳130 (Estimated 2–4 business days)</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 text-sm">🔄 7-Day Hassle-Free Exchange Policy</h4>
                <p>If you receive a defective or incorrect item, return or exchange it within 7 days for a 100% full replacement or refund guarantee.</p>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Customers Also Viewed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
