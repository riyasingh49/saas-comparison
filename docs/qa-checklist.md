# Final QA Checklist

Run the automated checks first:

```bash
npm test
npm run lint
npm run build
```

## Search and navigation

- [ ] Search `crm software`.
- [ ] Search `asana pricing`.
- [ ] Search `accounting software`.
- [ ] Search `hris software`.
- [ ] Search `zoom pricing`.
- [ ] Search an unknown keyword and confirm the All view appears.
- [ ] Search `christmas` and confirm it does not match HRIS.
- [ ] Refresh a category URL and confirm the selected category remains active.
- [ ] Refresh a subcategory URL and confirm the selected subcategory remains active.
- [ ] Use browser Back and Forward after changing categories.
- [ ] Clear the search and confirm the All view returns.

## Category coverage

- [ ] CRM Software and its four subcategories.
- [ ] Project Management and its four subcategories.
- [ ] Accounting and its four subcategories.
- [ ] HR & Payroll and its four subcategories.
- [ ] Team Collaboration and its three subcategories.
- [ ] Video Conferencing and its three subcategories.
- [ ] Analytics and its three subcategories.
- [ ] Reviews & Comparisons and its three subcategories.
- [ ] Confirm that changing categories resets the previous subcategory.
- [ ] Confirm that empty filters show a useful empty state.

## Pricing and comparisons

- [ ] Verified prices show the correct currency.
- [ ] Annual-only prices are not presented as monthly billing prices.
- [ ] Unverified prices are excluded from paid cost calculations.
- [ ] Organization-based and usage-based plans are not treated as per-seat rates.
- [ ] Free plans remain visible where recorded.
- [ ] INR and USD prices are not combined into one range.
- [ ] Select two or more vendors and compare them.
- [ ] Remove a selected vendor.
- [ ] Clear the comparison selection.
- [ ] Check the disclaimer and source links.

## Decision support and toolkit

- [ ] Complete all four guided recommendation questions.
- [ ] Confirm recommendations update when answers change.
- [ ] Confirm the current tool is ranked below alternatives.
- [ ] Calculate monthly and annual costs.
- [ ] Calculate unused-seat costs.
- [ ] Calculate a renewal increase.
- [ ] Submit Price Watch with consent.
- [ ] Confirm the UI explains that this is a demo and no email is stored.
- [ ] Try the vendor research search and open a vendor.
- [ ] Test copy and share actions.
- [ ] Test the feedback rating.

## Responsive layout

Test each viewport in browser developer tools:

- [ ] 320px mobile
- [ ] 375px mobile
- [ ] 768px tablet
- [ ] 1280px desktop
- [ ] Phone landscape

Check for horizontal page overflow, clipped controls, unreadable text, and overlapping fixed elements.

## Accessibility

- [ ] Navigate using the keyboard only.
- [ ] Confirm visible focus indicators.
- [ ] Confirm dialogs close with Escape.
- [ ] Confirm focus returns after closing a dialog.
- [ ] Confirm buttons have accessible names.
- [ ] Check reduced-motion behavior.
- [ ] Check color contrast for text and controls.

## Explainer and external integrations

- [ ] Confirm the explainer poster appears when no video is configured.
- [ ] Confirm Price Watch is labelled as a frontend demonstration.
- [ ] Confirm feedback is not described as server-submitted.

## Submission screenshots

Capture these views at desktop and mobile widths:

- [ ] All software view
- [ ] CRM Software view
- [ ] Accounting view
- [ ] Comparison table
- [ ] Toolkit
- [ ] Guided recommendations

Capture dark-mode screenshots only if a dark theme has actually been implemented and checked.

## Final submission details

- [ ] README instructions are accurate.
- [ ] Repository is public.
- [ ] Production deployment is accessible.
- [ ] Actual deployment URL is included in the README.
- [ ] Screenshots are included in the submission.
- [ ] One-page project write-up is included.
