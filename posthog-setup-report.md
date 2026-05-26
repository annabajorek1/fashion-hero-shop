<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the FashionHero shop. Here is a summary of all changes made:

- **`instrumentation-client.ts`** (new) — Initializes PostHog on the client side using the Next.js 16 instrumentation API. Enables exception capture, debug mode in development, and routes all analytics traffic through a reverse proxy (`/ingest`).
- **`next.config.ts`** — Added reverse-proxy rewrites for `/ingest/static/*`, `/ingest/array/*`, and `/ingest/*` to route PostHog traffic through the app (avoids ad-blockers). Added `skipTrailingSlashRedirect: true`.
- **`.env.local`** — Created with `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` (EU region).
- **`src/app/account/login/page.tsx`** — Added `posthog.identify()` and `posthog.capture("user_logged_in")` on successful login.
- **`src/app/account/register/page.tsx`** — Added `posthog.identify()` with name/email properties and `posthog.capture("user_signed_up")` on successful registration.
- **`src/components/product-info.tsx`** — Added `posthog.capture("product_added_to_cart")` with product name, price, category, color, and size on Add to Cart click.
- **`src/components/cart-provider.tsx`** — Added `posthog.capture("cart_item_removed")` with full item details when a cart item is removed.
- **`src/components/wishlist-button.tsx`** — Added `posthog.capture("product_wishlisted")` and `posthog.capture("product_unwishlisted")` when the heart button is toggled.
- **`src/app/checkout/page.tsx`** — Added `posthog.capture("checkout_started")` when the checkout page loads with cart items, and `posthog.capture("order_placed")` with full order details when Place Order is clicked.
- **`src/components/search-modal.tsx`** — Added debounced `posthog.capture("search_performed")` with query and result count after the user stops typing for 500ms.
- **`src/app/seller/page.tsx`** — Added `posthog.capture("seller_boost_activated")` with seller ID, name, and days-on-platform when a seller activates the visibility boost.

## Events tracked

| Event | Description | File |
|---|---|---|
| `user_signed_up` | User successfully completed registration and created an account | `src/app/account/register/page.tsx` |
| `user_logged_in` | User successfully logged in to their account | `src/app/account/login/page.tsx` |
| `product_added_to_cart` | User added a product to the cart (with selected color and size) | `src/components/product-info.tsx` |
| `cart_item_removed` | User removed an item from the cart | `src/components/cart-provider.tsx` |
| `product_wishlisted` | User added a product to their wishlist | `src/components/wishlist-button.tsx` |
| `product_unwishlisted` | User removed a product from their wishlist | `src/components/wishlist-button.tsx` |
| `checkout_started` | User navigated to checkout with items in cart (top of checkout funnel) | `src/app/checkout/page.tsx` |
| `order_placed` | User clicked Place Order to complete purchase | `src/app/checkout/page.tsx` |
| `search_performed` | User performed a product search with a non-empty query | `src/components/search-modal.tsx` |
| `seller_boost_activated` | Seller activated the visibility boost feature from the seller panel | `src/app/seller/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/705092)
- [Checkout Conversion Funnel](/insights/mB0AOvBs) — Add to Cart → Checkout Started → Order Placed
- [User Signups & Logins Over Time](/insights/ZurrgbsB) — Daily trend of new registrations and logins
- [Add to Cart — Unique Users](/insights/pAusfEpx) — Daily unique users adding products to cart
- [Wishlist Activity](/insights/3imh7DZ4) — Products wishlisted vs unwishlisted over time
- [Seller Boost Activations](/insights/Nkt6TyMt) — How many sellers activate the visibility boost

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
