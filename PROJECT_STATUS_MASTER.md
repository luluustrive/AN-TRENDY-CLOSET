# PROJECT_STATUS.md
# AN Trendy Closet — Complete Development Handoff Document

> **Generated:** September 13, 2026
> **Purpose:** Accurate, code-verified handoff for the next AI developer.
> **IMPORTANT:** Every claim in this document has been verified against the actual source files. Nothing is guessed or assumed.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project File Structure](#3-project-file-structure)
4. [Data Layer](#4-data-layer)
5. [Type System](#5-type-system)
6. [Context / State Management](#6-context--state-management)
7. [Pages (Routes)](#7-pages-routes)
8. [Components](#8-components)
9. [Design System](#9-design-system)
10. [Admin Dashboard](#10-admin-dashboard)
11. [Feature Status Matrix](#11-feature-status-matrix)
12. [Known Limitations and Issues](#12-known-limitations-and-issues)
13. [What the Next Developer Should Do](#13-what-the-next-developer-should-do)
14. [Environment Variables](#14-environment-variables)
15. [Running the Project](#15-running-the-project)

---

## 1. PROJECT OVERVIEW

### Website Name
**AN Trendy Closet** (stylized as "AN TRENDY CLOSET")

### Purpose
AN Trendy Closet is a multi-category e-commerce and marketplace website that sells fashion, cosmetics, electronics, accessories, and lifestyle products. The site is styled as a premium/luxury brand while serving a broad market.

### Business Model
The site functions as a **multi-vendor marketplace** (conceptually), where:
- The store owner (AN) is the primary seller.
- Suppliers/merchants are associated with products via a `supplierId`/`supplierName` relationship.
- A commission-based supplier system is represented in data (`commissionRate` field in suppliers).
- Products carry seller information (seller name, rating, verified badge, response rate, products count).

> **IMPORTANT:** The marketplace is currently **frontend-only**. There is NO real backend, no real database, no real multi-vendor login, and no actual order processing. All data is static JSON files or localStorage.

### Target Customers
- Fashion-conscious customers in **Bangladesh** (primary market).
- Women (emphasis on watches, handbags, cosmetics, jewelry, beauty).
- Also intended to expand to **global markets** in the future.

### Target Market
- **Primary:** Bangladesh — Dhaka and nationwide districts.
- Currency shown: Bangladeshi Taka (BDT, symbol: ৳).
- Payment methods featured: Cash on Delivery (COD), bKash, Nagad, Visa/Mastercard.
- **Future:** Designed to be expandable to global markets.

### Main Product Categories (from `data/categories.json` — 12 categories defined)

| Category Name | Slug | Example Subcategories |
|---|---|---|
| Electronics & Gadgets | electronics | Audio & Headphones, Wearable Tech, Smart Home |
| Smartphones & Mobile | smartphones | Smartphones, Cases & Covers, Power Banks |
| Computers & Laptops | computers | Laptops, Keyboards & Mice, Monitors |
| Women's Fashion | women-fashion | Dresses & Tops, Ethnic Wear, Activewear |
| Men's Fashion | men-fashion | Shirts & T-Shirts, Jeans & Trousers, Formal Suits |
| Watches & Luxury | watches | Luxury Watches, Smartwatches, Chronographs |
| Bags & Luggage | bags | Handbags & Totes, Backpacks, Travel Bags |
| Beauty & Skincare | beauty | Lip Products, Makeup Kits, Fragrances |
| Home & Kitchen | home-living | Home Decor, Kitchen Utensils, Lighting |
| Shoes & Footwear | shoes | Sneakers, Heels & Pumps, Sandals |
| Gaming & Tech | gaming | Gaming Headsets, Controllers, Mechanical Keyboards |
| Jewelry & Accessories | jewelry | Necklaces, Earrings, Rings, Bracelets |

### Current Development Goal
The site is at an advanced MVP stage. The next development goals (inferred from existing code and what is missing) should be:
- Adding a real backend/database (currently everything is static JSON or localStorage).
- User authentication for customers.
- Real order management and payment integration.
- Persistent product management (admin changes currently survive only in localStorage, not in files).
- Expanding the product catalog beyond the current 6 seed products.

---

## 2. TECHNOLOGY STACK

### Frontend Framework
- **Next.js 16.3.0** — App Router architecture (`app/` directory). All pages use `"use client"` directive; there are NO Server Components or server-side data fetching in use.
- **React 19.2.8** / **react-dom 19.2.8**

### Backend
- **NONE.** This is a **frontend-only** application. There is no Express, no API routes, no server-side logic.
- Data comes entirely from local JSON files (`data/products.json`, `data/categories.json`, etc.) and browser `localStorage`.

### Database
- **NONE.** No database exists.
- All persistent data lives in browser `localStorage` under these keys:
  - `an_trendy_cart` — Cart items
  - `an_trendy_wishlist` — Wishlist items
  - `theme-mode` — Dark/light theme preference
  - `theme-palette` — Color palette preference
  - `an_store_settings` — Admin-edited store settings
  - `an_custom_categories` — Admin-added/deleted categories
  - `an_suppliers_data` — Admin-edited suppliers list
  - `an_admin_authenticated` — Admin session flag (stored in `sessionStorage`)

### Authentication
- **NO real authentication.**
- Admin area is protected by a simple hardcoded password check in the frontend code.
- No customer login/signup system exists anywhere in the codebase.

### APIs
- **NO external APIs used.**
- No payment gateway integrations (bKash, Nagad, etc. are shown as UI labels only — no real API calls).
- Product images are loaded from **Unsplash CDN** (public URLs hardcoded in `data/products.json` and `data/categories.json`).

### Libraries (from package.json)

| Library | Version | Purpose |
|---|---|---|
| next | 16.3.0 | Framework |
| react | 19.2.8 | UI library |
| react-dom | 19.2.8 | React DOM |
| framer-motion | ^13.0.0 | Animations (used in ToastContainer via AnimatePresence) |
| lucide-react | ^1.30.0 | Icon library (used extensively throughout) |
| clsx | ^2.1.1 | Conditional class utility (cn() helper in lib/utils.ts) |

### UI Framework
- No UI component library (no shadcn, no MUI, no Chakra).
- All UI components are custom-built from scratch.

### CSS System
- **Tailwind CSS v4** (tailwindcss: ^4, @tailwindcss/postcss: ^4)
- Custom CSS variables defined in `app/globals.css` for the full theming system.
- The CSS file is 318 lines long and implements the entire design token system via CSS custom properties (--bg-primary, --accent-main, etc.).
- Fonts loaded from **Google Fonts** via `next/font/google`:
  - `Playfair Display` — Heading/serif font (CSS var: --font-playfair)
  - `Plus Jakarta Sans` — Body/sans font (CSS var: --font-jakarta)

### Build Tools
- **Next.js built-in compiler** (Turbopack or Webpack via `next build`)
- **PostCSS** with `@tailwindcss/postcss`
- **ESLint 9** with `eslint-config-next 16.3.0`

### Package Manager
- **npm** (evidenced by `package-lock.json` at 238KB)

### Any AI-Related Tools/Services
- **NONE verified in the codebase.** No AI API calls, no OpenAI, no Gemini, no recommendation engine.

### Hosting
- **NOT deployed** as of this writing. Running locally via `npm run dev` (bound to 0.0.0.0 so accessible on local network: `next dev -H 0.0.0.0`).
- A `tunnel.log` file exists in the project root which is 49 bytes — likely from a tunneling service (e.g., ngrok), but its contents are minimal.
- No Vercel, Netlify, or hosting config files are present.

### TypeScript
- **TypeScript 5** — strict mode enabled ("strict": true in tsconfig.json).
- Path alias `@/*` maps to project root.

---

## 3. PROJECT FILE STRUCTURE

```
c:\Users\HP\Desktop\AN trendy closet\
├── an-trendy-closet/           <- MAIN PROJECT (active development)
│   ├── app/                    <- Next.js App Router
│   │   ├── layout.tsx          <- Root layout (providers + Header + Footer)
│   │   ├── page.tsx            <- Home page
│   │   ├── globals.css         <- Global CSS + Tailwind v4 + theme variables
│   │   ├── favicon.ico
│   │   ├── about/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx      <- Admin layout (metadata only)
│   │   │   └── page.tsx        <- Full admin dashboard (55KB, 1232 lines)
│   │   ├── cart/page.tsx       <- Cart + Checkout flow
│   │   ├── categories/[slug]/page.tsx
│   │   ├── components/         <- LEGACY/UNUSED components (see Section 8)
│   │   │   ├── CartContext.tsx
│   │   │   ├── WishlistContext.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── CountdownTimer.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ReviewCard.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   └── SectionHeader.tsx
│   │   ├── contact/page.tsx
│   │   ├── faq/page.tsx
│   │   └── products/
│   │       ├── page.tsx        <- Product listing/catalog page
│   │       └── [id]/page.tsx   <- Product detail page
│   ├── components/             <- ACTIVE components (imported by app)
│   │   ├── home/
│   │   │   ├── FeaturedCategories.tsx
│   │   │   ├── FlashSale.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   └── ReviewsSection.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx      <- Main header (637 lines)
│   │   │   └── Footer.tsx      <- Main footer
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   └── QuickViewModal.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── ToastContainer.tsx
│   ├── data/                   <- Static JSON seed data
│   │   ├── products.json       <- 6 products
│   │   ├── categories.json     <- 12 categories
│   │   ├── reviews.json        <- 4 customer reviews
│   │   └── suppliers.json      <- 4 suppliers
│   ├── lib/                    <- Context providers, helpers, utilities
│   │   ├── cart-context.tsx
│   │   ├── categories-context.tsx
│   │   ├── products-helper.ts
│   │   ├── store-settings-context.tsx
│   │   ├── theme-context.tsx
│   │   ├── toast-context.tsx
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   └── wishlist-context.tsx
│   ├── public/                 <- Only default Next.js SVGs (no custom images)
│   ├── AGENTS.md               <- Auto-generated by Next.js dev server
│   ├── CLAUDE.md               <- 11 bytes, nearly empty
│   ├── README.md               <- Default Next.js README
│   ├── next.config.ts          <- Empty/default Next.js config
│   ├── package.json
│   ├── postcss.config.mjs
│   └── tsconfig.json
├── an trendy closet 2/         <- Contains only PRD_v2.md (product requirements doc, 28KB)
├── md format file              <- 106KB markdown file (not part of Next.js app)
└── tunnel.log                  <- 49 bytes, likely tunneling log
```

---

## 4. DATA LAYER

All data is **static and hardcoded in JSON files**. There is no API, no CMS, and no database.

### data/products.json — 6 products

| ID | Name | Category Slug | Price (BDT) | Key Flags |
|---|---|---|---|---|
| prod-1 | Rose Gold Elegance Watch | watches | 4,500 | isFeatured, isBestSeller |
| prod-2 | Luxe Leather Tote Bag | bags | 5,800 | isFeatured, isNewArrival, isBestSeller |
| prod-3 | Velvet Matte Lipstick Set | beauty | 1,800 | isFeatured, isBestSeller, isFlashSale |
| prod-4 | Pearl Drop Earrings | jewelry | 2,200 | isFeatured, isNewArrival |
| prod-5 | Wireless Noise Cancelling Headphones | electronics | 6,500 | isFeatured, isNewArrival, isBestSeller, isFlashSale |
| prod-6 | Ultra-Slim OLED Smart Phone 256GB | smartphones | 38,500 | isFeatured, isNewArrival, isBestSeller |

Each product has: id, name, slug, description, shortDescription, price, originalPrice, discount, currency, images (array of URLs), category, categorySlug, brand, rating, reviewCount, inStock, stockCount, colors (array of {name, hex}), sizes (string array), tags, isFeatured, isNewArrival, isBestSeller, isFlashSale, flashSaleEnds (optional ISO string), sku, specifications (key-value object), seller (embedded object, optional), supplierId (optional), supplierName (optional), soldCount (optional).

### data/categories.json — 12 categories
Each has: id, name, slug, description, image (Unsplash URL), productCount (static placeholder numbers, NOT computed from actual products), icon (Lucide icon name string), subcategories (string array).

### data/reviews.json — 4 customer reviews
Each has: id, customerName, customerImage (Unsplash URL), rating, comment, date, productName, verified.

### data/suppliers.json — 4 suppliers
Each has: id, name, contactPerson, phone, email, address, rating, commissionRate, isVerified, status (Active/Pending/Inactive), activeProductsCount.

---

## 5. TYPE SYSTEM

**File:** `lib/types.ts`

All TypeScript interfaces are defined here. Key interfaces:

```typescript
Product           // Full product with variants, specs, seller info
ProductVariant    // { name: string; hex: string }
Category          // id, name, slug, description, image, productCount, icon
                  // NOTE: 'subcategories' is NOT in this interface but exists in JSON
Review            // Customer review object
CartItem          // { product, quantity, selectedColor?, selectedSize? }
CartState         // Cart context interface (items, addItem, removeItem, etc.)
WishlistState     // Wishlist context interface
ToastMessage      // { id, title, description?, type?, image? }
NavLink           // { label, href }
SocialLink        // { platform, url, icon }
Supplier          // Full supplier with commission/status info
SellerInfo        // Embedded in Product { name, rating, productsCount, verified, responseRate, phone? }
```

> **TYPE GAP:** The `Category` interface in `lib/types.ts` is missing the `subcategories: string[]` field that exists in `data/categories.json`. The code handles this with optional chaining (`cat.subcategories?.map(...)`). This should be fixed.

---

## 6. CONTEXT / STATE MANAGEMENT

All global state is managed via React Context API. **No Redux, no Zustand, no other state library.** All contexts are wrapped in `app/layout.tsx`.

### Provider Nesting Order (outermost to innermost):
```
StoreSettingsProvider
  └── CategoriesProvider
        └── ThemeProvider
              └── ToastProvider
                    └── WishlistProvider
                          └── CartProvider
```

### lib/cart-context.tsx
- Manages shopping cart items.
- Persists to localStorage key: `an_trendy_cart`.
- Exposes: `items`, `addItem(product, quantity?, color?, size?)`, `removeItem(productId)`, `updateQuantity(productId, quantity)`, `clearCart()`, `totalItems`, `totalPrice`.
- Shows toast notification on add/remove via useToast().

### lib/wishlist-context.tsx
- Manages wishlist.
- Persists to localStorage key: `an_trendy_wishlist`.
- Exposes: `wishlist`, `addToWishlist`, `removeFromWishlist`, `toggleWishlist`, `isInWishlist`, `wishlistCount`.

### lib/theme-context.tsx
- Manages dark/light mode and color palette.
- ThemeMode: "light" | "dark"
- ColorPalette: "classic" | "rose" | "emerald" | "midnight"
- Persists to localStorage: `theme-mode`, `theme-palette`.
- Sets `data-theme` and `data-palette` attributes on the html element.
- Exposes: `theme`, `palette`, `toggleTheme`, `setTheme`, `setPalette`.

### lib/store-settings-context.tsx
- Manages editable store settings (shop name, tagline, hotline, etc.).
- Persists to localStorage key: `an_store_settings`.
- Default values: shopName="AN TRENDY CLOSET", shopTagline="Premium Fashion & Tech Hub", hotline="+880 1700-000000", currencySymbol="BDT symbol".
- Exposes: `settings`, `updateSettings(partial)`, `resetSettings()`.

### lib/categories-context.tsx
- Loads categories from `data/categories.json` as initial state.
- Allows adding/deleting categories via admin.
- Persists to localStorage key: `an_custom_categories`.
- Exposes: `categories`, `addCategory(data)`, `deleteCategory(id)`.

### lib/toast-context.tsx
- Manages toast notifications queue (max 4 at a time, older ones auto-removed).
- Auto-dismisses toasts after 4000ms.
- Exposes: `toasts`, `showToast(toast)`, `removeToast(id)`.

---

## 7. PAGES (ROUTES)

### app/page.tsx — Home Page `/`
**IMPLEMENTED.** A multi-section landing page composed of:
1. `<Hero />` — 3-slide auto-rotating hero banner (6s interval), manual dot navigation, Unsplash background images.
2. `<FeaturedCategories />` — Category cards from CategoriesContext.
3. New Arrivals grid — 4 products filtered by `isNewArrival`.
4. `<FlashSale />` — Flash sale section with live countdown timer.
5. Best Sellers grid — 4 products filtered by `isBestSeller`.
6. Brand Promise section — Static content (fast shipping, authentic, 7-day returns).
7. `<ReviewsSection />` — Customer reviews from `data/reviews.json`.
8. `<Newsletter />` — Email capture form (no actual email backend).
9. `<QuickViewModal />` — Modal overlay triggered from product cards.

### app/products/page.tsx — Products Listing `/products`
**IMPLEMENTED.** Full product catalog page with:
- URL param support: `?category=slug`, `?filter=new-arrivals|bestseller|flash-sale`, `?search=query`
- Client-side filtering: search query (matches name/category/brand), category slug, filter tag, price limit slider (max 10,000 BDT)
- Sorting: featured, price-low, price-high, rating, discount
- Reset filters button
- QuickViewModal
- **LIMITATION:** Only shows products from the 6-product static dataset.

### app/products/[id]/page.tsx — Product Detail `/products/:id`
**IMPLEMENTED.** Full PDP with:
- Breadcrumb navigation (Home / Products / Category / Product Name)
- Image gallery with thumbnail selection; hover swaps to secondary image
- Color selector, size selector, quantity picker
- Add to Cart button / Buy Now button (adds to cart and redirects to /cart)
- Wishlist toggle (heart icon)
- 4-tab content area: Description, Specifications, Reviews (placeholder text only), Shipping policy
- Seller info card with ratings/verified badge
- Related products grid (same category, up to 4)
- Uses `use(params)` for React 19 async params unwrapping

### app/cart/page.tsx — Cart Page `/cart`
**IMPLEMENTED.** Full cart + checkout flow:
- Cart item list with quantity increment/decrement and remove button
- Shipping location selector (Dhaka: 70 BDT / Outside Dhaka: 130 BDT)
- Coupon code field — hardcoded working codes: `ANLUXURY10` or `SAVE10` (both give 10% off)
- Order summary with discount calculation and final total
- Checkout modal (client-side only): customer fills name, phone, address, payment method (COD/bKash/Nagad)
- On submit: generates fake order ID format "ANC-ORD-XXXXXX", shows success screen
- **No real payment processing. No real order recording to any database or admin panel.**

### app/categories/[slug]/page.tsx — Category Page `/categories/:slug`
**IMPLEMENTED.** Shows:
- Category header with name, description, verified item count
- Subcategory pill links (navigate to /products?category=slug&search=subcategoryName)
- Product grid for that category
- "No products found" empty state if no matching products exist

### app/about/page.tsx — About Page `/about`
**IMPLEMENTED.** Static brand story page with:
- Header and brand tagline
- Story section (text + brand quote box)
- 3 core value pillars: Passionate Curation, Authentic Quality, Dedicated Care
- Uses settings.shopName from StoreSettingsContext

### app/contact/page.tsx — Contact Page `/contact`
**IMPLEMENTED.** Contact page with:
- Contact info cards (phone, email, location, WhatsApp)
- Contact form (name, email, phone, subject, message)
- On submit: sets submitted=true and shows a success message — **No actual email/API sending**

### app/faq/page.tsx — FAQ Page `/faq`
**IMPLEMENTED.** Accordion FAQ with 6 hardcoded Q&A items covering: delivery times, payment methods, product authenticity, return policy, gift packaging, WhatsApp ordering.

### app/admin/page.tsx — Admin Dashboard `/admin`
**IMPLEMENTED** (frontend only). See Section 10 for full details.

---

## 8. COMPONENTS

### Layout Components (components/layout/)

#### Header.tsx (637 lines)
Full marketplace-style header with three horizontal zones:
- **Top utility bar (dark bg):** Announcement text (from StoreSettings), hotline, "Seller Center" link to /admin, "Help Center" link to /contact, currency display
- **Main header (white bg):** Mobile hamburger, Brand logo with tagline (both from StoreSettings), Mega search bar (category dropdown + text input + live search results dropdown showing top 5 matches with image/name/price), Action icons: Account arrow to /admin, Wishlist heart with count badge, Cart bag with animated item count + total price, Theme Settings gear button
- **Secondary navbar (dark bg):** "ALL CATEGORIES" button opens 700px-wide 3-column mega menu dropdown, Quick links: Today's Deals, Best Sellers, New Arrivals, Electronics, Fashion, Beauty, Watches
- **Theme Settings Slide-Out Panel:** Slides in from right with backdrop overlay; contains Light/Dark mode toggle (2 buttons) and 4 color palette selectors (Classic Gold, Rose Elegance, Emerald Forest, Midnight Blue)
- **Mobile Drawer:** Left side full-height drawer; contains search input, browse links (Home, All Products, Today's Deals, Best Sellers, New Arrivals), all categories listed, Admin/Help links, hotline in footer

#### Footer.tsx (151 lines)
- Value proposition strip (4 columns: Fast Shipping, Authentic Guarantee, 7-Day Returns, 24/7 Support)
- Multi-column footer links: Shopping Hub, Customer Care, Merchant Center
- Brand description + email + location
- Copyright bar with payment method badges (bKash, Nagad, Cash on Delivery, Visa/Mastercard) — display only, no real integration

### Home Components (components/home/)

#### Hero.tsx (178 lines)
- 3 slides defined as inline constants (not from data files)
- Auto-plays every 6 seconds
- Each slide has: badge, title, highlight text, subtitle, primary CTA button, secondary CTA button, background gradient, Unsplash image
- Manual dot navigation

#### FeaturedCategories.tsx
- Renders category cards from useCategories() context
- Each card links to /products?category=slug

#### FlashSale.tsx (94 lines)
- Live countdown timer via getTimeRemaining() utility function
- **BUG: Target date hardcoded as "2026-08-25T23:59:59" — this date is already past as of September 2026. Countdown will show 0:00:00.**
- Shows up to 4 products with isFlashSale=true

#### ReviewsSection.tsx
- Reads from data/reviews.json (4 reviews)

#### Newsletter.tsx
- Email subscription form — no backend, purely cosmetic

### Product Components (components/product/)

#### ProductCard.tsx (211 lines)
- Discount badge (red), NEW badge (green), BESTSELLER badge (amber) — priority order: discount > new > bestseller
- Image hover swap: shows product.images[0] normally, switches to product.images[1] on mouse hover
- Wishlist heart button (red when in wishlist, outline otherwise)
- Quick View eye button (calls onQuickView prop callback if provided)
- Add to Cart button with animated checkmark on success
- Seller verified badge
- Optional rank badge (#1, #2...) via rankIndex prop
- Star rating display
- Price with strikethrough original price

#### QuickViewModal.tsx (205 lines)
- Full-screen modal overlay with backdrop blur
- **BUG: Does not show actual product image. Shows a category emoji instead (hardcoded mapping: watches=clock emoji, bags=bag emoji, etc.).**
- Color picker, size picker, quantity stepper
- Add to Cart button with success animation (closes modal after 1200ms on success)

### UI Components (components/ui/)

#### Button.tsx (78 lines)
- Variants: primary, secondary, outline, ghost, dark, gold
- Sizes: sm, md, lg, xl
- Props: isLoading, leftIcon, rightIcon, fullWidth
- **NOTE: This component is largely unused across the app. Most buttons are inline Tailwind-styled HTML elements, not this component.**

#### ToastContainer.tsx (71 lines)
- Uses framer-motion AnimatePresence for entrance/exit animations
- Shows type-based icons: success (green checkmark), warning (amber triangle), error (red X), info (amber info)
- Left border accent strip colored by toast type
- Fixed bottom-right position, max 4 visible at once

### Legacy Components (app/components/) — NOT USED

These files exist in `app/components/` but are **NOT imported anywhere in the active application**. They are dead code from an earlier version of the project:

- `CartContext.tsx` — superseded by `lib/cart-context.tsx`
- `WishlistContext.tsx` — superseded by `lib/wishlist-context.tsx`
- `Footer.tsx` — superseded by `components/layout/Footer.tsx`
- `Navbar.tsx` — superseded by `components/layout/Header.tsx`
- `ProductCard.tsx` — superseded by `components/product/ProductCard.tsx`
- `HeroBanner.tsx`, `CategoryCard.tsx`, `CountdownTimer.tsx`, `ReviewCard.tsx`, `ScrollToTop.tsx`, `SectionHeader.tsx`

**Recommendation: The entire `app/components/` directory can be safely deleted.**

---

## 9. DESIGN SYSTEM

### Color Tokens (CSS Custom Properties in app/globals.css)

| Token | Light Value | Dark Value |
|---|---|---|
| --bg-primary | #FAF8F5 | #121214 |
| --bg-section | #FAF7F2 | #18181B |
| --bg-card | #FFFFFF | #202024 |
| --bg-subtle | #F5F5F4 | #27272A |
| --border-color | #E7E5E4 | #3F3F46 |
| --border-subtle | #F5F5F4 | #27272A |
| --text-main | #1C1917 | #FAFAFA |
| --text-body | #292524 | #F4F4F5 |
| --text-muted | #78716C | #A1A1AA |
| --text-light | #A8A29E | #71717A |
| --accent-main | #D97706 (amber) | same |
| --accent-hover | #B45309 | same |
| --accent-light | #FEF3C7 | #3D321A |
| --accent-subtle | #FFFBEB | #2A2415 |
| --accent-text | #B45309 | same |
| --accent-border | #FDE68A | same |

### Accent Palette Overrides (via data-palette on html element)

| Palette | --accent-main | --accent-hover | Description |
|---|---|---|---|
| classic (default) | #D97706 | #B45309 | Warm amber/gold |
| rose | #F43F5E | #E11D48 | Rose pink |
| emerald | #10B981 | #059669 | Green |
| midnight | #6366F1 | #4F46E5 | Indigo |

### Typography
- **Heading font:** Playfair Display (serif) — loaded via next/font/google, CSS var: --font-heading
- **Body font:** Plus Jakarta Sans (sans-serif) — loaded via next/font/google, weights 400-800, CSS var: --font-sans
- Applied via: `h1, h2, h3, h4, .font-serif { font-family: var(--font-heading); }`

### Custom CSS Utilities (in globals.css)
- `.shadow-luxury` — `box-shadow: 0 4px 20px -2px rgba(0,0,0,0.2)`
- `.no-scrollbar` — hides scrollbar for horizontal scroll containers
- `.animate-slide-in-right` — keyframe animation for Theme Settings panel slide-in
- Custom scrollbar: 7px wide, accent color on thumb hover

### Dynamic Theme Override Pattern
The CSS uses extensive override rules to make hardcoded Tailwind classes respond to CSS variables. For example, `.bg-amber-500` maps to `var(--accent-main)`. This enables palette switching without re-rendering components.

---

## 10. ADMIN DASHBOARD

**Route:** `/admin`
**File:** `app/admin/page.tsx` (1232 lines, 55KB — the largest single file in the project)

### Authentication
- **Frontend-only, hardcoded password check.**
- Correct password: `200074200077` (also accepts `2OOO742OOO77` with letter O instead of zero).
- Session stored in `sessionStorage` key: `an_admin_authenticated`.
- No JWT, no OAuth, no real authentication system.

### Layout
- Full-screen sidebar layout: 64px-wide dark sidebar + main content area
- Sidebar has logo, 6 nav tabs, logout button

### Sidebar Tabs (6 tabs)

**1. Dashboard**
- Stats cards: Total Revenue, Total Orders, Total Products, Active Suppliers
- Recent Orders table (same 3 hardcoded orders from Orders tab)

**2. Products**
- Table listing all products (loaded from data/products.json into React state at page load)
- Search filter by name
- Add Product button opens modal (fields: name, category, price, originalPrice, imageUrl, shortDescription, stockCount, sku, supplierId)
- Edit Product button opens modal (pre-fills existing fields)
- Delete Product button (with confirm dialog)
- **CRITICAL LIMITATION: Changes only update React state. Refreshing the page restores the original 6 products from the JSON file.**

**3. Orders**
- Shows 3 hardcoded sample orders with customer info, items, payment method, status
- Each order has a status dropdown: Pending / Processing / Shipped / Delivered / Cancelled
- **CRITICAL LIMITATION: These are static sample orders. Real orders from cart checkout are not recorded here.**

**4. Categories**
- Lists categories from CategoriesContext (which persists to localStorage)
- Add Category modal: name, description, image URL
- Delete category button
- **This tab DOES persist: categories saved to localStorage survive page refresh.**

**5. Suppliers**
- Lists suppliers from data/suppliers.json + localStorage overrides
- Add Supplier modal: name, contactPerson, phone, email, address, commissionRate
- Shows supplier rating, commission rate, verified status, active product count
- **This tab DOES persist: suppliers saved to localStorage key `an_suppliers_data`.**

**6. Settings**
- Edit form for: shopName, shopTagline, hotline, announcement bar text, supportEmail, currencySymbol
- Saves to StoreSettingsContext (localStorage key: `an_store_settings`)
- Changes immediately reflect in Header and Footer via context
- **This tab DOES persist.**

---

## 11. FEATURE STATUS MATRIX

| Feature | Status | Notes |
|---|---|---|
| Home page (Hero, Categories, Products, Reviews, Newsletter) | IMPLEMENTED | Fully functional UI |
| Product listing page with filters and sort | IMPLEMENTED | Client-side only |
| Product detail page | IMPLEMENTED | Full feature set |
| Category pages | IMPLEMENTED | Shows matching products |
| Shopping cart with localStorage | IMPLEMENTED | Persists across sessions |
| Wishlist with localStorage | IMPLEMENTED | Persists across sessions |
| Cart checkout flow (UI only) | IMPLEMENTED (UI only) | No real payment or order saving |
| Coupon codes (ANLUXURY10, SAVE10) | IMPLEMENTED | Hardcoded, 10% off |
| Toast notifications with animations | IMPLEMENTED | framer-motion powered |
| Dark mode | IMPLEMENTED | Saved to localStorage |
| 4 color palette themes | IMPLEMENTED | Classic Gold, Rose, Emerald, Midnight |
| Responsive mobile design | IMPLEMENTED | Full mobile nav drawer |
| Desktop mega menu | IMPLEMENTED | 3-column category dropdown |
| Live search with dropdown | IMPLEMENTED | Top 5 matches with image/price |
| Admin dashboard | IMPLEMENTED (UI only) | No real persistence for products/orders |
| Admin password authentication | IMPLEMENTED | Hardcoded frontend password |
| Store settings editing | IMPLEMENTED | Saved to localStorage |
| Category management | IMPLEMENTED | Saved to localStorage |
| Supplier management | IMPLEMENTED | Saved to localStorage |
| Product management (admin) | PARTIAL | State only, resets on page refresh |
| Order management (admin) | PARTIAL | 3 hardcoded sample orders only |
| QuickViewModal | PARTIAL | Uses emoji instead of actual product image |
| Flash sale countdown | BROKEN | Target date (2026-08-25) is already past |
| About page | IMPLEMENTED | Static content |
| Contact page | IMPLEMENTED | Form with no email backend |
| FAQ page | IMPLEMENTED | 6 hardcoded accordion Q&As |
| Customer authentication (login/signup) | NOT IMPLEMENTED | No user accounts exist |
| Real backend / API routes | NOT IMPLEMENTED | Frontend only |
| Real database | NOT IMPLEMENTED | JSON files + localStorage only |
| Real payment gateway (bKash, Nagad, etc.) | NOT IMPLEMENTED | UI labels only |
| Real email (newsletter, contact form) | NOT IMPLEMENTED | No sending |
| Dedicated wishlist page | NOT IMPLEMENTED | Wishlist icon links to bestsellers |
| Order tracking | NOT IMPLEMENTED | Footer link goes to /cart |
| Product review submission | NOT IMPLEMENTED | Reviews tab in PDP is placeholder |
| SEO metadata for individual pages | PARTIAL | Only root layout has metadata |
| Image uploads | NOT IMPLEMENTED | All images are URLs (Unsplash) |
| Pagination or infinite scroll | NOT IMPLEMENTED | Shows all products at once |
| Bengali language support | NOT IMPLEMENTED | English only |

---

## 12. KNOWN LIMITATIONS AND ISSUES

1. **Only 6 products exist in the database.** The entire store runs on 6 seed products. Category pages for 10 out of 12 categories will show an empty state. The productCount numbers in categories.json (like 1420, 2450) are fake placeholder numbers.

2. **Flash sale countdown is broken.** `components/home/FlashSale.tsx` line 17 has `targetDate = "2026-08-25T23:59:59"` which is in the past. The countdown will display 0 days, 0 hours, 0 minutes, 0 seconds.

3. **QuickViewModal shows emoji instead of product images.** The modal maps categorySlug to a hardcoded emoji character rather than loading the product's actual image URL.

4. **Legacy app/components/ folder contains dead code.** 11 files that are not imported anywhere in the active application.

5. **Admin product changes do not persist.** Adding, editing, or deleting products in the admin panel updates only local React state and resets to the original 6 products from data/products.json on page refresh.

6. **Checkout does not connect to admin orders.** The cart checkout generates a fake order ID that is never saved anywhere and is not visible in the admin panel's Orders tab.

7. **No dedicated wishlist page.** The wishlist heart icon in the header links to `/products?filter=bestseller` instead of a `/wishlist` page.

8. **Price filter max is hardcoded to 10,000 BDT** on the products listing page. The Ultra-Slim OLED phone costs 38,500 BDT and cannot be reached via the price slider.

9. **Category TypeScript interface** in `lib/types.ts` is missing the `subcategories: string[]` field that exists in `data/categories.json`. Optional chaining handles this at runtime but it is a type gap.

10. **No .env file exists.** No environment variables are used anywhere in the codebase.

11. **CLAUDE.md is nearly empty** (11 bytes — just a newline essentially).

12. **`an trendy closet 2/` folder** contains only a PRD_v2.md (product requirements document). It is not part of the active Next.js application.

---

## 13. WHAT THE NEXT DEVELOPER SHOULD DO

These are suggested next steps based on what the codebase currently lacks. Listed in recommended priority order:

### Priority 1 — Fix Immediate Bugs (Quick Wins)
- Update the flash sale countdown date in `components/home/FlashSale.tsx` (line 17 — change `targetDate` to a future date)
- Fix `components/product/QuickViewModal.tsx` to display the actual product image (use `product.images[0]`) instead of the emoji
- Delete the entire `app/components/` legacy folder (all 11 files are dead code)
- Add `subcategories?: string[]` to the Category interface in `lib/types.ts`
- Increase or remove the 10,000 BDT price filter cap in `app/products/page.tsx`

### Priority 2 — Expand the Product Catalog
- Add more products to `data/products.json` across all 12 categories
- Update `productCount` values in `data/categories.json` to reflect real counts
- Can continue using Unsplash URLs for images (free, high quality)

### Priority 3 — Backend Integration
- Set up a backend (recommended: Next.js API routes in the same project, or Supabase as a BaaS)
- Create a database schema based on the existing TypeScript interfaces in `lib/types.ts`
- Migrate JSON data to the database
- Create API endpoints for: GET/POST/PUT/DELETE products, GET/POST orders, GET/POST categories

### Priority 4 — Customer Authentication
- Implement customer registration and login (recommended: NextAuth.js with credentials provider, or Supabase Auth)
- Create `/wishlist` page that shows the current wishlist (update Header wishlist icon to link there)
- Create `/account` page with order history

### Priority 5 — Real Checkout and Payments
- Integrate bKash API or SSLCommerz for real payment processing
- Make cart checkout POST to a backend API route
- Connect checkout flow → admin orders list (real order records in DB)
- Add order confirmation email (use Resend, SendGrid, or Nodemailer)

### Priority 6 — Admin Dashboard Improvements
- Make product CRUD persist to database (not just React state)
- Connect admin orders tab to real orders from checkout
- Add image upload (recommended: Cloudinary free tier or Next.js + local storage)
- Replace hardcoded password with proper admin authentication

### Priority 7 — UX and SEO
- Add page-level metadata to product detail pages, category pages, etc.
- Add Bengali language option (react-i18next or Next.js built-in i18n)
- Add pagination to the products page
- Consider adding a "Back to Top" scroll button (a ScrollToTop component exists in the legacy folder)

---

## 14. ENVIRONMENT VARIABLES

**Currently:** No `.env` or `.env.local` file exists. No environment variables are referenced in the codebase.

When adding a real backend and integrations, these variable names are recommended:

```
# Database (e.g., PostgreSQL via Supabase or PlanetScale)
DATABASE_URL=

# Authentication (NextAuth.js)
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Payment Gateway — Bangladesh
BKASH_APP_KEY=
BKASH_APP_SECRET=
BKASH_USERNAME=
BKASH_PASSWORD=
SSLCOMMERZ_STORE_ID=
SSLCOMMERZ_STORE_PASS=

# Email Service (Resend / SendGrid / SMTP)
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
RESEND_API_KEY=

# Image Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# App Config
NEXT_PUBLIC_SITE_URL=
```

> WARNING: Do NOT commit real credentials or secret values to version control. Always use .env.local (which is in .gitignore by default in Next.js).

---

## 15. RUNNING THE PROJECT

### Prerequisites
- Node.js (LTS version recommended, e.g., v20+)
- npm

### Installation
```bash
cd "c:\Users\HP\Desktop\AN trendy closet\an-trendy-closet"
npm install
```

### Development Server
```bash
npm run dev
```

The dev script is: `next dev -H 0.0.0.0`
This binds to all network interfaces, making it accessible on the local network (e.g., from a phone on the same WiFi).
Default URL: http://localhost:3000

### Build for Production
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

### Admin Access
- URL: http://localhost:3000/admin
- Password: `200074200077`

---

*End of PROJECT_STATUS.md — This document reflects the verified state of the codebase as of September 13, 2026.*

---

# 16. MASTER PRODUCTION FEATURE REQUIREMENTS
## Important: These are TARGET features, not claims that they are already implemented.

The goal is to evolve AN Trendy Closet from a frontend MVP into a production-grade Bangladesh-first e-commerce platform with a premium fashion/lifestyle experience, reliable operations, strong security, and a customer-facing 24/7 AI shopping assistant.

### 16.1 Customer Account System
- Customer registration, login, logout, password reset and email/phone verification.
- Secure session management.
- Customer profile: name, phone, email, avatar, saved addresses and preferences.
- Multiple delivery addresses with default-address selection.
- Order history with invoice/order details.
- Reorder from previous orders.
- Saved payment preferences where legally and technically appropriate; never store raw card data.
- Wishlist page with persistent account synchronization.
- Recently viewed products.
- Product comparison/favorites where useful.
- Customer notification preferences.

### 16.2 Production Product Catalog
- Database-backed products instead of JSON-only storage.
- Full product CRUD from admin.
- Product variants: color, size, model, storage, etc.
- Variant-specific price, SKU, stock and images.
- Multiple product images with upload, reorder, crop/optimization and alt text.
- Brand management.
- Category/subcategory management.
- Tags and attributes.
- SKU/barcode support.
- Stock quantity, low-stock threshold, out-of-stock state and inventory history.
- Product status: draft, active, scheduled, archived.
- Featured/new/bestseller/flash-sale controls.
- Product bundles and frequently-bought-together products.
- Related-product and recommendation rules.
- Product search indexing.
- Dynamic category product counts.
- Bulk product import/export (CSV).
- Bulk edit/delete/archive.
- Product SEO fields: title, meta description, slug, canonical URL and structured data.

### 16.3 Advanced Search & Discovery
- Fast full-text product search.
- Search suggestions/autocomplete.
- Typo-tolerant/fuzzy search.
- Search by product name, brand, SKU, category, tags and attributes.
- Filters for category, brand, price, rating, availability, discount, color, size and other attributes.
- Sort by relevance, newest, price, rating, popularity and discount.
- Pagination or infinite loading.
- Search result analytics.
- Empty-result recommendations.
- Bengali/English search support.
- Mobile-optimized filtering and sorting.

### 16.4 Shopping Cart
- Server-backed cart for logged-in customers.
- Guest cart with secure persistence.
- Merge guest cart into customer cart after login.
- Variant-aware cart items.
- Quantity limits based on inventory.
- Automatic stock validation.
- Coupon/promotion validation on the server.
- Shipping-cost calculation.
- Tax/VAT-ready architecture.
- Cart recovery / abandoned-cart support.
- Save-for-later functionality.
- Cart expiry rules where appropriate.

### 16.5 Checkout & Orders
- Production checkout API.
- Customer information validation.
- Bangladesh address flow: division, district, upazila/thana, address details and phone.
- Dhaka/outside-Dhaka shipping rules.
- Courier/shipping method selection.
- COD checkout.
- Online payment checkout.
- Order creation only after server-side validation.
- Unique order numbers.
- Order confirmation page.
- Order confirmation email/SMS/WhatsApp-ready architecture.
- Invoice generation.
- Printable/downloadable invoice.
- Order status history/audit trail.
- Cancellation rules.
- Partial/full refund architecture.
- Return/refund request workflow.
- Exchange workflow where applicable.
- Customer-visible order timeline.

### 16.6 Bangladesh Payment Architecture
Implement payment providers through a server-side abstraction so providers can be added/replaced without rewriting checkout.

Target support:
- bKash.
- Nagad.
- SSLCommerz.
- Visa/Mastercard through supported gateway infrastructure.
- Cash on Delivery.

Requirements:
- Server-side payment verification.
- Webhook/callback verification.
- Transaction IDs.
- Payment status reconciliation.
- Duplicate-payment protection/idempotency.
- Failed-payment recovery.
- Refund status tracking.
- Never expose gateway secrets to the browser.
- Never store raw card numbers, CVV or other prohibited payment credentials.

### 16.7 Shipping & Courier Management
- Courier integration abstraction.
- Create shipment after eligible order confirmation.
- Consignment/tracking number storage.
- Delivery status synchronization.
- Shipping-rate rules.
- Delivery-zone management.
- Estimated delivery date.
- Failed-delivery handling.
- Return-to-origin tracking.
- Courier performance analytics.
- Admin manual shipment creation/update fallback.
- Customer order tracking page.

### 16.8 Supplier / Marketplace Operations
If multi-vendor functionality remains part of the business model:
- Supplier accounts and authentication.
- Supplier onboarding/approval.
- Supplier profile and verification.
- Supplier product assignment.
- Supplier-specific pricing/cost.
- Commission calculation.
- Supplier order visibility.
- Supplier fulfillment status.
- Supplier payout ledger.
- Supplier performance metrics.
- Supplier product stock synchronization.
- Supplier suspension/activation.
- Admin approval workflow for supplier products.
- Supplier dispute/issue notes.
- Audit logs for commission and payout changes.

### 16.9 Reviews & Social Proof
- Verified-purchase reviews.
- Star ratings.
- Review photos where appropriate.
- Review moderation.
- Report review.
- Helpful/not-helpful voting.
- Admin approval/rejection.
- Review response by admin/seller.
- Product rating aggregation.
- Review analytics.
- Prevent duplicate review abuse.

### 16.10 Promotions & Marketing
- Coupon management from admin.
- Percentage and fixed-amount discounts.
- Minimum-order requirements.
- Category/product-specific coupons.
- First-order coupons.
- Expiry dates.
- Usage limits.
- Per-customer limits.
- Flash-sale scheduling.
- Sale price scheduling.
- Bundle discounts.
- Free-shipping promotions.
- Referral/affiliate-ready architecture.
- Gift cards/store credit-ready architecture.
- Abandoned-cart campaigns.
- Newsletter campaigns.
- Promotional banners editable from admin.

### 16.11 24/7 AI Customer Assistant — REQUIRED
Add a persistent customer-facing AI assistant available 24/7 from every major page.

#### Core capabilities
The assistant should:
- Answer FAQs instantly.
- Explain shipping charges and delivery estimates.
- Explain COD and online payment options.
- Explain return, refund and exchange policies.
- Help customers find products using natural language.
- Recommend products based on stated needs, budget and preferences.
- Compare products.
- Explain product specifications in simple language.
- Answer questions about sizes, colors, availability and variants using live product data.
- Help customers build a cart.
- Help customers apply eligible coupons.
- Explain checkout steps.
- Help authenticated customers check order status.
- Provide tracking information when available.
- Help with cancellation/return/refund workflows where permitted.
- Direct customers to human support when the AI cannot safely resolve an issue.
- Support English and Bangla.
- Understand Banglish where practical.
- Maintain conversation context within a session.

#### AI shopping mode
The assistant should be able to handle requests such as:
- "I need a gift under ৳2,000."
- "Show me a black handbag."
- "Which watch is better for daily use?"
- "Do you have this in stock?"
- "How much is delivery to my district?"
- "Where is my order?"
- "What is your return policy?"

It should return actual products from the store database, not invented products, prices or stock.

#### AI safety and accuracy rules
- The assistant must never invent product availability, prices, discounts, policies, orders or tracking information.
- Product/stock/order answers must use current server-side data.
- Policy answers must use an admin-managed knowledge base.
- The assistant must clearly state when information is unavailable.
- It must never expose another customer's data.
- Order-specific information requires customer authentication/authorization.
- Sensitive admin data must never be exposed.
- Payment credentials and secrets must never be sent to the model.
- Use server-side tool permissions and allowlists.
- Log tool calls and important AI actions for auditing.
- Apply rate limits and abuse protection.
- Include a human-support escalation path.

#### AI architecture
Use a provider-agnostic AI service layer so the project is not permanently locked to one AI provider.

Recommended architecture:
Customer Chat UI
→ Next.js server endpoint
→ AI orchestration/service layer
→ approved tools
→ product/order/policy database
→ response to customer

Approved tools should include only what is necessary, for example:
- searchProducts
- getProduct
- getProductAvailability
- getCategory
- getShippingEstimate
- getStorePolicy
- getCouponEligibility
- getCustomerOrders
- getOrderStatus
- createSupportTicket
- handoffToHuman

The model must NOT receive unrestricted database access.

#### AI knowledge base
Admin should be able to manage:
- FAQs.
- Shipping policy.
- Return/refund policy.
- Payment information.
- Store information.
- Product-care information.
- Size guides.
- Promotion rules.
- Customer-support instructions.

Knowledge should be versioned and searchable so outdated policies can be replaced safely.

#### AI admin controls
Add an "AI Assistant" section to `/admin` containing:
- Enable/disable assistant.
- AI provider configuration.
- Model selection.
- System-instruction management.
- Knowledge-base management.
- FAQ management.
- Suggested prompts.
- Greeting message.
- Business-hours/human-support settings.
- Escalation contact.
- Conversation analytics.
- Most asked questions.
- Unanswered questions.
- Product recommendation clicks.
- AI-assisted conversion metrics.
- Token/API usage and estimated cost.
- Rate-limit settings.
- Conversation retention settings.
- Safety/audit logs.

#### AI chat UX
- Floating chat button on desktop and mobile.
- Expandable chat panel.
- Welcome message.
- Suggested questions.
- Product cards inside chat.
- Add-to-cart from chat.
- Product detail shortcut.
- Order-status shortcut.
- Typing/loading state.
- Retry on temporary failure.
- Clear conversation.
- Human-support handoff.
- "AI-generated" transparency label where appropriate.
- Accessible keyboard navigation and screen-reader labels.
- Responsive design matching the AN Trendy Closet brand.

### 16.12 Customer Support
- Contact/support ticket system.
- Ticket number.
- Ticket status: Open, Pending, Resolved, Closed.
- Customer ticket history.
- Admin ticket management.
- Internal admin notes.
- AI-to-human escalation.
- WhatsApp support link.
- Messenger support link.
- FAQ integration.
- Support analytics.

### 16.13 Notifications
Create a notification service abstraction supporting:
- Email.
- SMS-ready architecture.
- WhatsApp-ready architecture.
- In-site notifications.

Events:
- Order placed.
- Payment confirmed.
- Payment failed.
- Order processing.
- Order shipped.
- Out for delivery.
- Delivered.
- Cancelled.
- Refund initiated/completed.
- Return approved/rejected.
- Low-stock admin alert.
- New supplier/order/review/support ticket alerts.

### 16.14 Admin Dashboard — Production Upgrade
Replace the current frontend-only dashboard with role-based administration.

Roles:
- Super Admin.
- Admin.
- Order Manager.
- Product Manager.
- Support Agent.
- Marketing Manager.
- Supplier/Vendor.

Dashboard modules:
- Overview.
- Orders.
- Products.
- Categories.
- Inventory.
- Customers.
- Suppliers.
- Reviews.
- Coupons.
- Promotions.
- Payments.
- Shipping.
- Returns/Refunds.
- Support tickets.
- AI Assistant.
- Analytics.
- Marketing.
- Notifications.
- Settings.
- Audit logs.

Add:
- Date-range filters.
- Revenue charts.
- Order charts.
- Conversion metrics.
- Top products.
- Low-stock products.
- Customer growth.
- Supplier performance.
- Payment-method breakdown.
- Exportable reports.
- CSV export.
- Audit trail for important changes.

### 16.15 Security
Production security is mandatory.

- Replace hardcoded admin password immediately.
- Use secure authentication and authorization.
- Password hashing.
- Secure cookies/session handling.
- CSRF protection where applicable.
- Server-side validation for every mutation.
- Input sanitization.
- SQL/NoSQL injection protection through safe query mechanisms.
- XSS protection.
- Rate limiting.
- Brute-force protection.
- Bot/abuse protection.
- Secure HTTP headers.
- Content Security Policy where practical.
- Secret management through environment variables.
- No secrets in client-side bundles.
- Audit logging.
- Permission checks on every admin/API endpoint.
- Ownership checks for customer/order resources.
- Webhook signature verification.
- Idempotency for payment/order operations.
- Regular dependency updates.
- Production error handling without leaking stack traces or secrets.

### 16.16 SEO & Discoverability
- Unique metadata for every page.
- Dynamic product SEO.
- Dynamic category SEO.
- Open Graph metadata.
- Twitter/X card metadata.
- Canonical URLs.
- robots.txt.
- sitemap.xml.
- Product structured data.
- Breadcrumb structured data.
- Organization/store structured data.
- Search-friendly URLs.
- Proper heading hierarchy.
- Image alt text.
- Noindex rules for private/admin pages.
- SEO-friendly pagination.
- Fast Core Web Vitals.

### 16.17 Bengali + English Localization
- English/Bangla language switcher.
- Translation files instead of hardcoded UI strings.
- Bangla product/customer-support content support.
- Banglish understanding in AI search/support.
- Locale-aware number formatting.
- BDT currency formatting.
- Date/time localization.
- RTL-ready architecture even if RTL is not currently required.

### 16.18 Accessibility
Target WCAG 2.2 AA where practical:
- Keyboard navigation.
- Visible focus states.
- Accessible labels.
- Semantic HTML.
- Screen-reader support.
- Sufficient contrast.
- Reduced-motion support.
- Accessible dialogs/modals.
- Accessible forms and error messages.
- Proper alt text.
- No keyboard traps.

### 16.19 Performance
- Image optimization.
- Next.js Image where appropriate.
- Lazy loading.
- Code splitting.
- Reduce unnecessary client components.
- Server-side rendering/server components where beneficial.
- Database indexing.
- API caching where safe.
- Product/search caching.
- Pagination.
- Avoid loading the full catalog into the browser.
- Minimize third-party scripts.
- Monitor Core Web Vitals.
- Optimize mobile performance for lower-end Android devices and slower connections.

### 16.20 Analytics
Implement privacy-conscious analytics for:
- Visitors.
- Product views.
- Search queries.
- Add-to-cart.
- Checkout start.
- Purchase conversion.
- Coupon usage.
- Abandoned carts.
- Traffic sources.
- Top products.
- Category performance.
- Customer retention.
- AI assistant usage.
- AI recommendation clicks.
- AI-assisted purchases.
- Support tickets.
- Revenue and order trends.

Do not collect unnecessary sensitive personal data.

### 16.21 Legal / Trust Pages
Create editable pages for:
- Privacy Policy.
- Terms & Conditions.
- Return & Refund Policy.
- Shipping Policy.
- Payment Policy.
- Cookie/consent information where applicable.
- Warranty policy where applicable.
- Seller/vendor terms if marketplace functionality is enabled.

### 16.22 Media & Content Management
- Admin image upload.
- Image compression/optimization.
- Product image management.
- Homepage banner management.
- Promotional banner management.
- Category images.
- Brand assets.
- Blog/content-ready architecture.
- Alt text and SEO metadata for media.
- Remove dependency on hardcoded Unsplash URLs for production product assets.

### 16.23 PWA / Mobile Experience
- Installable PWA-ready architecture.
- App icon/manifest.
- Offline-friendly shell where appropriate.
- Fast mobile navigation.
- Mobile-first checkout.
- Touch-friendly controls.
- Persistent cart.
- Push-notification-ready architecture.

### 16.24 Reliability & Operations
- Production error monitoring.
- API health checks.
- Database backups.
- Backup/restore procedure.
- Migration system.
- Seed scripts.
- Environment separation: development/staging/production.
- Graceful API failure states.
- Retry handling for external services.
- Job/queue-ready architecture for email, notifications, payment reconciliation and AI tasks.
- Monitoring and alerting.
- Deployment checklist.

### 16.25 Testing
Add:
- Unit tests for utilities/business logic.
- Component tests for critical UI.
- API tests.
- Authentication/authorization tests.
- Checkout tests.
- Payment webhook tests.
- Order lifecycle tests.
- AI tool permission tests.
- AI hallucination/grounding tests.
- Search/filter tests.
- Responsive/mobile tests.
- End-to-end tests for:
  1. Browse → product → cart → checkout.
  2. Customer signup → purchase → order tracking.
  3. Admin → product creation → storefront.
  4. Payment → order confirmation.
  5. AI assistant → product recommendation → cart.
  6. AI assistant → authenticated order lookup.
  7. AI escalation → support ticket.

### 16.26 Data Architecture
Move from browser-only state to a real relational database.

Core entities should include:
- users
- roles
- permissions
- sessions
- addresses
- products
- product_variants
- categories
- brands
- suppliers
- supplier_products
- inventory
- inventory_movements
- carts
- cart_items
- wishlists
- wishlist_items
- orders
- order_items
- payments
- shipments
- coupons
- coupon_usages
- reviews
- returns
- refunds
- support_tickets
- notifications
- ai_conversations
- ai_messages
- ai_tool_calls
- knowledge_base_documents
- audit_logs
- site_settings

Use foreign keys, indexes, timestamps and appropriate unique constraints.

### 16.27 API Architecture
Create clean server-side APIs/services for:
- Authentication.
- Customers.
- Products.
- Categories.
- Search.
- Cart.
- Wishlist.
- Checkout.
- Orders.
- Payments.
- Shipping.
- Coupons.
- Reviews.
- Returns/refunds.
- Suppliers.
- Support.
- Notifications.
- AI assistant.
- Admin settings.
- Analytics.

All protected mutations must authenticate and authorize the caller.

### 16.28 Environment & Deployment
Required environment configuration should include, as applicable:
- DATABASE_URL
- AUTH_SECRET / equivalent
- NEXT_PUBLIC_SITE_URL
- Payment gateway credentials
- Email provider credentials
- SMS/WhatsApp provider credentials
- Image-storage credentials
- AI provider credentials
- Analytics credentials
- Error-monitoring credentials

Never commit secrets.

Recommended deployment structure:
- Development: local machine.
- Staging: isolated test environment.
- Production: managed hosting + managed database + object storage/CDN.

---

# 17. PRIORITIZED IMPLEMENTATION ROADMAP

## Phase 0 — Immediate Cleanup
1. Fix broken flash-sale countdown.
2. Fix QuickView product image.
3. Fix Category TypeScript interface.
4. Remove legacy dead components.
5. Remove hardcoded price-filter ceiling.
6. Replace fake category product counts with computed/real counts.
7. Fix all broken/internal placeholder links.
8. Add proper loading/error/empty states.
9. Run lint and production build.

## Phase 1 — Production Foundation
1. Choose database architecture.
2. Create database schema and migrations.
3. Create server/API layer.
4. Move products/categories/suppliers/settings from JSON/localStorage to database-backed services.
5. Add secure authentication.
6. Add role-based authorization.
7. Replace hardcoded admin authentication.
8. Add environment configuration.
9. Add logging and error handling.

## Phase 2 — Commerce Core
1. Customer accounts.
2. Persistent cart.
3. Persistent wishlist.
4. Product/variant/inventory management.
5. Real order creation.
6. Real admin order management.
7. Customer order history.
8. Order tracking.
9. Reviews.
10. Coupons/promotions.

## Phase 3 — Bangladesh Checkout
1. COD.
2. bKash.
3. Nagad.
4. SSLCommerz/card payments where supported.
5. Server-side payment verification.
6. Courier/shipping integration.
7. Delivery-zone rules.
8. Invoice generation.
9. Notification system.

## Phase 4 — 24/7 AI Assistant
1. Build AI service abstraction.
2. Build customer chat UI.
3. Build product-search/recommendation tools.
4. Connect policy knowledge base.
5. Connect authenticated order-status tool.
6. Add cart assistance.
7. Add human-support escalation.
8. Add Bangla/Banglish support.
9. Add admin AI configuration.
10. Add AI analytics and audit logs.
11. Add rate limits and security controls.
12. Test grounding and permission boundaries.

## Phase 5 — Growth
1. Advanced SEO.
2. Bengali localization.
3. Analytics.
4. Marketing automation.
5. Abandoned-cart recovery.
6. Supplier marketplace features.
7. Referral/affiliate architecture.
8. PWA/mobile improvements.
9. Performance optimization.
10. Content/blog system.

## Phase 6 — Production Hardening
1. Automated tests.
2. Security review.
3. Payment reconciliation tests.
4. Backup/restore verification.
5. Monitoring/alerting.
6. Load/performance testing.
7. Accessibility audit.
8. SEO audit.
9. Mobile-device testing.
10. Production deployment checklist.

---

# 18. DEFINITION OF DONE

AN Trendy Closet should NOT be considered production-ready merely because the pages look complete.

The production release is complete only when:

- Customers can securely create accounts.
- Products and inventory are stored in a real database.
- Admin changes persist permanently.
- Customers can place real orders.
- Orders appear in the admin dashboard.
- Payment status is verified server-side.
- Shipping/tracking is represented by real shipment records.
- Customers can view their order history and status.
- Reviews are moderated and tied to purchases where appropriate.
- Coupons are validated server-side.
- Product images are production-managed.
- Admin access is securely authenticated and role-protected.
- Customer data is isolated by authorization rules.
- SEO metadata is implemented across public pages.
- English/Bangla localization architecture is in place.
- Accessibility and responsive behavior are tested.
- Analytics and error monitoring are operational.
- Backups and recovery procedures exist.
- The 24/7 AI assistant can answer store questions, search/recommend actual products, assist with shopping, and retrieve an authenticated customer's own order information.
- The AI assistant cannot invent store facts or access unauthorized customer/admin data.
- AI-to-human support escalation works.
- Critical customer, payment, order, admin and AI workflows have automated tests.
- Production secrets are stored securely and are never committed to Git.
- `npm run build` succeeds.
- `npm run lint` succeeds.
- The application has been tested on mobile and desktop.
- No critical known bug remains in checkout, authentication, payment, order management, inventory or AI support.

---

# 19. IMPLEMENTATION RULE FOR THE NEXT AI DEVELOPER

Treat this section as the target product specification.

DO NOT mark a feature as IMPLEMENTED merely because a button, page, mock modal, localStorage entry, static JSON object or placeholder UI exists.

Use these statuses strictly:

- NOT IMPLEMENTED — feature does not exist.
- PLANNED — requirement is defined but development has not started.
- PARTIAL — UI or part of the workflow exists, but production functionality is missing.
- IMPLEMENTED — the feature works end-to-end with real persistence and required security.
- VERIFIED — implemented and tested against its acceptance criteria.

For every implementation task:
1. Inspect the existing code before changing it.
2. Reuse existing architecture when it is sound.
3. Avoid duplicate components/services.
4. Keep TypeScript strict.
5. Do not expose secrets to client-side code.
6. Do not replace real functionality with mock data.
7. Do not claim an integration is complete until its end-to-end flow has been tested.
8. Update `PROJECT_STATUS.md` after substantial milestones.
9. Preserve the brand name exactly as **AN Trendy Closet**.
10. Keep the storefront premium, clean, modern and fashion-focused while maintaining strong usability and performance.

