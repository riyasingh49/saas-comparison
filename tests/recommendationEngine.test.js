
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  getRecommendationRanking,
  getTeamSeatCount,
} from '../src/utils/recommendationEngine.js'

function createVendor({
  id,
  name,
  currency = 'USD',
  price = 20,
  verified = true,
  features = {},
} = {}) {
  return {
    id,
    name,
    pricing: {
      status: verified ? 'verified' : 'unverified',
      currency,
      plans: [
        {
          name: 'Basic',
          price,
          billingPeriod: 'Monthly or annually',
        },
      ],
    },
    sources: verified
      ? [
          {
            label: 'Official pricing',
            url: `https://${id}.example/pricing`,
            checkedAt: '2026-11-14',
            status: 'verified',
          },
        ]
      : [],
    features,
  }
}

test('returns an empty result for invalid vendor input', () => {
  const result = getRecommendationRanking(null, {})

  assert.deepEqual(result, {
    rankedVendors: [],
    vendorIds: [],
    results: [],
  })
})

test('ignores vendors without valid identifiers or names', () => {
  const result = getRecommendationRanking(
    [
      createVendor({ id: 'valid', name: 'Valid Vendor' }),
      { id: 'missing-name' },
      { name: 'Missing ID' },
      null,
    ],
    {}
  )

  assert.deepEqual(result.vendorIds, ['valid'])
})

test('preserves original order when no preferences are provided', () => {
  const vendors = [
    createVendor({ id: 'first', name: 'First' }),
    createVendor({ id: 'second', name: 'Second' }),
    createVendor({ id: 'third', name: 'Third' }),
  ]

  const result = getRecommendationRanking(vendors, {})

  assert.deepEqual(result.vendorIds, [
    'first',
    'second',
    'third',
  ])
})

test('prioritizes a vendor with the selected confirmed feature', () => {
  const vendors = [
    createVendor({
      id: 'first',
      name: 'First',
      features: { automation: false },
    }),
    createVendor({
      id: 'second',
      name: 'Second',
      features: { automation: true },
    }),
  ]

  const result = getRecommendationRanking(vendors, {
    mustHaveFeature: 'automation',
  })

  assert.equal(result.vendorIds[0], 'second')
  assert.equal(result.results[0].score, 5)
  assert.deepEqual(result.results[0].reasons, [
    'Workflow automation is listed',
  ])
})

test('does not treat unknown features as confirmed matches', () => {
  const vendors = [
    createVendor({
      id: 'unknown',
      name: 'Unknown',
      features: {},
    }),
    createVendor({
      id: 'confirmed',
      name: 'Confirmed',
      features: { reporting: true },
    }),
  ]

  const result = getRecommendationRanking(vendors, {
    mustHaveFeature: 'reporting',
  })

  assert.equal(result.vendorIds[0], 'confirmed')
  assert.equal(result.results[1].score, 0)
})

test('prioritizes verified pricing that fits the selected budget', () => {
  const vendors = [
    createVendor({
      id: 'expensive',
      name: 'Expensive',
      price: 50,
    }),
    createVendor({
      id: 'affordable',
      name: 'Affordable',
      price: 15,
    }),
  ]

  const result = getRecommendationRanking(vendors, {
    budgetMax: '25',
    budgetCurrency: 'USD',
  })

  assert.equal(result.vendorIds[0], 'affordable')
  assert.equal(result.results[0].score, 4)
})

test('does not use unverified prices for budget scoring', () => {
  const vendors = [
    createVendor({
      id: 'unverified',
      name: 'Unverified',
      price: 5,
      verified: false,
    }),
    createVendor({
      id: 'verified',
      name: 'Verified',
      price: 30,
    }),
  ]

  const result = getRecommendationRanking(vendors, {
    budgetMax: '10',
    budgetCurrency: 'USD',
  })

  assert.equal(result.results[0].score, 0)
  assert.equal(result.results[0].monthlyRate, null)
})

test('does not compare prices across different currencies', () => {
  const vendors = [
    createVendor({
      id: 'usd',
      name: 'USD Vendor',
      currency: 'USD',
      price: 50,
    }),
    createVendor({
      id: 'inr',
      name: 'INR Vendor',
      currency: 'INR',
      price: 1000,
    }),
  ]

  const result = getRecommendationRanking(vendors, {
    budgetMax: '25',
    budgetCurrency: 'USD',
  })

  const inrResult = result.results.find(
    (item) => item.vendorId === 'inr'
  )

  assert.equal(inrResult.score, 0)
})

test('moves the current tool below alternative vendors', () => {
  const vendors = [
    createVendor({ id: 'current', name: 'Current Tool' }),
    createVendor({ id: 'alternative', name: 'Alternative' }),
  ]

  const result = getRecommendationRanking(vendors, {
    currentToolId: 'current',
  })

  assert.deepEqual(result.vendorIds, [
    'alternative',
    'current',
  ])

  assert.equal(result.results[1].score, -4)
})

test('uses team size to calculate an estimated team cost', () => {
  const vendors = [
    createVendor({
      id: 'team-tool',
      name: 'Team Tool',
      price: 10,
    }),
  ]

  const result = getRecommendationRanking(vendors, {
    teamSize: '11-50',
  })

  assert.equal(result.results[0].estimatedSeats, 25)
  assert.equal(result.results[0].monthlyTeamEstimate, 250)
})

test('does not calculate team costs from unverified prices', () => {
  const vendors = [
    createVendor({
      id: 'unknown-price',
      name: 'Unknown Price',
      price: 10,
      verified: false,
    }),
  ]

  const result = getRecommendationRanking(vendors, {
    teamSize: '2-10',
  })

  assert.equal(result.results[0].monthlyRate, null)
  assert.equal(result.results[0].monthlyTeamEstimate, null)
})

test('combines feature, budget and current-tool preferences', () => {
  const vendors = [
    createVendor({
      id: 'current',
      name: 'Current Tool',
      price: 15,
      features: { automation: true },
    }),
    createVendor({
      id: 'best',
      name: 'Best Alternative',
      price: 20,
      features: { automation: true },
    }),
    createVendor({
      id: 'other',
      name: 'Other Alternative',
      price: 40,
      features: { automation: false },
    }),
  ]

  const result = getRecommendationRanking(vendors, {
    mustHaveFeature: 'automation',
    budgetMax: '25',
    budgetCurrency: 'USD',
    currentToolId: 'current',
  })

  assert.deepEqual(result.vendorIds, [
    'best',
    'other',
    'current',
  ])

  assert.equal(result.results[0].score, 9)
  assert.equal(result.results[2].score, 5)
})

test('maps team-size ranges to representative seat counts', () => {
  assert.equal(getTeamSeatCount('1'), 1)
  assert.equal(getTeamSeatCount('2-10'), 5)
  assert.equal(getTeamSeatCount('11-50'), 25)
  assert.equal(getTeamSeatCount('51-200'), 100)
  assert.equal(getTeamSeatCount('200+'), 200)
  assert.equal(getTeamSeatCount('unknown'), null)
})

test('does not award budget points for an unknown budget', () => {
  const vendors = [
    createVendor({
      id: 'vendor',
      name: 'Vendor',
      price: 20,
    }),
  ]

  const result = getRecommendationRanking(vendors, {
    budgetMax: 'none',
    budgetCurrency: 'USD',
  })

  assert.equal(result.results[0].score, 0)
})
