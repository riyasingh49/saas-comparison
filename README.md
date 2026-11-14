
# SaaS Comparison Platform

A responsive SaaS discovery and comparison application. Search for business software, explore categories and subcategories, review sourced pricing information, estimate team costs, and compare vendors.

## Live Demo

**Live Website:** https://saas-comparison-three.vercel.app

**GitHub Repository:** https://github.com/riyasingh49/saas-comparison

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

## Technology Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Lucide React
- Node.js test runner

## Requirements

- Node.js 22.12 or newer
- npm

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/riyasingh49/saas-comparison.git
```

### 2. Navigate to the project directory

```bash
cd saas-comparison
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates the production build |
| `npm run preview` | Previews the production build |
| `npm test` | Runs automated tests |
| `npm run lint` | Runs ESLint checks |

## Search and URL Behavior

Search terms are matched against category, subcategory, vendor, and keyword data.

Example search queries:

- `?q=zoom+pricing`
- `?q=crm+software`
- `?q=hris+software`
- `?q=accounting+software`
- `?q=asana+pricing`

Category and subcategory selections are reflected in the URL. This allows users to refresh or share a selected view.

Unknown keywords fall back to the All software view.

## Software Categories

The application includes eight software categories:

1. CRM Software
2. Project Management
3. Accounting
4. HR & Payroll
5. Team Collaboration
6. Video Conferencing
7. Analytics
8. Reviews & Comparisons

Each category provides relevant vendors and subcategory filters.

## Data Structure

The application uses JSON data files to keep vendor information separate from UI components.

| File | Purpose |
|---|---|
| `src/data/categories.json` | Categories, keywords, vendors and subcategories |
| `src/data/vendors.json` | Vendor records and base information |
| `src/data/vendor-research-overrides.json` | Researched vendor information and source links |
| `src/data/vendor-subcategory-mappings.json` | Vendor-to-subcategory assignments |
| `src/data/pricing-billing-options.json` | Monthly and annual billing options |
| `src/data/comparison-features.json` | Feature definitions used in comparisons |
| `src/data/guided-recommendation-questions.json` | Guided recommendation questions |
| `src/data/follow-up-question-templates.json` | Category-specific follow-up questions |

## Pricing and Data Verification

Vendor information should distinguish between:

- **Verified:** Supported by an official source and a recorded check date.
- **Assumed:** A provisional assignment that needs confirmation.
- **Unverified:** Not sufficiently supported to be used as a confirmed claim.

Pricing must not be treated as comparable unless its billing unit is suitable for the calculation.

Examples:

- Per-user pricing can be used for a per-seat team estimate.
- Organization-based pricing must not be converted into a per-seat rate.
- Usage-based pricing must not be treated as a fixed per-user rate.
- Annual-only prices must not be presented as monthly billing prices.
- USD and INR prices must remain separate.

Free plans may be recorded even when paid pricing is not suitable for a per-seat comparison.

## Regional Pricing

The application supports India-specific URL context using:

`?loc=IN`

Only available, verified INR prices should be presented as INR. USD prices should remain labelled as USD rather than being converted using an invented exchange rate.

Published list prices may exclude taxes, add-ons, onboarding, minimum seat requirements, or usage charges.

## Demo Limitations

Some interactions are currently frontend demonstrations:

- **Price Watch:** Validates the form and records interest only for the current session. It does not send or store email addresses.
- **Feedback:** Ratings and feedback are not submitted to a backend.
- **Vendor research:** Pricing and vendor information are maintained in local JSON data. They are not refreshed automatically from vendor websites.

These limitations should be considered before presenting the project as a production subscription or monitoring service.

## Project Structure

```text
saas-comparison/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── comparison/
│   │   ├── home/
│   │   └── layout/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   └── utils/
├── tests/
├── docs/
├── public/
├── package.json
└── README.md
```

Reusable UI components are kept separate from application logic and data-processing utilities.

## Quality Checks

Before submitting changes, run:

```bash
npm test
npm run lint
npm run build
```

Also complete the manual checks in `docs/qa-checklist.md`.

## Deployment

The application is deployed on **Vercel**.

**Live Application:** https://saas-comparison-three.vercel.app

**Source Code:** https://github.com/riyasingh49/saas-comparison

The production build is generated in the `dist/` directory.

For deployments using client-side routing, configure the hosting provider to serve `index.html` as the fallback for application routes.

## Disclaimer

This project is an independent software comparison resource. It is not a reseller or representative of the listed vendors.

Vendor pricing, features, availability, and plan terms can change. Always check the linked official vendor source before making a purchasing decision.
