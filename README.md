# Aeroplane Basmati Rice

Marketing and shop front page for Aeroplane Basmati Rice. Vite, React, TypeScript and Motion.

## Run it

```sh
npm install
npm run dev      # http://localhost:4173
npm run build    # type-check and build to dist/
```

## Where things are

- `src/components/` – one file per page section, plus `Cart.tsx` (cart state and drawer) and `ui.tsx` (shared image, icon and illustration helpers).
- `src/products.ts` – products, pack sizes and prices.
- `src/styles.css` – all styling; brand colours are tokens at the top.
- `public/assets/` – logo files, fonts, photographs and illustrations.

## Not finished

- Products, prices and pack photographs come from an export of shop.aeroplanerice.com taken on 12 October 2026 (`src/products.ts`); they do not update on their own.
- The cart is stored in the browser only. "Continue to the shop" opens the live shop; the cart does not carry over.
- The timeline and most body copy are placeholder wording.
