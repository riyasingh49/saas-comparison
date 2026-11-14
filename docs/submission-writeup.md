
# SaaS Comparison Platform — Project Summary

## Objective

The project provides a searchable platform for discovering and comparing SaaS products. It helps users explore software categories, review vendor pricing, estimate team costs, and make more informed comparisons.

## Solution

The application organizes vendors across eight software categories: CRM, project management, accounting, HR and payroll, team collaboration, video conferencing, analytics, and reviews and comparisons.

Users can search by keyword, navigate category-specific subtypes, review available vendor research, and compare selected products. URL query parameters preserve the selected search and category context.

The pricing tools calculate team costs only where the available pricing data supports a meaningful comparison. Annual-only, organization-based, and usage-based pricing are not silently converted into per-seat monthly prices.

## Technical approach

The frontend uses React and Vite, with Tailwind CSS for styling. Reusable components are separated from hooks and utility functions. Vendor information, category definitions, pricing options, and comparison features are maintained in JSON data files.

The application uses a verification-aware pricing model. Official source links and check dates are recorded alongside researched vendor information. Unverified information is kept separate from confirmed pricing.

## User-facing functionality

- Keyword search and category navigation
- Category-specific subcategory filters
- Vendor research panel
- Guided recommendations
- Side-by-side vendor comparisons
- Team cost calculator
- Annual/monthly, unused-seat, and renewal tools
- Price Watch demonstration
- Follow-up questions and feedback controls

## Quality assurance

Automated tests cover pricing calculations, recommendation ranking, vendor research enrichment, and category keyword matching. ESLint and the Vite production build are used as additional quality checks.

Manual QA covers responsive layouts, keyboard navigation, URL behavior, comparison workflows, and pricing display rules.

## Known limitations

Price Watch and feedback are frontend demonstrations and do not submit data to a backend. Vendor data is maintained locally rather than refreshed automatically. The explainer video still requires a real video asset before playback can be considered complete.

## Submission links

- Repository: https://github.com/riyasingh49/saas-comparison
- Live application: Add the verified deployment URL here.
