
# SaaS Comparison Platform

A responsive SaaS discovery and comparison platform that helps users explore software categories, filter products, review pricing information, and compare vendors.

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Lucide React

## Project Features

- SaaS category navigation
- Subcategory filtering
- Software search
- Vendor listing and details
- Side-by-side vendor comparison
- Pricing and feature comparison
- Responsive layouts
- URL-based search and category state

## Vendor Data Methodology

Vendor information is maintained in:

`src/data/vendors.json`

Each vendor record can contain:

- Vendor name and category
- Description
- Subcategory assignments
- Pricing plans
- Feature availability
- Source references
- Verification status

### Data Classification

Every vendor claim should follow one of these classifications:

| Status | Meaning |
|---|---|
| Verified | Supported by an official vendor source |
| Assumed | Inferred from documented product capabilities |
| Unverified | Not sufficiently supported by available evidence |

Assumptions must never be displayed as confirmed vendor facts.

### Subcategory Assignment Rules

Subcategory assignments are based on the subcategories listed in the original project assessment.

When an official source confirms that a vendor supports a relevant use case, the assignment can be marked verified.

When an assignment is inferred from product documentation rather than explicitly stated by the vendor, it must be marked assumed.

An unsupported assignment must remain unverified and must not be used to claim confirmed compatibility.

### Pricing Research Rules

Pricing information should be collected from official vendor pricing pages whenever possible.

For each pricing plan, record:

- Plan name
- Price
- Currency
- Billing period
- Per-user or per-organization pricing
- Minimum seat requirements
- Free plan or trial availability
- Pricing source
- Verification date

Prices from third-party websites must not be presented as official vendor prices.

Regional pricing must be kept separate. USD and INR prices must not be treated as interchangeable.

### Feature Comparison Rules

Feature availability should be recorded with its relevant plan or tier.

A feature should not simply be marked available if it requires:

- A higher subscription tier
- A paid add-on
- An additional integration
- A separate product subscription

Unknown feature availability must be displayed as unverified rather than assumed unavailable.

## Source and Verification Requirements

Preferred source order:

1. Official vendor pricing page
2. Official product documentation
3. Official vendor feature comparison pages
4. Official vendor help center
5. Reliable third-party sources, used only when official information is unavailable

Every researched claim should have a source URL and a checked date.

Example source record:

```json
{
  "label": "Official pricing page",
  "url": "https://example.com/pricing",
  "type": "official",
  "checkedAt": "2026-11-14",
  "status": "verified"
}
```

The example URL above is a schema illustration, not a real vendor source.

## Filtering Behavior

Category filtering must return vendors belonging to the selected category.

Subcategory filtering must use explicit vendor-to-subcategory assignments.

Search, category, subcategory, and sorting filters should work together.

If no vendor matches the selected filters, the application must show an empty state rather than unrelated vendors.

## Comparison Behavior

The comparison table should:

- Compare selected vendors using consistent feature definitions.
- Show plan-specific feature availability where known.
- Distinguish verified, assumed, and unverified values.
- Avoid inventing prices or feature claims.
- Clearly identify missing information.

## Development

Install dependencies:

```bash
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

## Data Accuracy Disclaimer

Vendor pricing, plan names, features, and availability may change.

Information shown in the application should include its source and verification date wherever possible.

The platform is an independent comparison resource and is not a reseller or representative of the listed vendors.
