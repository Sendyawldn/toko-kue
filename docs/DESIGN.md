# Toko Kue Design Contract

## 1. Design Intent and Product Personality

The storefront should feel like a working bakery counter brought online: appetizing, quick to scan, and ready to take an order. It must look more specific than a generic ecommerce page.

## 2. Audience and Use-Context Signals

Primary users are mobile customers choosing cakes for birthdays, gifts, and family events. They need price clarity, product confidence, and a fast checkout path.

## 3. Visual Direction and Distinctive Moves

Conceptual anchor: a stainless bakery proofing rack during morning prep. Translate it into stacked product rhythm, tray-like product rows, warm product highlights, and motion that feels like trays sliding into view.

Distinctive moves:

- Product sections use tray bands rather than generic floating cards.
- Best sellers get a warm "fresh batch" treatment.
- Cart changes use a short slide-and-settle motion inspired by loading a tray.

## 4. Color, Typography, Spacing, and Density Decisions

Palette should avoid generic beige bakery templates. Use deep cocoa for text, cherry jam for primary action, pandan green for availability, butter yellow for highlights, and stainless neutral surfaces for structure.

Typography should contrast a confident display face for product names with a highly readable sans serif for prices, controls, and checkout details.

Spacing should feel like organized shelves: compact enough for scanning, with stronger gaps between product groups.

## 5. Token Architecture and Alias Strategy

Use primitive tokens for raw color, size, and motion values. Map them into semantic tokens such as `surface-counter`, `action-order`, `state-available`, and `text-price`. Component tokens must consume semantic aliases.

## 6. Responsive Strategy and Cross-Viewport Adaptation Matrix

| Viewport | Layout Rule | Priority |
| --- | --- | --- |
| Mobile | Single-column catalog with sticky cart action | Browse and order quickly |
| Tablet | Two-column catalog with persistent cart summary | Compare and adjust |
| Desktop | Wider product rail with cart panel visible | Scan catalog and complete order |

At least one major surface must move between mobile and desktop: the cart shifts from sticky bottom action to side summary.

## 7. Motion and Interaction Rules

Use short motion between 160ms and 260ms with gentle ease-out. Add-to-cart should slide the selected item signal toward the cart area. Reduced motion must replace travel animation with opacity and color state changes.

Required states: default, hover, focus-visible, active, disabled, loading, empty, error, success, and transition.

## 8. Component Language and Morphology

Use tray bands, compact product rows, clear quantity steppers, and badge-like availability marks. Avoid uniform card grids as the only composition.

## 9. Context Hygiene and Source Boundaries

Use the current user brief and repository docs as design authority. Do not import unrelated visual memory or old project style.

## 10. Accessibility Non-Negotiables

Meet WCAG 2.2 AA for contrast, focus visibility, keyboard access, target size, and status feedback. Do not rely on color alone for stock or checkout state.

## 11. Anti-Patterns to Avoid

- Generic ecommerce hero with decorative abstract background.
- Beige-only bakery palette.
- Placeholder product text.
- In-app instructions that explain obvious UI behavior.
- Decorative grids, lines, blobs, or glow wallpaper.

## 12. Implementation Notes for Future UI Tasks

Use real product-like content from the start. If no product photos are available, use CSS-backed product treatment or generated bitmap assets rather than broken placeholders. Keep checkout reachable within one action from the cart.
