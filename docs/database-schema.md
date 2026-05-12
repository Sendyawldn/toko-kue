# Database Schema

## Current Scope

The recommended first release does not use a database. Product data can ship as static frontend data, and checkout is handed off to WhatsApp.

## Rationale

The current brief does not define admin users, inventory updates, payment records, delivery zones, or reporting. Adding persistence before those rules are known would create extra work and may lock the product into the wrong data model.

## Future Data Model

If persistent orders are approved, start with these entities:

| Entity | Purpose | Key Fields |
| --- | --- | --- |
| product | Sellable cake or bakery item | id, name, slug, category, price, description, status |
| order | Customer order record | id, customerName, phone, fulfillmentType, status, subtotal |
| order_item | Product line in an order | id, orderId, productId, quantity, unitPrice |
| inventory_event | Stock or pre-order change | id, productId, type, quantity, reason |

## Integrity Rules for Future Persistence

- Store order item price snapshots so old orders are not changed when product prices change.
- Treat order creation as a sensitive mutation and protect against duplicate submits.
- Keep customer contact data private and limit access to admin-only surfaces.
- Record inventory changes as events if stock accuracy becomes important.

## Next Validation Action

Add a real database only after the user confirms admin inventory, order history, or payment requirements.
