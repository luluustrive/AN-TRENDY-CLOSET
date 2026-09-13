"use client";

import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <div
      className="product-card"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image Container */}
      <div className="product-card__image-wrapper">
        {/* Placeholder product image - gradient background with product initial */}
        <div className="product-card__image">
          <span className="product-card__image-text">
            {product.category.charAt(0)}
          </span>
        </div>

        {/* Badges */}
        <div className="product-card__badges">
          {product.isNewArrival && <span className="badge badge-new">New</span>}
          {product.isBestSeller && (
            <span className="badge badge-bestseller">Best Seller</span>
          )}
          {product.discount > 0 && (
            <span className="badge badge-sale">-{product.discount}%</span>
          )}
          {product.isFlashSale && (
            <span className="badge" style={{ background: "#FF5722", color: "#fff" }}>
              ⚡ Flash
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`product-card__wishlist ${wishlisted ? "product-card__wishlist--active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>

        {/* Hover Actions */}
        <div className="product-card__actions">
          <button
            className="product-card__action-btn"
            aria-label="Quick view"
          >
            <Eye size={16} />
            <span>Quick View</span>
          </button>
          <button
            className={`product-card__action-btn product-card__action-btn--cart ${inCart ? "product-card__action-btn--in-cart" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              if (!inCart) addItem(product);
            }}
            aria-label={inCart ? "Already in cart" : "Add to cart"}
          >
            <ShoppingBag size={16} />
            <span>{inCart ? "In Cart" : "Add to Cart"}</span>
          </button>
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="product-card__out-of-stock">
            <span>Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="product-card__info">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__name">{product.name}</h3>

        {/* Rating */}
        <div className="product-card__rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={13}
                fill={star <= Math.floor(product.rating) ? "currentColor" : "none"}
                strokeWidth={star <= Math.floor(product.rating) ? 0 : 1.5}
              />
            ))}
          </div>
          <span className="product-card__review-count">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="product-card__price">
          <span className="product-card__price-current">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="product-card__price-original">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Indicator */}
        {product.inStock && product.stockCount <= 5 && (
          <p className="product-card__low-stock">
            Only {product.stockCount} left!
          </p>
        )}
      </div>

      <style jsx>{`
        .product-card {
          background: var(--white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all var(--transition-slow);
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
          position: relative;
        }

        .product-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-6px);
        }

        .product-card__image-wrapper {
          position: relative;
          overflow: hidden;
          aspect-ratio: 3 / 4;
        }

        .product-card__image {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            var(--bg-secondary) 0%,
            var(--accent-pink) 50%,
            var(--bg-secondary) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--transition-slow);
        }

        .product-card:hover .product-card__image {
          transform: scale(1.08);
        }

        .product-card__image-text {
          font-family: var(--font-heading);
          font-size: 3rem;
          color: var(--rose-gold);
          opacity: 0.4;
          font-weight: 700;
        }

        .product-card__badges {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 2;
        }

        .product-card__wishlist {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          z-index: 2;
          box-shadow: var(--shadow-sm);
        }

        .product-card__wishlist:hover {
          background: var(--white);
          color: #E53935;
          transform: scale(1.1);
        }

        .product-card__wishlist--active {
          color: #E53935;
          background: var(--white);
        }

        .product-card__actions {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          gap: 1px;
          transform: translateY(100%);
          transition: transform var(--transition-base);
          z-index: 2;
        }

        .product-card:hover .product-card__actions {
          transform: translateY(0);
        }

        .product-card__action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: rgba(47, 47, 47, 0.9);
          color: var(--white);
          backdrop-filter: blur(4px);
          transition: background var(--transition-fast);
        }

        .product-card__action-btn:hover {
          background: var(--rose-gold);
        }

        .product-card__action-btn--cart {
          background: var(--text-primary);
        }

        .product-card__action-btn--cart:hover {
          background: var(--luxury-gold);
        }

        .product-card__action-btn--in-cart {
          background: var(--success);
        }

        .product-card__out-of-stock {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
        }

        .product-card__out-of-stock span {
          background: rgba(0, 0, 0, 0.8);
          color: var(--white);
          padding: 8px 24px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .product-card__info {
          padding: 16px;
        }

        .product-card__category {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--rose-gold);
          font-weight: 600;
          margin-bottom: 4px;
        }

        .product-card__name {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-card__rating {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .product-card__review-count {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .product-card__price {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .product-card__price-current {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .product-card__price-original {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-decoration: line-through;
        }

        .product-card__low-stock {
          font-size: 0.75rem;
          color: var(--warning);
          font-weight: 600;
          margin-top: 6px;
        }

        @media (max-width: 640px) {
          .product-card__actions {
            transform: translateY(0);
          }

          .product-card__action-btn span {
            display: none;
          }

          .product-card__action-btn {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}
