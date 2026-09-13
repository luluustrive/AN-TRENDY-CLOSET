"use client";

import { Star } from "lucide-react";
import type { Review } from "@/lib/types";

interface ReviewCardProps {
  review: Review;
  index?: number;
}

export default function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  return (
    <div
      className="review-card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="review-card__header">
        <div className="review-card__avatar">
          <span>{review.customerName.charAt(0)}</span>
        </div>
        <div className="review-card__meta">
          <h4 className="review-card__name">
            {review.customerName}
            {review.verified && (
              <span className="review-card__verified" title="Verified Purchase">
                ✓
              </span>
            )}
          </h4>
          <div className="review-card__stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={13}
                fill={star <= review.rating ? "currentColor" : "none"}
                strokeWidth={star <= review.rating ? 0 : 1.5}
                color="var(--luxury-gold)"
              />
            ))}
          </div>
        </div>
      </div>

      <p className="review-card__comment">&ldquo;{review.comment}&rdquo;</p>

      <div className="review-card__footer">
        <span className="review-card__product">{review.productName}</span>
        <span className="review-card__date">
          {new Date(review.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <style jsx>{`
        .review-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 28px;
          transition: all var(--transition-slow);
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
        }

        .review-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--accent-pink);
          transform: translateY(-3px);
        }

        .review-card__header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .review-card__avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-pink), var(--rose-gold));
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .review-card__avatar span {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--white);
        }

        .review-card__name {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .review-card__verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--success);
          color: var(--white);
          font-size: 0.6rem;
          font-weight: 700;
        }

        .review-card__stars {
          display: flex;
          gap: 2px;
          margin-top: 4px;
        }

        .review-card__comment {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 16px;
        }

        .review-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
        }

        .review-card__product {
          font-size: 0.75rem;
          color: var(--rose-gold);
          font-weight: 600;
        }

        .review-card__date {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
