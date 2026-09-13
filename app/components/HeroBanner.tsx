"use client";

import { Sparkles, ArrowRight } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero__bg-pattern" />
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <div className="hero__badge animate-fade-in">
              <Sparkles size={14} />
              <span>New Collection 2026</span>
            </div>
            <h1 className="hero__title animate-fade-in-up">
              Elevate Your Style
              <br />
              <span className="gradient-text">With Luxury</span>
            </h1>
            <p className="hero__subtitle animate-fade-in-up delay-200">
              Discover our curated collection of premium watches, designer bags,
              exquisite jewelry, and luxury beauty essentials — crafted for the
              modern woman who celebrates elegance.
            </p>
            <div className="hero__actions animate-fade-in-up delay-300">
              <a href="/new-arrivals" className="btn btn-primary btn-lg">
                Shop New Arrivals
                <ArrowRight size={18} />
              </a>
              <a href="/best-sellers" className="btn btn-secondary btn-lg">
                Best Sellers
              </a>
            </div>
            <div className="hero__stats animate-fade-in-up delay-400">
              <div className="hero__stat">
                <span className="hero__stat-number">5K+</span>
                <span className="hero__stat-label">Happy Customers</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number">500+</span>
                <span className="hero__stat-label">Premium Products</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number">4.9</span>
                <span className="hero__stat-label">Customer Rating</span>
              </div>
            </div>
          </div>

          <div className="hero__visual animate-scale-in delay-200">
            <div className="hero__visual-ring hero__visual-ring--outer" />
            <div className="hero__visual-ring hero__visual-ring--inner" />
            <div className="hero__visual-center">
              <span className="hero__visual-text">AN</span>
              <span className="hero__visual-sub">Collection</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          padding: clamp(3rem, 8vw, 7rem) 0;
          background: linear-gradient(
            135deg,
            var(--bg-primary) 0%,
            var(--bg-secondary) 40%,
            var(--accent-pink) 100%
          );
          overflow: hidden;
        }

        .hero__bg-pattern {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(200, 156, 122, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 60% 80%, rgba(238, 207, 203, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .hero__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
        }

        .hero__content {
          flex: 1;
          max-width: 620px;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: rgba(200, 156, 122, 0.15);
          border: 1px solid rgba(200, 156, 122, 0.3);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--rose-gold);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 24px;
        }

        .hero__title {
          font-family: var(--font-heading);
          font-size: clamp(2.2rem, 5vw, 3.75rem);
          font-weight: 700;
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .hero__subtitle {
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 32px;
          max-width: 520px;
        }

        .hero__actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .hero__stats {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .hero__stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .hero__stat-number {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .hero__stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .hero__stat-divider {
          width: 1px;
          height: 36px;
          background: var(--border-color);
        }

        /* Visual Element */
        .hero__visual {
          position: relative;
          width: 380px;
          height: 380px;
          flex-shrink: 0;
        }

        .hero__visual-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
        }

        .hero__visual-ring--outer {
          inset: 0;
          border-color: rgba(200, 156, 122, 0.2);
          animation: spin 30s linear infinite;
        }

        .hero__visual-ring--outer::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          width: 8px;
          height: 8px;
          background: var(--rose-gold);
          border-radius: 50%;
        }

        .hero__visual-ring--inner {
          inset: 40px;
          border-color: rgba(212, 175, 55, 0.25);
          animation: spin 20s linear infinite reverse;
        }

        .hero__visual-ring--inner::before {
          content: '';
          position: absolute;
          bottom: -4px;
          right: 20%;
          width: 6px;
          height: 6px;
          background: var(--luxury-gold);
          border-radius: 50%;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hero__visual-center {
          position: absolute;
          inset: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--white), var(--bg-secondary));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-xl);
        }

        .hero__visual-text {
          font-family: var(--font-heading);
          font-size: 4rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 6px;
          line-height: 1;
        }

        .hero__visual-sub {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 6px;
          color: var(--rose-gold);
          font-weight: 500;
          margin-top: 4px;
        }

        @media (max-width: 1024px) {
          .hero__visual {
            width: 280px;
            height: 280px;
          }

          .hero__visual-ring--inner {
            inset: 30px;
          }

          .hero__visual-center {
            inset: 60px;
          }

          .hero__visual-text {
            font-size: 3rem;
          }
        }

        @media (max-width: 768px) {
          .hero__inner {
            flex-direction: column;
            text-align: center;
          }

          .hero__content {
            max-width: 100%;
          }

          .hero__subtitle {
            max-width: 100%;
          }

          .hero__actions {
            justify-content: center;
          }

          .hero__stats {
            justify-content: center;
          }

          .hero__badge {
            margin-left: auto;
            margin-right: auto;
          }

          .hero__visual {
            width: 220px;
            height: 220px;
            order: -1;
          }

          .hero__visual-ring--inner {
            inset: 24px;
          }

          .hero__visual-center {
            inset: 48px;
          }

          .hero__visual-text {
            font-size: 2.2rem;
          }

          .hero__visual-sub {
            font-size: 0.55rem;
            letter-spacing: 4px;
          }
        }
      `}</style>
    </section>
  );
}
