import test from 'node:test'
import assert from 'node:assert/strict'

import {
  calculateSoftwareCost,
  getPlanBillingRates,
  getVerifiedPricingPlans,
  getVerifiedPricingRange,
  isVendorPricingVerified,
} from '../src/utils/pricing.js'

const verifiedVendor = {
  id: 'example',
  name: 'Example SaaS',
  pricing: {
    status: 'verified',
    currency: 'USD',
    plans: [
      {
        name: 'Basic',
        price: 10,
        billingPeriod: 'Annually',
      },
      {
        name: 'Pro',
        price: 20,
        billingPeriod: 'Monthly or annually',
      },
      {
        name: 'Free',
        price: 0,
        billingPeriod: 'Free',
      },
    ],
  },
  sources: [
    {
      label: 'Official pricing',
      url: 'https://example.com/pricing',
      checkedAt: '2026-11-14',
      status: 'verified',
    },
  ],
}

test('accepts pricing with verified status and source', () => {
  assert.equal(
    isVendorPricingVerified(verifiedVendor),
    true
  )
})

test('rejects unverified pricing', () => {
  const vendor = {
    ...verifiedVendor,
    pricing: {
      ...verifiedVendor.pricing,
      status: 'unverified',
    },
  }

  assert.equal(isVendorPricingVerified(vendor), false)
})

test('rejects pricing without a verified source', () => {
  const vendor = {
    ...verifiedVendor,
    sources: [],
  }

  assert.equal(isVendorPricingVerified(vendor), false)
})

test('rejects a source without a checked date', () => {
  const vendor = {
    ...verifiedVendor,
    sources: [
      {
        label: 'Official pricing',
        url: 'https://example.com/pricing',
        status: 'verified',
      },
    ],
  }

  assert.equal(isVendorPricingVerified(vendor), false)
})

test('does not invent monthly price for annual-only plans', () => {
  const rates = getPlanBillingRates(
    verifiedVendor,
    verifiedVendor.pricing.plans[0]
  )

  assert.deepEqual(rates, {
    monthly: null,
    annual: 10,
  })
})

test('uses explicit monthly and annual billing rates', () => {
  const rates = getPlanBillingRates(
    verifiedVendor,
    verifiedVendor.pricing.plans[0],
    {
      example: {
        Basic: {
          monthly: 15,
          annual: 10,
        },
      },
    }
  )

  assert.deepEqual(rates, {
    monthly: 15,
    annual: 10,
  })
})

test('excludes plans from vendors with unverified pricing', () => {
  const vendor = {
    ...verifiedVendor,
    pricing: {
      ...verifiedVendor.pricing,
      status: 'unverified',
    },
  }

  assert.deepEqual(getVerifiedPricingPlans(vendor), [])
})

test('excludes free plans from paid calculator plans', () => {
  const plans = getVerifiedPricingPlans(verifiedVendor)

  assert.equal(
    plans.some((plan) => plan.name === 'Free'),
    false
  )

  assert.equal(plans.length, 2)
})

test('calculates monthly and annual costs for multiple seats', () => {
  const result = calculateSoftwareCost({
    monthlyRate: 15,
    annualRate: 10,
    seats: 5,
  })

  assert.deepEqual(result, {
    seats: 5,
    monthlyTotal: 75,
    annualTotal: 600,
    annualSavings: 300,
    monthlyRate: 15,
    annualRate: 10,
  })
})

test('clamps seat count to minimum of one', () => {
  const result = calculateSoftwareCost({
    monthlyRate: 10,
    annualRate: 8,
    seats: 0,
  })

  assert.equal(result.seats, 1)
})

test('clamps seat count to maximum of 10000', () => {
  const result = calculateSoftwareCost({
    monthlyRate: 10,
    annualRate: 8,
    seats: 50000,
  })

  assert.equal(result.seats, 10000)
})

test('does not calculate savings when monthly rate is unavailable', () => {
  const result = calculateSoftwareCost({
    monthlyRate: null,
    annualRate: 10,
    seats: 2,
  })

  assert.equal(result.monthlyTotal, null)
  assert.equal(result.annualTotal, 240)
  assert.equal(result.annualSavings, null)
})

test('does not calculate savings when annual rate is unavailable', () => {
  const result = calculateSoftwareCost({
    monthlyRate: 15,
    annualRate: null,
    seats: 2,
  })

  assert.equal(result.monthlyTotal, 30)
  assert.equal(result.annualTotal, null)
  assert.equal(result.annualSavings, null)
})

test('does not accept negative or invalid prices', () => {
  const result = calculateSoftwareCost({
    monthlyRate: -10,
    annualRate: 'invalid',
    seats: 2,
  })

  assert.equal(result.monthlyTotal, null)
  assert.equal(result.annualTotal, null)
  assert.equal(result.annualSavings, null)
})

test('pricing range includes only verified vendors', () => {
  const unverifiedVendor = {
    ...verifiedVendor,
    id: 'unverified',
    pricing: {
      ...verifiedVendor.pricing,
      status: 'unverified',
    },
  }

  const ranges = getVerifiedPricingRange([
    verifiedVendor,
    unverifiedVendor,
  ])

  assert.equal(ranges.length, 1)
  assert.equal(ranges[0].currency, 'USD')
  assert.equal(ranges[0].minimum, 10)
  assert.equal(ranges[0].maximum, 20)
})

test('supports INR pricing ranges', () => {
  const indianVendor = {
    ...verifiedVendor,
    id: 'indian-example',
    pricing: {
      ...verifiedVendor.pricing,
      currency: 'INR',
    },
  }

  const ranges = getVerifiedPricingRange(
    [indianVendor],
    'IN'
  )

  assert.equal(ranges[0].currency, 'INR')
})
