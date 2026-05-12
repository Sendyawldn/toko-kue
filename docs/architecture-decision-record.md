# Architecture Decision Record

## Decision Status

Accepted and implemented for the first release after user approval.

## Context

The product is a cake shop sales website. The repository has no existing app stack. Governance requires project docs and a design contract before code. It also requires live official documentation for ecosystem choices.

## Decision

Use a static-first Vite storefront for the first release. Keep the application as one deployable frontend with feature-oriented source folders. Use client-side state for the cart and format the checkout message for WhatsApp.

This choice keeps the first version useful and small. It avoids a database, authentication, payment processing, and admin flows until the bakery confirms real operating rules.

## Runtime Decision

Use Node.js LTS with Vite. The implemented package uses Vite 8.0.12.

Evidence:

| Source | Relevant Signal | Fetched At |
| --- | --- | --- |
| https://vite.dev/guide/ | Vite provides a dev server and production build for modern web projects; `npm create vite@latest` is the official setup flow. | 2026-05-12 |
| https://vite.dev/guide/ | Current Vite docs list Node.js 20.19+ or 22.12+ as the compatibility floor. | 2026-05-12 |
| https://nodejs.org/en/download/ | Node.js v24.15.0 is listed as Latest LTS. | 2026-05-12 |
| https://nodejs.org/en/about/previous-releases | Production apps should use Active LTS or Maintenance LTS releases. | 2026-05-12 |

## Topology

Use one frontend deployable for the first release.

Do not split services yet. There is no evidence of separate team ownership, scale mismatch, compliance boundary, or fault-isolation need. A service split would add operational work without improving the initial storefront.

## Module Shape

Implemented structure:

```text
src/
  data/products.js
  main.js
  styles.css
```

The first implementation keeps the code compact in one entry module plus product data and styles. Split into feature folders when catalog, cart, or checkout behavior grows beyond the first release.

## Data Strategy

First release: static product data inside the frontend.

Future release: add a database only when admin editing, order persistence, inventory sync, or reporting becomes a real requirement.

## API Strategy

First release: no custom HTTP API. Checkout opens a WhatsApp URL with an encoded order summary.

Future release: add an HTTP API when orders need server-side persistence, payment callbacks, admin dashboards, or notifications.

## Docker Strategy

Docker is listed in project inputs for both development and production. Docker assets were generated from the actual Vite project:

- `.dockerignore`
- `Dockerfile` with development and production stages
- `compose.yaml` for development
- `compose.prod.yaml` for production
- `docs/docker-runtime.md`

Docker source checks:

| Source | Used For | Fetched At |
| --- | --- | --- |
| https://docs.docker.com/compose | Compose purpose and current workflow | 2026-05-12 |
| https://docs.docker.com/compose/how-tos/production/ | Separate production Compose override guidance | 2026-05-12 |
| https://docs.docker.com/guides/nodejs/ | Node.js containerization context | 2026-05-12 |

## Security Notes

The first release must not store secrets in frontend code. WhatsApp numbers and public business contact details can be configured as public values. Payment and customer personal data should not be collected unless a backend privacy policy and storage plan are added.

## Testing Strategy

For the first implementation, use a lightweight build validation and focused behavior checks:

- Cart quantity changes.
- Empty cart state.
- Checkout message formatting.
- Keyboard access for interactive controls.
- Responsive layout smoke checks.

## Assumptions to Validate

- WhatsApp checkout is acceptable for the first business workflow.
- Static product data is acceptable until admin inventory management is requested.
- Docker files should be included in the first implementation rather than a later deployment pass.

## Next Validation Action

Validate the storefront with real product photos, real WhatsApp number, and bakery order rules before production deployment.
