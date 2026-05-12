# API and Integration Contract

## Current Scope

The first release does not expose a custom HTTP API. It uses a static storefront and a WhatsApp checkout handoff.

## WhatsApp Checkout Contract

The checkout action opens a WhatsApp URL with an encoded text message.

### Public Inputs

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| items | array | yes | Each item includes product name, quantity, and unit price. |
| subtotal | number | yes | Client-calculated display subtotal. |
| notes | string | no | Customer-facing order notes. |
| fulfillmentPrompt | string | yes | Text asking pickup or delivery preference. |

### Output

The browser opens a new URL using the configured public WhatsApp number and encoded text. The storefront does not receive a payment or order confirmation response.

### Safety Rules

- Do not collect private customer data in the static site beyond optional order notes.
- Do not treat the client subtotal as a final paid amount.
- The business confirms final stock, delivery, and payment inside WhatsApp.

## Future HTTP API Contract

If server-side orders are added, use OpenAPI 3.1 unless a stronger project standard is approved. Required future endpoints should include:

- `GET /products` for catalog data with filters and pagination.
- `POST /orders` for order creation with duplicate-submit protection.
- `GET /orders/{id}` for customer or admin order status.

Future mutation endpoints must document validation errors, idempotency behavior, and safe public error codes before implementation.

## Next Validation Action

Confirm whether the first release should stay WhatsApp-only or include server-side order storage.
