import test from 'node:test'
import assert from 'node:assert/strict'

import {
  getComparablePlans,
  getContractDetails,
  getFreePlanDetails,
  getLowestAnnualPrices,
  getPlanSeatCosts,
  getVerifiedPricingSources,
} from '../src/utils/comparisonPricing.js'

const vendor = {
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
        contractTerm: 'Annual contract',
      },
      {
        name: 'Free',
        price: 0,
        billingPeriod: 'Free',
        unit: 'up to 3 users',
        note: 'Limited free edition',
      },
    ],
  },
  features: {
    freePlan: true,
  },
  sources: [
    {
      label: 'Official pricing',
      type: 'official',
      url: 'https://example.com/pricing',
      checkedAt: '2026-11-14',
      status: 'verified',
    },
  ],
}

test('returns only verified paid plans', () => {
  const plans = getComparablePlans(vendor)

  assert.equal(plans.length, 2)
  assert.equal(plans.some((plan) => plan.name === 'Free'), false)
})

test('does not return plans from unverified vendors', () => {
  const unverified = {
    ...vendor,
    pricing: {
      ...vendor.pricing,
      status: 'unverified',
    },
  }

  assert.deepEqual(getComparablePlans(unverified), [])
})

test('recognizes a verified free plan and its published limit', () => {
  assert.deepEqual(getFreePlanDetails(vendor), {
    available: true,
    limit: 'up to 3 users',
    note: 'Limited free edition',
  })
})

test('does not assume free-plan availability when it is unknown', () => {
  const unknown = {
    ...vendor,
    features: {},
    pricing: {
      ...vendor.pricing,
      plans: vendor.pricing.plans.filter(
        (plan) => plan.price > 0
      ),
    },
  }

  assert.deepEqual(getFreePlanDetails(unknown), {
    available: null,
    limit: null,
    note: null,
  })
})

test('returns explicit contract information only', () => {
  assert.equal(
    getContractDetails(vendor.pricing.plans[1]),
    'Annual contract'
  )

  assert.equal(
    getContractDetails(vendor.pricing.plans[0]),
    null
  )
})

test('finds the lowest annual rate separately by currency', () => {
  const otherVendor = {
    ...vendor,
    id: 'cheaper',
    name: 'Cheaper SaaS',
    pricing: {
      ...vendor.pricing,
      plans: [
        {
          name: 'Starter',
          price: 8,
          billingPeriod: 'Annually',
        },
      ],
    },
  }

  const indianVendor = {
    ...otherVendor,
    id: 'indian',
    pricing: {
      ...otherVendor.pricing,
      currency: 'INR',
    },
  }

  const lowest = getLowestAnnualPrices([
    vendor,
    otherVendor,
    indianVendor,
  ])

  assert.deepEqual(lowest.get('USD'), {
    vendorId: 'cheaper',
    planName: 'Starter',
    rate: 8,
  })

  assert.deepEqual(lowest.get('INR'), {
    vendorId: 'indian',
    planName: 'Starter',
    rate: 8,
  })
})

test('does not compare unverified annual prices', () => {
  const unverified = {
    ...vendor,
    id: 'unverified',
    pricing: {
      ...vendor.pricing,
      status: 'unverified',
    },
  }

  const lowest = getLowestAnnualPrices([unverified])

  assert.equal(lowest.size, 0)
})

test('calculates monthly and annual team costs', () => {
  const plans = getComparablePlans(vendor)
  const proPlan = plans.find((plan) => plan.name === 'Pro')

  const result = getPlanSeatCosts(proPlan, 5)

  assert.equal(result.seats, 5)
  assert.equal(result.monthlyTotal, 100)
  assert.equal(result.annualTotal, 1200)
  assert.equal(result.annualSavings, 0)
})

test('does not invent monthly cost for annual-only plans', () => {
  const plans = getComparablePlans(vendor)
  const basicPlan = plans.find((plan) => plan.name === 'Basic')

  const result = getPlanSeatCosts(basicPlan, 5)

  assert.equal(result.monthlyTotal, null)
  assert.equal(result.annualTotal, 600)
  assert.equal(result.annualSavings, null)
})

test('returns only verified official pricing sources with checked dates', () => {
  const result = getVerifiedPricingSources(vendor)

  assert.equal(result.length, 1)
  assert.equal(result[0].label, 'Official pricing')
})

test('does not return unverified pricing sources', () => {
  const unverified = {
    ...vendor,
    sources: [
      {
        label: 'Unverified source',
        type: 'official',
        url: 'https://example.com/pricing',
        checkedAt: '2026-11-14',
        status: 'pending',
      },
    ],
  }

  assert.deepEqual(getVerifiedPricingSources(unverified), [])
})
