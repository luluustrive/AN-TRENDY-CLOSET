"use client";

import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Send,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="footer__newsletter">
        <div className="container">
          <div className="footer__newsletter-inner">
            <div className="footer__newsletter-text">
              <h3>Stay in the Loop</h3>
              <p>Subscribe for exclusive offers, new arrivals, and style tips.</p>
            </div>
            <div className="footer__newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="footer__newsletter-input"
              />
              <button className="btn btn-gold">
                <Send size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__col">
              <div className="footer__brand">
                <span className="footer__brand-text">AN</span>
                <span className="footer__brand-sub">Trendy Closet</span>
              </div>
              <p className="footer__brand-desc">
                Your destination for premium fashion accessories, luxury watches,
                designer bags, and beauty essentials. Curated with love for the
                modern woman.
              </p>
              <div className="footer__social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer__social-link">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__col">
              <h4 className="footer__col-title">Quick Links</h4>
              <ul className="footer__links">
                <li><Link href="/new-arrivals">New Arrivals</Link></li>
                <li><Link href="/best-sellers">Best Sellers</Link></li>
                <li><Link href="/sale">Sale</Link></li>
                <li><Link href="/category/watches">Watches</Link></li>
                <li><Link href="/category/bags">Bags</Link></li>
                <li><Link href="/category/cosmetics">Cosmetics</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer__col">
              <h4 className="footer__col-title">Customer Service</h4>
              <ul className="footer__links">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/shipping-policy">Shipping Policy</Link></li>
                <li><Link href="/return-policy">Return Policy</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer__col">
              <h4 className="footer__col-title">Contact Us</h4>
              <ul className="footer__contact">
                <li>
                  <Phone size={15} />
                  <span>+880 1XXX-XXXXXX</span>
                </li>
                <li>
                  <Mail size={15} />
                  <span>info@antrendycloset.com</span>
                </li>
                <li>
                  <MapPin size={15} />
                  <span>Dhaka, Bangladesh</span>
                </li>
              </ul>
              <div className="footer__hours">
                <p className="footer__hours-title">Business Hours</p>
                <p>Sat – Thu: 10 AM – 8 PM</p>
                <p>Friday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p>© {new Date().getFullYear()} AN Trendy Closet. All rights reserved.</p>
            <p className="footer__made-with">
              Made with <Heart size={12} className="inline text-rose-gold" fill="currentColor" /> in Bangladesh
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--text-primary);
          color: rgba(255, 255, 255, 0.8);
          margin-top: auto;
        }

        .footer__newsletter {
          background: linear-gradient(135deg, var(--rose-gold), var(--luxury-gold));
          padding: 48px 0;
        }

        .footer__newsletter-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }

        .footer__newsletter-text h3 {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          color: var(--white);
          margin-bottom: 6px;
        }

        .footer__newsletter-text p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
        }

        .footer__newsletter-form {
          display: flex;
          gap: 12px;
          flex: 1;
          max-width: 480px;
        }

        .footer__newsletter-input {
          flex: 1;
          padding: 14px 20px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.2);
          color: var(--white);
          font-size: 0.9rem;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          min-width: 0;
        }

        .footer__newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .footer__main {
          padding: 64px 0 48px;
        }

        .footer__grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr 1fr;
          gap: 48px;
        }

        .footer__brand {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
        }

        .footer__brand-text {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 700;
          color: var(--white);
          letter-spacing: 3px;
          line-height: 1;
        }

        .footer__brand-sub {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 4px;
          color: var(--rose-gold);
          font-weight: 500;
          margin-top: 4px;
        }

        .footer__brand-desc {
          font-size: 0.85rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 20px;
        }

        .footer__social {
          display: flex;
          gap: 12px;
        }

        .footer__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.7);
          transition: all var(--transition-fast);
        }

        .footer__social-link:hover {
          background: var(--rose-gold);
          border-color: var(--rose-gold);
          color: var(--white);
          transform: translateY(-3px);
        }

        .footer__col-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--white);
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }

        .footer__links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer__links a {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          transition: all var(--transition-fast);
        }

        .footer__links a:hover {
          color: var(--rose-gold);
          padding-left: 4px;
        }

        .footer__contact {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 20px;
        }

        .footer__contact li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .footer__hours {
          padding-top: 4px;
        }

        .footer__hours-title {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.8rem;
          margin-bottom: 6px;
        }

        .footer__hours p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.6;
        }

        .footer__bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 20px 0;
        }

        .footer__bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .footer__made-with {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (max-width: 1024px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .footer__grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .footer__newsletter-inner {
            flex-direction: column;
            text-align: center;
          }

          .footer__newsletter-form {
            flex-direction: column;
            max-width: 100%;
          }

          .footer__bottom-inner {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
