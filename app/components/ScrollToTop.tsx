"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <>
      <button
        onClick={scrollToTop}
        className="scroll-to-top animate-scale-in"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--rose-gold), var(--luxury-gold));
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-lg);
          z-index: 999;
          transition: all var(--transition-fast);
        }

        .scroll-to-top:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-gold);
        }

        @media (max-width: 768px) {
          .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </>
  );
}
