import test from 'node:test'
import assert from 'node:assert/strict'
import vendors from '../src/data/vendors.json' with { type: 'json' }
import pricingResearch from '../src/data/vendor-pricing-research.json' with { type: 'json' }
import enrichVendorsWithResearch from '../src/utils/vendorResearch.js'
import {
  getVerifiedPricingPlans,
  isVendorPricingVerified,
} from '../src/utils/pricing.js'

const enriched = enrichVendorsWithResearch(vendors)

function findVendor(id) {
  return enriched.find((vendor) => vendor.id === id)
}

test('supplemental research only references existing vendor records', () => {
  const vendorIds = new Set(vendors.map((vendor) => vendor.id))

  Object.keys(pricingResearch).forEach((id) => {
    assert.ok(vendorIds.has(id), `${id} must exist in vendors.json`)
  })
})

test('all supplemental sources are official and dated', () => {
  Object.values(pricingResearch).forEach((research) => {
    research.sources?.forEach((source) => {
      assert.equal(source.type, 'official')
      assert.equal(source.status, 'verified')
      assert.match(source.url, /^https:\/\//)
      assert.match(source.checkedAt, /^\d{4}-\d{2}-\d{2}$/)
    })
  })
})

test('Jira exposes its verified per-user paid plans', () => {
  const jira = findVendor('jira')

  assert.equal(isVendorPricingVerified(jira), true)
  assert.ok(getVerifiedPricingPlans(jira).length > 0)
})

test('organisation-priced accounting products are not treated as per-seat plans', () => {
  for (const id of [
    'quickbooks',
    'xero',
    'freshbooks',
    'zoho-books',
  ]) {
    const vendor = findVendor(id)

    assert.equal(vendor.pricing.billingModel, 'per_organization')
    assert.equal(isVendorPricingVerified(vendor), false)
    assert.deepEqual(getVerifiedPricingPlans(vendor), [])
  }
})

test('base-plus-employee pricing is excluded from per-seat calculations', () => {
  for (const id of ['gusto', 'rippling', 'greythr']) {
    const vendor = findVendor(id)

    assert.equal(
      vendor.pricing.billingModel,
      'base_plus_per_employee'
    )
    assert.equal(isVendorPricingVerified(vendor), false)
    assert.deepEqual(getVerifiedPricingPlans(vendor), [])
  }
})

test('TallyPrime licence pricing is not treated as per-user pricing', () => {
  const tally = findVendor('tallyprime')

  assert.equal(tally.pricing.billingModel, 'license_based')
  assert.equal(isVendorPricingVerified(tally), false)
  assert.deepEqual(getVerifiedPricingPlans(tally), [])
})

test('Keka does not receive an invented numeric price', () => {
  const keka = findVendor('keka')

  assert.equal(keka.pricing.status, 'unverified')
  assert.deepEqual(keka.pricing.plans, [])
  assert.match(keka.pricing.pricingNote, /custom quote/i)
})

test('GoTo Meeting does not receive an invented numeric price', () => {
  const goto = findVendor('gotomeeting')

  assert.equal(goto.pricing.status, 'unverified')
  assert.deepEqual(goto.pricing.plans, [])
})

test('existing vendor sources are preserved during enrichment', () => {
  const salesforce = findVendor('salesforce')
  const asana = findVendor('asana')

  assert.ok(salesforce.sources.length >= 2)
  assert.ok(asana.sources.length >= 1)
})

test('enrichment does not mutate the original vendor data', () => {
  const original = vendors.find((vendor) => vendor.id === 'jira')

  assert.equal(original.pricing.status, 'unverified')
  assert.equal(original.sources.length, 0)
})
