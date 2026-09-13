"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Phone,
  Truck,
} from "lucide-react";
import categories from "@/data/categories.json";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="container flex items-center justify-center gap-6 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5">
            <Truck size={14} />
            Free Shipping on Orders Over ৳3,000
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Phone size={14} />
            Call Us: +880 1XXX-XXXXXX
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
      >
        <div className="container">
          <div className="navbar__inner">
            {/* Mobile Menu Toggle */}
            <button
              className="navbar__mobile-toggle show-mobile-only"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="navbar__logo">
              <span className="navbar__logo-text">AN</span>
              <span className="navbar__logo-sub">Trendy Closet</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="navbar__nav hide-mobile">
              <Link href="/" className="navbar__link navbar__link--active">
                Home
              </Link>
              <div
                ref={categoryRef}
                className="navbar__dropdown-wrapper"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <button
                  className="navbar__link navbar__link--dropdown"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  Categories <ChevronDown size={14} className={`transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>
                {isCategoryOpen && (
                  <div className="navbar__dropdown animate-fade-in">
                    {categories.filter(c => c.slug !== 'new-arrivals').map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className="navbar__dropdown-item"
                        onClick={() => setIsCategoryOpen(false)}
                      >
                        <span>{cat.name}</span>
                        <span className="navbar__dropdown-count">
                          {cat.productCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/new-arrivals" className="navbar__link">
                New Arrivals
              </Link>
              <Link href="/best-sellers" className="navbar__link">
                Best Sellers
              </Link>
              <Link href="/sale" className="navbar__link navbar__link--sale">
                Sale
              </Link>
            </nav>

            {/* Actions */}
            <div className="navbar__actions">
              {/* Search */}
              <button
                className="navbar__action-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="navbar__action-btn hide-mobile">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="navbar__badge">{wishlistCount}</span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="navbar__action-btn">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="navbar__badge">{totalItems}</span>
                )}
              </Link>

              {/* User */}
              <Link href="/account" className="navbar__action-btn hide-mobile">
                <User size={20} />
              </Link>
            </div>
          </div>

          {/* Search Bar (expandable) */}
          {isSearchOpen && (
            <div className="navbar__search animate-fade-in-down">
              <div className="navbar__search-inner">
                <Search size={18} className="text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search for watches, bags, cosmetics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="navbar__search-input"
                  autoFocus
                />
                <button
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                  className="navbar__search-close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <nav
            className="mobile-menu animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu__header">
              <span className="navbar__logo-text">AN</span>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <div className="mobile-menu__links">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/new-arrivals" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
              <Link href="/best-sellers" onClick={() => setIsMobileMenuOpen(false)}>Best Sellers</Link>
              <Link href="/sale" onClick={() => setIsMobileMenuOpen(false)}>Sale</Link>
              <div className="mobile-menu__divider" />
              <p className="mobile-menu__section-title">Categories</p>
              {categories.filter(c => c.slug !== 'new-arrivals').map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <div className="mobile-menu__divider" />
              <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
                <Heart size={16} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
                <User size={16} /> My Account
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="navbar-spacer" />

      <style jsx>{`
        .announcement-bar {
          background: var(--text-primary);
          color: var(--white);
          padding: 8px 0;
          text-align: center;
          letter-spacing: 0.5px;
          position: relative;
          z-index: 1001;
        }

        .navbar {
          position: fixed;
          top: 36px;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(250, 247, 242, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          transition: all var(--transition-base);
        }

        .navbar--scrolled {
          top: 0;
          box-shadow: var(--shadow-md);
        }

        .navbar--scrolled .navbar__inner {
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          transition: padding var(--transition-base);
        }

        .navbar__logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          text-decoration: none;
        }

        .navbar__logo:hover {
          color: var(--text-primary);
        }

        .navbar__logo-text {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 3px;
          line-height: 1;
        }

        .navbar__logo-sub {
          font-family: var(--font-body);
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 4px;
          color: var(--rose-gold);
          font-weight: 500;
          margin-top: 2px;
        }

        .navbar__nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .navbar__link {
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-primary);
          transition: color var(--transition-fast);
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .navbar__link:hover,
        .navbar__link--active {
          color: var(--rose-gold);
        }

        .navbar__link--active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--rose-gold);
          border-radius: 1px;
        }

        .navbar__link--sale {
          color: var(--error);
          font-weight: 600;
        }

        .navbar__link--dropdown {
          cursor: pointer;
          background: none;
          border: none;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .navbar__dropdown-wrapper {
          position: relative;
        }

        .navbar__dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: -16px;
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          min-width: 220px;
          padding: 8px 0;
          z-index: 100;
        }

        .navbar__dropdown::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 28px;
          width: 14px;
          height: 14px;
          background: var(--white);
          border: 1px solid var(--border-color);
          border-bottom: none;
          border-right: none;
          transform: rotate(45deg);
        }

        .navbar__dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          font-size: 0.85rem;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .navbar__dropdown-item:hover {
          background: var(--bg-secondary);
          color: var(--rose-gold);
        }

        .navbar__dropdown-count {
          font-size: 0.7rem;
          color: var(--text-secondary);
          background: var(--bg-secondary);
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }

        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .navbar__action-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .navbar__action-btn:hover {
          background: var(--bg-secondary);
          color: var(--rose-gold);
        }

        .navbar__badge {
          position: absolute;
          top: 2px;
          right: 2px;
          background: var(--rose-gold);
          color: var(--white);
          font-size: 0.6rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          line-height: 1;
        }

        .navbar__search {
          padding: 16px 0 8px;
          animation: fadeInDown 0.3s ease forwards;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .navbar__search-inner {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--white);
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-full);
          padding: 10px 20px;
          transition: border-color var(--transition-fast);
        }

        .navbar__search-inner:focus-within {
          border-color: var(--rose-gold);
        }

        .navbar__search-input {
          flex: 1;
          font-size: 0.9rem;
          color: var(--text-primary);
          background: transparent;
        }

        .navbar__search-input::placeholder {
          color: var(--text-secondary);
        }

        .navbar__search-close {
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .navbar__search-close:hover {
          color: var(--text-primary);
        }

        .navbar__mobile-toggle {
          color: var(--text-primary);
          padding: 4px;
        }

        .navbar-spacer {
          height: 100px;
        }

        /* Mobile Menu */
        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2000;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 300px;
          max-width: 85vw;
          background: var(--white);
          padding: 24px;
          overflow-y: auto;
          z-index: 2001;
        }

        .mobile-menu__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .mobile-menu__links {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-menu__links a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .mobile-menu__links a:hover {
          background: var(--bg-secondary);
          color: var(--rose-gold);
        }

        .mobile-menu__divider {
          height: 1px;
          background: var(--border-color);
          margin: 8px 0;
        }

        .mobile-menu__section-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-secondary);
          padding: 8px 8px 4px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .navbar__inner {
            padding: 12px 0;
          }

          .navbar__logo-text {
            font-size: 1.4rem;
          }

          .navbar__logo-sub {
            font-size: 0.5rem;
            letter-spacing: 3px;
          }

          .navbar__actions {
            gap: 8px;
          }

          .navbar__action-btn {
            width: 36px;
            height: 36px;
          }

          .navbar-spacer {
            height: 84px;
          }

          .announcement-bar {
            padding: 6px 0;
          }
        }
      `}</style>
    </>
  );
}
