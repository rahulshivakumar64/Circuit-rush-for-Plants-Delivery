# CircuitRush 🌱⚡ — Quick Electronics & Smart Gardening

CircuitRush is a quick-commerce storefront concept that pairs two categories you don't usually see together: **electronics / DIY project kits** and **plants / smart gardening gear**. It's a single-page React app with a full shopping flow (browse → quiz/filter → cart → checkout → order tracking) plus a lightweight admin dashboard for managing the catalog — all running client-side with no backend required.

## Features

- **Curated homepage** — "Bring Nature Home," Smart Gardening, Plant Bundles, and Pots & Accessories sections lead into a full searchable catalog.
- **Two-category catalog** — plants & gardening (indoor/outdoor plants, succulents, herbs, seeds, pots, soil, tools, smart gardening) and electronics (microcontrollers, sensors/IoT, actuators/motors, DIY kits, tools & power), with category and subcategory filtering plus search.
- **"Find Your Plant" quiz** — a 3-step guided quiz (room location, sunlight, maintenance effort) that scores every plant in the catalog and recommends the best matches, with reasons for each suggestion.
- **Product detail modal** — pricing, stock, delivery estimate, ratings, and (for plants) care instructions such as sunlight, watering, soil, temperature, and pruning.
- **Cart & checkout** — add/update/remove items, view subtotal, and place an order by entering name, phone, address, delivery time slot, and payment method (UPI, card, or cash on delivery).
- **Order tracking** — a tracker modal that walks an order through stages: *Order Placed → Packing at Dark Store → Rider Out for Delivery → Delivered*.
- **Admin dashboard** — add, edit, and reset products in the catalog directly from the UI.
- **Local persistence** — cart, orders, and any catalog edits are saved to `localStorage`, so the demo data survives a page refresh.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for the dev server and build
- **Tailwind CSS 4** (via `@tailwindcss/vite`) for styling
- **lucide-react** for icons, **motion** for animations
- React Context (`AppContext`) for global state — no external state library or backend

> Note: this project was scaffolded in Google AI Studio and still lists `@google/genai` and a `GEMINI_API_KEY` in its dependencies/`.env.example`, but nothing in the current source calls the Gemini API — the "Find Your Plant" recommendation logic is plain rule-based scoring in `FindYourPlantModal.tsx`. You can safely ignore the Gemini key unless you plan to wire up an AI feature yourself.

## Project Structure

```
src/
├── components/          # UI sections, modals, cart/checkout/admin components
├── context/
│   └── AppContext.tsx   # Global state: products, cart, orders, UI/modal state
├── data/
│   └── initialProducts.ts  # Seed catalog (52 products across both categories)
├── types.ts               # Shared TypeScript types (Product, Order, quiz answers, etc.)
├── App.tsx               # Page layout and modal wiring
└── main.tsx               # Entry point
```

## Getting Started

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Set up environment variables — copy `.env.example` to `.env.local` and fill in `GEMINI_API_KEY` if you plan to add an AI-powered feature. Not required to run the app as-is.
3. Start the dev server:
   ```bash
   npm run dev
   ```
   The app runs at `http://localhost:3000`.

Other scripts:
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — type-check with `tsc --noEmit`

## Status

This is a front-end demo/prototype: there's no real payment processing, delivery logistics, or persistent database — data lives in `localStorage` in the browser. It's a solid foundation for exploring UI/UX ideas for a hybrid electronics + gardening quick-commerce concept, or for wiring up to a real backend and payment provider.

## License

Add a license of your choice (e.g. MIT) if you plan to make this repository public.
