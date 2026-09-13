"use client";

import type { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <a
      href={`/category/${category.slug}`}
      className="category-card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="category-card__image">
        <span className="category-card__icon">{category.icon === "Watch" ? "⌚" : category.icon === "ShoppingBag" ? "👜" : category.icon === "Sparkles" ? "✨" : category.icon === "Gem" ? "💎" : category.icon === "Crown" ? "👑" : category.icon === "Zap" ? "⚡" : "🛍"}</span>
      </div>
      <div className="category-card__overlay" />
      <div className="category-card__content">
        <h3 className="category-card__name">{category.name}</h3>
        <p className="category-card__desc">{category.description}</p>
        <span className="category-card__count">{category.productCount} Products</span>
      </div>

      <style jsx>{`
        .category-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 36px 24px;
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          text-align: center;
          overflow: hidden;
          transition: all var(--transition-slow);
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
          min-height: 220px;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--rose-gold);
        }

        .category-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--accent-pink), transparent);
          opacity: 0;
          transition: opacity var(--transition-slow);
          pointer-events: none;
        }

        .category-card:hover .category-card__overlay {
          opacity: 0.15;
        }

        .category-card__image {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          transition: all var(--transition-slow);
          position: relative;
          z-index: 1;
        }

        .category-card:hover .category-card__image {
          background: var(--accent-pink);
          transform: scale(1.1);
        }

        .category-card__icon {
          font-size: 1.75rem;
        }

        .category-card__content {
          position: relative;
          z-index: 1;
        }

        .category-card__name {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .category-card__desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 8px;
        }

        .category-card__count {
          font-size: 0.7rem;
          color: var(--rose-gold);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 640px) {
          .category-card {
            padding: 24px 16px;
            min-height: 180px;
          }

          .category-card__image {
            width: 60px;
            height: 60px;
          }

          .category-card__icon {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </a>
  );
}
