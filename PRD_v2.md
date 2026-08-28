# AN TRENDY CLOSET — PRODUCT REQUIREMENTS DOCUMENT

**Version:** 2.0  
**Status:** Active / Build Specification  
**Product:** An Trendy Closet  
**Market:** Bangladesh  
**Primary Use:** Production-oriented fashion/beauty ecommerce  
**Primary Development Workflow:** Antigravity IDE + AI-assisted development

---

# 0. AI / ANTIGRAVITY INSTRUCTIONS

This document is the product source of truth.

## 0.1 Before changing code

Always:

1. Inspect the existing project.
2. Identify the current stack and architecture.
3. Read relevant project instruction files.
4. Check existing components and functionality.
5. Do not replace working architecture without a clear reason.
6. Do not modify unrelated files.

If the actual project differs from an assumption in this PRD, inspect the project first and preserve the existing appropriate architecture.

## 0.2 Implementation rules

- Build in small, testable phases.
- Prefer reusable components.
- Prefer maintainable code over shortcuts.
- Keep business logic separate from presentation.
- Use mobile-first responsive design.
- Do not hardcode data that should come from the backend/database.
- Never expose secrets or private API keys in frontend code.
- Never claim a feature works without testing it.
- Do not create fake production integrations.
- Do not silently add major features outside this PRD.

## 0.3 Required workflow

**PLAN → PROMPT → IMPLEMENT → INSPECT → TEST → FIX → COMMIT**

For large changes:

**AUDIT → PLAN → IMPLEMENT → TEST → REVIEW → COMMIT**

---

# 1. PRODUCT IDENTITY

## 1.1 Brand

**An Trendy Closet**

Do not rename the business unless the owner explicitly requests a brand-name change.

## 1.2 Business type

Bangladesh-focused ecommerce business selling:

- Girls' accessories
- Watches
- Bags
- Makeup
- Lip products

## 1.3 Brand personality

The interface should feel:

- Premium
- Elegant
- Clean
- Modern
- Fashion-oriented
- Professional

## 1.4 Visual direction

Use a refined neutral / black-and-white interface.

Product photography may remain colorful.

Avoid:

- Excessive gradients
- Excessive animation
- Clutter
- Generic SaaS styling
- Generic AI-generated layouts
- Unnecessary visual effects
- Poorly structured template-like pages

---

# 2. PRODUCT OBJECTIVE

Build a real ecommerce application that can realistically be presented to and operated by a paying client.

The product is not a static visual prototype.

The system must support:

**Customer discovery → product browsing → product selection → cart → checkout → order creation → payment/order tracking → admin fulfillment**

The architecture must be suitable for future growth.

---

# 3. TARGET USERS

## 3.1 Customer

Primary customers:

- Female shoppers
- Teenagers and young adults
- Affordable fashion/beauty shoppers
- Accessory/gift shoppers
- Social-media visitors

Primary discovery channels:

- Facebook
- Instagram
- TikTok

## 3.2 Admin

The admin operates the ecommerce business.

The admin needs to:

- Manage products
- Manage categories
- Manage inventory
- Manage orders
- Manage customers
- Manage pricing
- Manage promotions
- Review payments
- Manage shipping information
- View basic analytics
- Manage appropriate site configuration

---

# 4. SCOPE CONTROL

## 4.1 V1 — MUST HAVE

V1 must include:

### Storefront
- Home
- Shop
- Category browsing
- Product details
- Search
- Filters
- Sorting
- Cart
- Checkout
- Order creation
- Customer contact/shipping information
- Payment architecture
- Order status visibility where applicable
- About
- Contact

### Admin
- Secure admin login
- Dashboard
- Orders
- Order details
- Order status management
- Products CRUD
- Product images
- Categories
- Inventory
- Pricing
- Discounts/promotions
- Customer/order history where appropriate
- Payment status
- Shipping/delivery information
- Basic analytics
- Site configuration where required

### Quality
- Responsive design
- Accessibility foundations
- SEO foundations
- Performance optimization
- Loading/empty/error/success states
- Security review
- Production build
- Cross-device QA

## 4.2 V1.1 — OPTIONAL

Only implement if V1 is stable:

- Customer accounts
- Order history for customers
- Wishlist
- Product reviews
- Richer analytics
- Additional notification channels
- Advanced promotions
- Product variants

## 4.3 FUTURE — NOT REQUIRED FOR V1

Do not build unless separately requested:

- AI shopping assistant
- Advanced recommendation engine
- Loyalty program
- Complex multi-vendor marketplace
- Advanced warehouse management
- Subscription commerce
- Complex CRM
- Large-scale automation platform

---

# 5. INFORMATION ARCHITECTURE

## 5.1 Public routes

Recommended structure:

```text
/
 /shop
 /category/:slug
 /product/:slug
 /cart
 /checkout
 /order/:id
 /about
 /contact
```

Exact route syntax may follow the existing project's framework.

## 5.2 Admin routes

Recommended structure:

```text
/admin/login
/admin
/admin/orders
/admin/orders/:id
/admin/products
/admin/products/new
/admin/products/:id/edit
/admin/categories
/admin/inventory
/admin/customers
/admin/promotions
/admin/analytics
/admin/settings
```

The actual routing implementation may follow the existing stack.

---

# 6. GLOBAL NAVIGATION

Desktop navigation should provide clear access to:

- Home
- Shop
- Categories
- About
- Contact
- Search
- Cart

Mobile navigation must be intentionally designed for touch interaction.

Do not simply shrink desktop navigation.

---

# 7. HOMEPAGE REQUIREMENTS

The homepage should contain, as appropriate:

1. Header/navigation
2. Hero section
3. Primary shopping CTA
4. Category discovery
5. Featured products
6. Promotional content
7. Trust/support information where appropriate
8. Footer

The homepage must prioritize:

**Brand → Product discovery → Shopping action**

Avoid unnecessary sections.

---

# 8. SHOP REQUIREMENTS

## 8.1 Product grid

The shop page must display:

- Product image
- Product name
- Price
- Availability where relevant
- Discount information where relevant
- Clear product action

## 8.2 Search

Search must support product discovery by at least:

- Product name
- Category

The implementation should allow future searchable attributes.

### Search behavior

- Empty query: show normal catalog.
- Matching query: show matching products.
- No matches: show a useful empty state.
- Search must not crash on unusual input.
- Search results must be responsive.

## 8.3 Filters

V1 filters should support, where applicable:

- Category
- Price range
- Availability

The filter system must be reusable.

## 8.4 Sorting

V1 sorting should support:

- Newest
- Price: low to high
- Price: high to low

Additional sorting can be added later.

## 8.5 Pagination / loading strategy

The implementation may use pagination, cursor-based loading, or another appropriate strategy based on the existing stack.

Do not load an unnecessarily large catalog into the browser.

---

# 9. CATEGORY REQUIREMENTS

Each category must have:

- Category name
- Category description where appropriate
- Product listing
- Search/filter/sort behavior consistent with the shop
- Empty state
- Responsive layout
- SEO metadata

Initial categories:

```text
Accessories
Watches
Bags
Makeup
Lip Products
```

Categories must be data-driven rather than hardcoded into individual page components.

---

# 10. PRODUCT REQUIREMENTS

## 10.1 Product data model

The architecture should support at least:

```text
Product
- id
- name
- slug
- description
- price
- compareAtPrice (optional)
- images[]
- primaryImage
- categoryId
- stockQuantity
- status
- createdAt
- updatedAt
```

Optional future fields must be possible without redesigning the entire system.

## 10.2 Product status

V1 should support at least:

```text
Draft
Active
Archived
```

Archived products should not normally appear as purchasable storefront products.

## 10.3 Product images

Each product may have multiple images.

Admin must be able to:

- Add images
- Remove images
- Replace images
- Choose/reorder the primary image where supported

Images should be optimized for web delivery.

Alt text should be supported.

## 10.4 Product variants

Variants are not required for V1.

However, the architecture must not make future variants impossible.

Potential future variant dimensions:

- Size
- Color
- Style
- Variant-specific price
- Variant-specific stock

## 10.5 Product detail page

Must show:

- Product name
- Image gallery
- Price
- Discount/reference price where applicable
- Availability
- Description
- Quantity control
- Add-to-cart action

If unavailable:

- Clearly communicate that it is unavailable.
- Prevent invalid purchasing.

---

# 11. CART REQUIREMENTS

The cart must support:

- Add item
- Remove item
- Change quantity
- Calculate subtotal
- Show applicable discounts
- Show shipping fee when known
- Show final total when determinable
- Continue shopping
- Proceed to checkout

Cart validation must occur server-side before order creation.

The client must not be trusted for final prices or inventory.

---

# 12. CHECKOUT REQUIREMENTS

## 12.1 Checkout model

V1 should support **guest checkout**.

Customer accounts are optional future functionality.

## 12.2 Required customer information

At minimum, checkout should collect the information necessary to fulfill the order, such as:

- Full name
- Phone number
- Delivery address
- Relevant location information
- Email where useful/available

Do not collect unnecessary personal information.

## 12.3 Checkout sequence

Recommended:

```text
Cart
→ Customer information
→ Shipping information
→ Payment method
→ Order review
→ Payment/order submission
→ Confirmation
```

The exact UI may vary based on the payment provider and existing stack.

## 12.4 Validation

Validate:

- Required fields
- Phone number format
- Address information
- Product availability
- Current prices
- Order totals

Important validation must happen server-side.

---

# 13. SHIPPING & DELIVERY

V1 must support shipping information even if courier integration is not yet available.

## 13.1 Shipping data

An order should be able to contain:

```text
Shipping
- recipientName
- phone
- address
- area/city
- deliveryFee
- shippingStatus
```

Exact fields may be adjusted based on the selected business workflow.

## 13.2 Shipping fee

The architecture must allow shipping fees to be calculated or assigned.

The fee must not be trusted from the client.

## 13.3 Shipping status

Recommended V1 statuses:

```text
Pending
Processing
Shipped
Delivered
```

Cancellation/return states must be supported separately where appropriate.

## 13.4 Courier integration

Courier integration is not mandatory for initial V1 unless a provider is selected.

The architecture should allow it later.

---

# 14. ORDER SYSTEM

## 14.1 Order data model

At minimum:

```text
Order
- id
- orderNumber
- customer
- items[]
- subtotal
- discountAmount
- shippingFee
- total
- paymentStatus
- orderStatus
- shipping
- notes
- createdAt
- updatedAt
```

Each order item should preserve the purchased product information needed for historical accuracy.

Do not depend on the current product price to reconstruct old orders.

## 14.2 Order item

At minimum:

```text
OrderItem
- productId
- productNameSnapshot
- unitPrice
- quantity
- lineTotal
```

## 14.3 Order status

Recommended V1 state model:

```text
Pending
→ Confirmed
→ Processing
→ Shipped
→ Delivered
```

Possible alternate terminal states:

```text
Cancelled
Returned
```

Rules:

- Invalid transitions should be prevented where practical.
- Admin changes must be validated.
- Order status is separate from payment status.

---

# 15. PAYMENT SYSTEM

## 15.1 Payment architecture

The system must support real payment integration without placing secrets in the frontend.

Architecture:

```text
Customer
↓
Frontend
↓
Secure server/API
↓
Payment provider
↓
Server-side verification
↓
Order/payment state
```

## 15.2 Payment methods

V1 should be architected to support:

- Cash on Delivery, if the business enables it.
- Online payment through a selected Bangladesh-compatible gateway.

The exact gateway is a business decision and must not be invented by the coding agent.

## 15.3 Payment status

Recommended:

```text
Unpaid
Pending
Paid
Failed
Cancelled
Refunded
```

## 15.4 Critical rule

Never trust the frontend redirect alone to decide that a payment succeeded.

Payment status must be verified through the secure server/payment-provider flow.

## 15.5 Payment/order relationship

Examples:

- Payment successful → order may become Confirmed/paid according to business rules.
- Payment failed → payment is Failed; order must not incorrectly appear Paid.
- Payment cancelled → payment is Cancelled.
- Refund → payment becomes Refunded where appropriate.

The exact transition logic must be implemented according to the selected gateway.

---

# 16. CANCELLATION, RETURNS & REFUNDS

## 16.1 V1

The system must support the concept of cancellation.

Customers/admins must not be able to bypass business rules by changing arbitrary database values from the client.

## 16.2 Refunds

Automated refunds are not required until a payment provider and refund policy are defined.

However, payment states must allow:

```text
Refunded
```

## 16.3 Returns

Returns are not required to have a complete customer self-service workflow in V1.

Admin-side handling should remain possible.

---

# 17. INVENTORY

## 17.1 Requirements

Inventory must be data-driven.

Admin must be able to:

- View stock
- Update stock
- Identify unavailable products
- Correct inventory

## 17.2 Overselling protection

Final order creation must validate current stock server-side.

Do not rely only on frontend stock values.

Where the backend/database supports it, inventory changes should be performed atomically or with appropriate concurrency protection.

Example:

```text
Available stock = 1

Customer A attempts purchase
Customer B attempts purchase

System must prevent both orders from successfully claiming the same single unit.
```

---

# 18. PROMOTIONS & DISCOUNTS

V1 should support basic discounts/promotions.

The architecture should allow:

- Product-level discounts
- Promotion rules
- Discount amount/percentage where applicable
- Start/end dates where applicable
- Active/inactive state

Final discount calculations must be validated server-side.

---

# 19. ADMIN PANEL

The admin panel is a first-class product area.

## 19.1 Admin dashboard

Provide an operational overview of:

- Orders
- Sales/revenue summary
- Inventory alerts
- Basic product/customer information
- Basic analytics

Do not overload the dashboard with meaningless charts.

## 19.2 Products

Admin can:

- Create
- Read
- Update
- Archive/delete according to safe data rules
- Manage images
- Set prices
- Set stock
- Set status
- Assign category

## 19.3 Categories

Admin can:

- Create
- Edit
- Archive/remove where safe
- Manage category metadata

## 19.4 Orders

Admin can:

- View orders
- Search/filter orders
- Open order details
- Update order status
- Review payment status
- Review customer information
- Review shipping information

## 19.5 Customers

Admin can view appropriate customer information and relevant order history.

Do not expose unnecessary sensitive data.

## 19.6 Inventory

Admin can:

- View inventory
- Update inventory
- Identify low/out-of-stock products

## 19.7 Promotions

Admin can create/manage supported V1 discounts.

## 19.8 Analytics

V1 analytics should remain basic:

- Total orders
- Sales/revenue summary
- Top products if data supports it
- Inventory overview

Advanced analytics are future scope.

---

# 20. ADMIN AUTHENTICATION & AUTHORIZATION

## 20.1 V1 roles

V1 may use a single secure admin role.

The architecture should not prevent future role-based permissions.

## 20.2 Required behavior

Admin authentication must support:

- Login
- Logout
- Protected admin routes
- Secure session handling
- Unauthorized-access prevention

Password handling must use secure authentication mechanisms provided by the chosen backend/auth system.

Do not implement insecure custom password storage.

## 20.3 Future roles

Possible future roles:

- Super Admin
- Product Manager
- Order Manager
- Content Manager

Not required for V1.

---

# 21. SITE CONTENT & CONFIGURATION

Where practical, admin should be able to manage business content that is expected to change without editing source code.

Potential configurable content:

- Promotional text
- Homepage promotional content
- Contact information
- Store policies
- Social links

Do not build a full CMS unless required.

---

# 22. SEARCH ENGINE OPTIMIZATION

V1 SEO foundations must include:

- Unique page titles
- Meta descriptions
- Clean URLs/slugs
- Semantic HTML
- Product/category metadata
- Image alt text
- Canonical URL strategy where needed
- Sitemap
- Robots configuration
- Open Graph/social sharing metadata where appropriate
- Product structured data where appropriate
- Breadcrumb structured data where appropriate

SEO must not create duplicate or misleading pages.

---

# 23. ANALYTICS & EVENT TRACKING

V1 should provide basic business analytics.

Where an analytics platform is selected, useful events may include:

- Product view
- Search
- Add to cart
- Begin checkout
- Purchase/order creation

Do not add analytics services without considering privacy and configuration requirements.

---

# 24. NOTIFICATIONS

## 24.1 V1

The system should provide clear on-site confirmations for:

- Successful order creation
- Payment result
- Important admin actions

## 24.2 Future

Potential notification channels:

- Email
- SMS
- Messaging platforms

Do not implement external notification services until a provider and requirements are defined.

---

# 25. LEGAL & POLICY PAGES

The product should provide a place for customer-facing policies.

At minimum, account for:

- Privacy Policy
- Terms & Conditions
- Shipping Policy
- Return/Refund Policy

Actual legal wording must be supplied/approved by the business rather than invented as legal advice.

---

# 26. ERROR / LOADING / EMPTY / SUCCESS STATES

Every important asynchronous or data-dependent area must have appropriate states.

## Loading

Examples:

- Product loading
- Search loading
- Cart update
- Checkout processing
- Admin table loading

## Empty

Examples:

- Empty cart
- No search results
- Empty category
- No orders
- No products

## Error

Errors should:

- Be understandable.
- Avoid exposing sensitive technical details.
- Provide a useful recovery action where possible.

## Success

Examples:

- Product saved.
- Order created.
- Payment completed.
- Order status updated.

---

# 27. ACCESSIBILITY

The product should meet strong practical accessibility foundations.

Check:

- Semantic HTML
- Keyboard navigation
- Focus states
- Form labels
- Form errors
- Color contrast
- Touch target sizes
- Image alt text
- Screen-reader-friendly labels where needed
- Accessible modals/drawers
- Accessible navigation

Do not rely on color alone to communicate important states.

---

# 28. PERFORMANCE

Performance requirements:

- Optimize product images.
- Avoid unnecessary dependencies.
- Avoid unnecessarily large client bundles.
- Lazy-load appropriate content/images.
- Avoid loading the entire product catalog unnecessarily.
- Provide useful loading states.
- Test on mobile networks/devices where practical.

Performance should be measured rather than assumed.

---

# 29. SECURITY

Security is a production requirement.

Must:

- Keep secrets/API keys server-side.
- Protect admin routes.
- Validate authorization server-side.
- Validate important inputs server-side.
- Never trust client-side price/stock values.
- Protect sensitive customer information.
- Secure payment processing.
- Prevent unauthorized administrative actions.
- Avoid exposing internal errors to customers.
- Use secure authentication/session practices.
- Review dependencies for obvious security risks before production.

---

# 30. DATA INTEGRITY

The backend/database is the source of truth for:

- Product price
- Product stock
- Order totals
- Payment status
- Order status
- Customer/order records

The frontend is a presentation/client layer and must not be treated as authoritative for sensitive business values.

---

# 31. DATABASE & BACKEND BOUNDARIES

The exact technology stack may follow the existing project.

Regardless of stack, separate:

```text
UI / Frontend
↓
Application/API layer
↓
Business logic
↓
Database
↓
External services
```

Payment providers and other secrets must be accessed through secure server-side logic.

Product and order data should not be duplicated as hardcoded frontend truth.

---

# 32. IMAGE & ASSET REQUIREMENTS

Product assets should:

- Preserve product colors accurately.
- Be optimized for performance.
- Support responsive display.
- Have useful alt text.
- Support multiple product images.

Brand assets should follow the design system.

Avoid low-quality placeholder imagery in the final production experience.

---

# 33. URL & ROUTING RULES

Prefer human-readable URLs.

Examples:

```text
/shop
/category/watches
/product/classic-gold-watch
```

Use stable slugs.

Avoid exposing unnecessary database implementation details in public URLs.

---

# 34. RESPONSIVE REQUIREMENTS

Design mobile-first.

Test at:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px+
Large desktop
```

Verify:

- No horizontal overflow
- Navigation
- Typography
- Product grids
- Buttons
- Images
- Forms
- Touch targets
- Spacing
- Admin tables
- Modals/drawers
- Checkout

Mobile is not a secondary version of the site.

---

# 35. RESPONSIVE ADMIN REQUIREMENTS

The admin panel must be usable on:

- Mobile
- Tablet
- Laptop
- Desktop

For narrow screens:

- Tables may become scrollable or transform into card/list layouts.
- Navigation may become a drawer.
- Forms must remain usable.
- Important actions must remain reachable.

Do not simply scale a desktop admin dashboard down.

---

# 36. ACCEPTANCE CRITERIA

A feature is complete only when its expected behavior is implemented and tested.

## Example: Search

Given a customer is on the shop page:

1. Customer enters a search term.
2. The application searches supported product fields.
3. Matching products are displayed.
4. If nothing matches, an empty state appears.
5. Search remains usable on mobile.
6. Invalid/unusual input does not crash the application.

## Example: Add to cart

1. Customer selects a valid product.
2. Customer chooses a valid quantity.
3. Product is added to the cart.
4. Cart quantity/summary updates.
5. The system does not allow a quantity beyond available stock.
6. Server-side validation occurs before order creation.

## Example: Checkout

1. Customer reviews cart.
2. Customer provides required information.
3. System validates information.
4. Server validates product price and stock.
5. Server calculates authoritative totals.
6. Customer selects an available payment method.
7. Payment/order process begins.
8. Appropriate success/failure state is shown.
9. Order state is stored correctly.

## Example: Admin product creation

1. Admin authenticates.
2. Admin opens product creation.
3. Required fields are validated.
4. Admin saves the product.
5. Product is stored in the backend/database.
6. Storefront can retrieve the product according to its status.
7. Errors are shown clearly if saving fails.

## Example: Inventory

1. Product has limited stock.
2. Customer submits an order.
3. Server validates current stock.
4. Inventory is updated safely.
5. Another concurrent order cannot incorrectly purchase unavailable stock.

---

# 37. OBSERVABILITY & LOGGING

Production architecture should provide appropriate logging for:

- Server errors
- Payment failures
- Important order-processing failures
- Authentication/security events
- Critical admin actions where appropriate

Do not log sensitive credentials or unnecessary customer secrets.

---

# 38. BACKUPS & RECOVERY

Production deployment should have a reasonable backup/recovery strategy for important ecommerce data.

At minimum, consider:

- Database backups
- Recovery procedure
- Protection of production data
- Preservation of order history

Exact provider/tool is deployment-specific.

---

# 39. ENVIRONMENTS & CONFIGURATION

Separate configuration between:

```text
Development
Staging (if used)
Production
```

Use environment variables or the secure configuration mechanism provided by the deployment platform.

Never commit production secrets to the repository.

---

# 40. TESTING REQUIREMENTS

Testing must cover:

## Functional

- Navigation
- Search
- Filtering
- Sorting
- Product pages
- Cart
- Checkout
- Order creation
- Payment states
- Admin authentication
- Admin CRUD
- Inventory
- Order status

## Responsive

All required representative widths.

## Security

- Unauthorized admin access
- Server-side validation
- Secret exposure
- Payment verification
- Authorization checks

## Regression

Existing working features must be retested after major changes.

---

# 41. RELEASE CHECKLIST

## Storefront

- [ ] Home complete
- [ ] Shop complete
- [ ] Categories complete
- [ ] Product details complete
- [ ] Search complete
- [ ] Filters complete
- [ ] Sorting complete
- [ ] Cart complete
- [ ] Checkout complete
- [ ] Order confirmation complete
- [ ] About complete
- [ ] Contact complete

## Backend / Ecommerce

- [ ] Product data works
- [ ] Inventory works
- [ ] Server-side price validation works
- [ ] Server-side stock validation works
- [ ] Orders work
- [ ] Order status works
- [ ] Payment architecture works
- [ ] Payment status works
- [ ] Shipping information works

## Admin

- [ ] Authentication works
- [ ] Protected routes work
- [ ] Dashboard works
- [ ] Product CRUD works
- [ ] Category management works
- [ ] Inventory works
- [ ] Orders work
- [ ] Customer information works
- [ ] Promotions work
- [ ] Basic analytics work

## Quality

- [ ] Responsive QA complete
- [ ] Accessibility review complete
- [ ] SEO foundations complete
- [ ] Performance reviewed
- [ ] Loading states complete
- [ ] Empty states complete
- [ ] Error states complete
- [ ] Security review complete
- [ ] Cross-device testing complete

## Production

- [ ] Production environment configured
- [ ] Secrets secured
- [ ] Database configured
- [ ] Backups/recovery considered
- [ ] Payment configuration verified
- [ ] Production build tested
- [ ] Domain configured
- [ ] Post-deployment critical flows tested

---

# 42. DEFINITION OF DONE

The entire product is not “done” because pages render.

The project is ready for production only when:

1. Core V1 requirements are implemented.
2. Customer purchase flow works.
3. Admin operations work.
4. Backend is authoritative for sensitive business values.
5. Payment integration is real or explicitly marked as not yet connected.
6. No fake production behavior is presented as real.
7. Responsive QA is complete.
8. Accessibility foundations are reviewed.
9. SEO foundations are implemented.
10. Security review is complete.
11. Production build succeeds.
12. Critical production flows are tested after deployment.

---

# 43. DEVELOPMENT PRIORITY

When deciding what to build next, use this order:

```text
1. Correctness
2. Security
3. Core ecommerce functionality
4. Data integrity
5. Responsive UX
6. Accessibility
7. Performance
8. SEO
9. Visual polish
10. Nice-to-have features
```

Do not prioritize animations or decorative features over broken ecommerce functionality.

---

# 44. FINAL PRODUCT PRINCIPLES

1. **An Trendy Closet is a real ecommerce product, not a demo.**
2. **The database/backend is authoritative for business-critical values.**
3. **Payment must never be faked.**
4. **Secrets must never be exposed.**
5. **Mobile experience is a first-class requirement.**
6. **Admin functionality is a first-class product area.**
7. **V1 scope must remain controlled.**
8. **Reusable architecture is preferred over quick duplication.**
9. **Every important feature needs testable acceptance criteria.**
10. **Do not assume something works until it has been verified.**
11. **Do not make major architectural changes without inspecting the current project.**
12. **Do not add major functionality that is outside the approved scope.**
13. **The final quality target is a website suitable for a paying client.**

---

# 45. IMMEDIATE BUILD OBJECTIVE

Build:

**An Trendy Closet — a polished, responsive, production-oriented fashion/beauty ecommerce platform for Bangladesh, with a professional storefront, secure ecommerce architecture, strong responsive admin panel, inventory/order management, and real payment-gateway integration capability.**

Use Antigravity IDE and AI-assisted development efficiently while following:

**PLAN → PROMPT → IMPLEMENT → INSPECT → TEST → FIX → COMMIT**
