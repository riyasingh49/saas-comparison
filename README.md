
# SaaS Comparison Platform

A responsive SaaS discovery and comparison application. Search for business software, explore categories and subcategories, review sourced pricing information, estimate team costs, and compare vendors.

## Features

- Search software categories and vendors using natural-language keywords.
- Share and reload searches through URL query parameters.
- Browse eight software categories and their subcategories.
- Review vendor pricing and official source links with verification dates.
- Calculate monthly and annual team costs where comparable pricing is available.
- Get guided vendor recommendations based on team size, budget, features, and current tools.
- Compare selected vendors side by side.
- Browse vendor research in a searchable panel.
- Explore annual billing, unused-seat, and renewal-increase calculators.
- Review category-specific follow-up questions.
- Use the responsive layout on mobile, tablet, and desktop.

## Technology

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Lucide React
- Node.js test runner

## Requirements

Use Node.js 22.12 or newer.

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/riyasingh49/saas-comparison.git
cd saas-comparison
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run automated tests:

```bash
npm test
```

Run lint checks:

```bash
npm run lint
```

## Search and URL behavior

Search terms are matched against the category, subcategory, vendor, and keyword data.

Examples:

- `?q=zoom+pricing`
- `?q=crm+software`
- `?q=hris+software`
- `?q=accounting+software`
- `?q=asana+pricing`

Category and subcategory selections are reflected in the URL. This allows a selected view to be refreshed or shared.

An unknown keyword falls back to the All software view.

## Data structure

The application uses JSON data rather than embedding vendor information in UI components.

| File | Purpose |
|---|---|
| `src/data/categories.json` | Categories, keywords, vendors and subcategories |
| `src/data/vendors.json` | Vendor records and base information |
| `src/data/vendor-research-overrides.json` | Researched vendor information and source links |
| `src/data/vendor-subcategory-mappings.json` | Vendor-to-subcategory assignments |
| `src/data/pricing-billing-options.json` | Explicit monthly and annual billing rates |
| `src/data/comparison-features.json` | Feature definitions used in comparisons |
| `src/data/guided-recommendation-questions.json` | Guided recommendation questions |
| `src/data/follow-up-question-templates.json` | Category-specific follow-up questions |

## Data verification

Vendor data should distinguish between:

- **Verified:** Supported by an official source and a recorded check date.
- **Assumed:** A provisional assignment that needs confirmation.
- **Unverified:** Not sufficiently supported to be used as a confirmed claim.

Pricing must not be treated as comparable unless its billing unit is suitable for the calculation.

For example:

- Per-user pricing can be used for a per-seat team estimate.
- Organization-based pricing must not be converted into a per-seat rate.
- Usage-based pricing must not be treated as a fixed per-user rate.
- Annual-only prices must not be presented as monthly billing prices.
- USD and INR prices must remain separate.

Free plans may be recorded even when paid pricing is not suitable for a per-seat comparison.

## Pricing and regional behavior

The application supports India-specific URL context using:

`?loc=IN`

Only available, verified INR prices should be presented as INR. USD prices should remain labelled as USD rather than being converted using an invented exchange rate.

Published list prices may exclude taxes, add-ons, onboarding, minimum seat requirements, or usage charges.

## Demo limitations

Some interactions are currently frontend demonstrations:

- Price Watch validates the form and records interest only for the current session. It does not send or store email addresses.
- Comparison ratings and feedback are not submitted to a backend.
- The explainer currently has a poster and chapter list. A video asset still needs to be supplied to enable playback.
- Vendor research and pricing are maintained in local JSON data. They are not refreshed automatically from vendor websites.

These limitations should be considered before presenting the project as a production subscription or monitoring service.

## Project structure

```text
src/
  assets/
  components/
    common/
    comparison/
    home/
    layout/
  data/
  hooks/
  pages/
  utils/

tests/
docs/
```

Reusable UI components are kept separate from application logic and data-processing utilities.

## Quality checks

Before submitting changes, run:

```bash
npm test
npm run lint
npm run build
```

Also complete the manual checks in `docs/qa-checklist.md`.

## Deployment

The production build is generated in the `dist/` directory.

Deploy that directory to a static hosting provider. If the hosting provider uses client-side routing, configure its fallback to serve `index.html`.

Add the actual public deployment URL here once deployment is complete.

## Disclaimer

This project is an independent software comparison resource. It is not a reseller or representative of the listed vendors.

Vendor pricing, features, availability, and plan terms can change. Always check the linked official vendor source before making a purchasing decision.
