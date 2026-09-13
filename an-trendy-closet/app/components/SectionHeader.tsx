"use client";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
  align?: "center" | "left";
}

export default function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllText = "View All",
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={`section-header section-header--${align}`}>
      <div className="section-header__content">
        <h2 className="section-header__title">{title}</h2>
        <div className="section-header__line" />
        {subtitle && (
          <p className="section-header__subtitle">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <a href={viewAllHref} className="section-header__view-all">
          {viewAllText}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}
      <style jsx>{`
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 40px;
          gap: 20px;
        }

        .section-header--center {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .section-header--center .section-header__view-all {
          margin-top: 4px;
        }

        .section-header__title {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.5px;
        }

        .section-header__line {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, var(--luxury-gold), var(--rose-gold));
          margin: 12px auto 0;
          border-radius: 2px;
        }

        .section-header--left .section-header__line {
          margin-left: 0;
        }

        .section-header__subtitle {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-top: 10px;
          max-width: 500px;
          line-height: 1.6;
        }

        .section-header__view-all {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--rose-gold);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .section-header__view-all:hover {
          gap: 8px;
          color: var(--luxury-gold);
        }
      `}</style>
    </div>
  );
}
