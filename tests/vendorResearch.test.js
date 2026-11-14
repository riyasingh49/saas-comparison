import test from 'node:test'
import assert from 'node:assert/strict'
import vendors from '../src/data/vendors.json' with { type: 'json' }
import overrides from '../src/data/vendor-research-overrides.json' with { type: 'json' }
import enrichVendorsWithResearch from '../src/utils/vendorResearch.js'
import {
  getVerifiedPricingPlans,
  isVendorPricingVerified
} from '../src/utils/pricing.js'

test('enriches the original vendor list without mutating it', () => {
  const originalAsana = vendors.find((vendor) => vendor.id === 'asana')
  const originalDescription = originalAsana.description

  const enriched = enrichVendorsWithResearch(vendors)
  const updatedAsana = enriched.find((vendor) => vendor.id === 'asana')

  assert.notEqual(updatedAsana, originalAsana)
  assert.equal(originalAsana.description, originalDescription)
  assert.equal(updatedAsana.pricing.status, 'verified')
})

test('preserves vendors that do not have a research override', () => {
  const enriched = enrichVendorsWithResearch(vendors)

  const originalTrello = vendors.find((vendor) => vendor.id === 'trello')
  const updatedTrello = enriched.find((vendor) => vendor.id === 'trello')

  assert.deepEqual(updatedTrello, originalTrello)
})

test('adds only official sources with checked dates', () => {
  const enriched = enrichVendorsWithResearch(vendors)

  enriched.forEach((vendor) => {
    const override = overrides[vendor.id]

    if (!override) return

    override.sources?.forEach((source) => {
      assert.equal(source.type, 'official')
      assert.equal(source.status, 'verified')
      assert.match(source.url, /^https:\/\//)
      assert.match(source.checkedAt, /^\d{4}-\d{2}-\d{2}$/)
    })
  })
})

test('exposes verified paid plans only for vendors with verified pricing', () => {
  const enriched = enrichVendorsWithResearch(vendors)

  const asana = enriched.find((vendor) => vendor.id === 'asana')
  const slack = enriched.find((vendor) => vendor.id === 'slack')
  const rippling = enriched.find((vendor) => vendor.id === 'rippling')

  assert.equal(isVendorPricingVerified(asana), true)
  assert.equal(isVendorPricingVerified(slack), true)
  assert.equal(isVendorPricingVerified(rippling), false)

  assert.ok(getVerifiedPricingPlans(asana).length > 0)
  assert.ok(getVerifiedPricingPlans(slack).length > 0)
  assert.deepEqual(getVerifiedPricingPlans(rippling), [])
})

test('does not turn organization or usage-based pricing into per-seat rates', () => {
  const enriched = enrichVendorsWithResearch(vendors)

  const zohoBooks = enriched.find((vendor) => vendor.id === 'zoho-books')
  const mixpanel = enriched.find((vendor) => vendor.id === 'mixpanel')
  const amplitude = enriched.find((vendor) => vendor.id === 'amplitude')

  assert.deepEqual(getVerifiedPricingPlans(zohoBooks), [])
  assert.deepEqual(getVerifiedPricingPlans(mixpanel), [])
  assert.deepEqual(getVerifiedPricingPlans(amplitude), [])
})

test('does not treat account-based or usage-based pricing as per-seat rates', () => {
  const enriched = enrichVendorsWithResearch(vendors)

  const vendorIds = [
    'zoho-books',
    'mixpanel',
    'amplitude',
    'quickbooks',
    'freshbooks'
  ]

  vendorIds.forEach((vendorId) => {
    const vendor = enriched.find((item) => item.id === vendorId)

    assert.ok(vendor, `Expected ${vendorId} to exist`)
    assert.equal(
      isVendorPricingVerified(vendor),
      false,
      `${vendorId} should not have verified per-seat pricing`
    )
    assert.deepEqual(
      getVerifiedPricingPlans(vendor),
      [],
      `${vendorId} should not expose verified per-seat plans`
    )
  })
})

test('retains free-plan details when the vendor publishes a free tier', () => {
  const enriched = enrichVendorsWithResearch(vendors)

  const asana = enriched.find((vendor) => vendor.id === 'asana')
  const powerBi = enriched.find((vendor) => vendor.id === 'power-bi')
  const zohoBooks = enriched.find((vendor) => vendor.id === 'zoho-books')
  const mixpanel = enriched.find((vendor) => vendor.id === 'mixpanel')
  const amplitude = enriched.find((vendor) => vendor.id === 'amplitude')

  for (const vendor of [asana, powerBi, zohoBooks, mixpanel, amplitude]) {
    assert.ok(
      vendor.pricing.plans.some((plan) => plan.price === 0),
      `${vendor.id} should retain its published free plan`
    )
  }
})

test('returns an empty array for invalid vendor input', () => {
  assert.deepEqual(enrichVendorsWithResearch(null), [])
  assert.deepEqual(enrichVendorsWithResearch({}), [])
})
