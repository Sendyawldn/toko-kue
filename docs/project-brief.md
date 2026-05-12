# Toko Kue Project Brief

## Confirmed Facts

Toko Kue is a web storefront for selling cakes and bakery products. The first user request is in Indonesian: "buatkan web penjualan toko kue." The repository does not contain application code yet. It only contains governance files, scripts, and an early design intent seed.

## Product Goal

Build a polished storefront that lets customers browse cakes, compare products, add items to an order, and start checkout with minimal friction. The first version should work well for a small bakery that may handle orders manually before adding a full backend.

## First Release Direction

Use a frontend-first storefront with a client-side cart and a WhatsApp checkout handoff. This fits the current brief because it ships a usable sales path without forcing accounts, payments, inventory, or a database before the business rules are known.

The recommended runtime is Vite with a vanilla JavaScript or TypeScript frontend. Official Vite docs currently describe Vite as a dev server plus production build tool and document `npm create vite@latest` as the setup path. Vite also documents Node.js 20.19+ or 22.12+ as the current compatibility floor. Node.js official release guidance says production apps should use Active LTS or Maintenance LTS releases. As of 2026-05-12, Node.js lists v24.15.0 as Latest LTS.

Research sources:

| Source | Used For | Fetched At |
| --- | --- | --- |
| https://vite.dev/guide/ | Vite setup flow and Node compatibility | 2026-05-12 |
| https://nodejs.org/en/download/ | Current Node.js LTS signal | 2026-05-12 |
| https://nodejs.org/en/about/previous-releases | LTS production guidance | 2026-05-12 |

## First Release Features

- Product catalog with cake categories, prices, short descriptions, and stock/order status.
- Product filtering for cake type, occasion, and price range.
- Cart with quantity changes, subtotal, and order notes.
- Checkout handoff that formats the order for WhatsApp.
- Responsive layout for mobile-first customer browsing.
- Accessible keyboard navigation, visible focus states, and clear form labels.

## Out of Scope for First Release

- Online payment processing.
- Customer accounts.
- Admin inventory management.
- Persistent order database.
- Courier integration.

These can be added after the bakery confirms ordering rules, payment method, delivery zones, and inventory workflow.

## Success Criteria

- A customer can find a cake, add it to cart, review the order, and start checkout from a phone.
- The storefront looks specific to a bakery, not like a generic shop template.
- Content is production-ready, with no placeholder copy visible in the user interface.
- The build can run locally and produce static production assets.

## Assumptions to Validate

- The bakery accepts orders through WhatsApp for the first release.
- Product inventory can be represented as simple "available", "limited", or "pre-order" status.
- Prices are fixed display prices and do not yet need dynamic taxes, discounts, or delivery fees.
- The first release can be static and does not require a server API.

## Next Validation Action

Replace the public WhatsApp number, product list, prices, and product images with the bakery's real operating data before launch.
