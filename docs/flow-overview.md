# Flow Overview

## Primary Customer Flow

1. Customer opens the storefront.
2. Customer scans highlighted cakes and categories.
3. Customer filters products by occasion, type, or price.
4. Customer opens product details or adds an item directly to the cart.
5. Customer adjusts quantity and adds order notes.
6. Customer reviews the cart summary.
7. Customer starts checkout through WhatsApp with a prefilled order message.

## Catalog Flow

The catalog should show product name, price, portion guidance, availability, and a short reason to buy. Products can be grouped by occasion such as birthday, hampers, slices, and celebration cakes.

## Cart Flow

The cart should always make the next action clear. Empty cart state should invite the customer back to the catalog. Non-empty cart state should show item totals, quantity controls, subtotal, and notes.

## Checkout Flow

The first release uses a WhatsApp handoff instead of server-side checkout. The app formats a message with:

- Customer-selected products.
- Quantities.
- Subtotal.
- Notes.
- Pickup or delivery prompt.

The customer completes personal details and payment agreement in WhatsApp.

## Error and Empty States

- Empty catalog filter: show a helpful reset action.
- Empty cart: show a direct path back to best-selling cakes.
- Checkout with empty cart: keep checkout disabled and explain the state with accessible text.
- Missing WhatsApp configuration: show a clear unavailable state in implementation builds.

## Future Admin Flow

Admin features are not part of the first release. A later release can add product editing, inventory, order status, and reports after business rules are validated.

## Next Validation Action

Confirm the checkout channel and business WhatsApp number before production deployment.
