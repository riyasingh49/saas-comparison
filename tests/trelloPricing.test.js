import test from 'node:test'
import assert from 'node:assert/strict'
import vendors from '../src/data/vendors.json' with { type: 'json' }
import billingOptions from '../src/data/pricing-billing-options.json' with { type: 'json' }
import enrichVendorsWithResearch from '../src/utils/vendorResearch.js'
import {
  calculateSoftwareCost,
  getVerifiedPricingPlans,
  isVendorPricingVerified,
} from '../src/utils/pricing.js'

const enriched = enrichVendorsWithResearch(vendors)
const trello = enriched.find((vendor) => vendor.id === 'trello')

test('Trello is present and has verified official pricing', () => {
  assert.ok(trello)
  assert.equal(trello.pricing.status, 'verified')
  assert.equal(trello.pricing.billingModel, 'per_user')
  assert.equal(isVendorPricingVerified(trello), true)
  assert.ok(
    trello.sources.some(
      (source) =>
        source.url === 'https://trello.com/en/pricing' &&
        source.status === 'verified'
    )
  )
})

test('Trello retains its published free plan and collaborator limit', () => {
  const free = trello.pricing.plans.find((plan) => plan.name === 'Free')

  assert.ok(free)
  assert.equal(free.price, 0)
  assert.match(free.unit, /10 collaborators/i)
})

test('Trello exposes the three verified paid plans', () => {
  const plans = getVerifiedPricingPlans(trello, billingOptions)

  assert.deepEqual(
    plans.map((plan) => plan.name),
    ['Standard', 'Premium', 'Enterprise']
  )
})

test('Trello monthly and annual rates are kept separate', () => {
  const plans = getVerifiedPricingPlans(trello, billingOptions)

  const standard = plans.find((plan) => plan.name === 'Standard')
  const premium = plans.find((plan) => plan.name === 'Premium')
  const enterprise = plans.find((plan) => plan.name === 'Enterprise')

  assert.deepEqual(standard.rates, {
    monthly: 6,
    annual: 5,
  })

  assert.deepEqual(premium.rates, {
    monthly: 12.5,
    annual: 10,
  })

  assert.deepEqual(enterprise.rates, {
    monthly: null,
    annual: 17.5,
  })
})

test('Trello team cost and annual savings calculate correctly', () => {
  const totals = calculateSoftwareCost({
    monthlyRate: 6,
    annualRate: 5,
    seats: 10,
  })

  assert.equal(totals.monthlyTotal, 60)
  assert.equal(totals.annualTotal, 600)
  assert.equal(totals.annualSavings, 120)
})

test('Trello free plan is excluded from paid calculator plans', () => {
  const plans = getVerifiedPricingPlans(trello, billingOptions)

  assert.ok(plans.every((plan) => plan.price > 0))
  assert.ok(plans.every((plan) => plan.name !== 'Free'))
})
