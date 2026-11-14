import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getPricingRange,
  updatePageUrl,
} from '../src/utils/homePageHelpers.js'

test('preserves the India region in the URL', () => {
  const originalWindow = globalThis.window
  let updatedUrl = ''

  globalThis.window = {
    location: {
      pathname: '/',
      hash: '',
    },
    history: {
      pushState: (_state, _title, url) => {
        updatedUrl = url
      },
    },
  }

  try {
    updatePageUrl({
      category: { id: 'accounting' },
      subcategory: 'GST invoicing',
      searchTerm: 'tallyprime',
      searchType: 'category',
      region: 'IN',
    })

    const url = new URL(updatedUrl, 'https://example.test')

    assert.equal(url.searchParams.get('loc'), 'IN')
    assert.equal(url.searchParams.get('category'), 'accounting')
    assert.equal(url.searchParams.get('subcategory'), 'GST invoicing')
    assert.equal(url.searchParams.get('q'), 'tallyprime')
  } finally {
    globalThis.window = originalWindow
  }
})

test('does not add loc=IN for the default US region', () => {
  const originalWindow = globalThis.window
  let updatedUrl = ''

  globalThis.window = {
    location: {
      pathname: '/',
      hash: '',
    },
    history: {
      pushState: (_state, _title, url) => {
        updatedUrl = url
      },
    },
  }

  try {
    updatePageUrl({
      category: null,
      subcategory: '',
      searchTerm: '',
      searchType: '',
      region: 'US',
    })

    const url = new URL(updatedUrl, 'https://example.test')

    assert.equal(url.searchParams.has('loc'), false)
  } finally {
    globalThis.window = originalWindow
  }
})

test('keeps pricing ranges grouped by currency', () => {
  const vendors = [
    {
      id: 'inr-vendor',
      pricing: {
        status: 'verified',
        currency: 'INR',
        plans: [
          { name: 'Standard', price: 800, billingPeriod: 'Annually' },
        ],
      },
      sources: [
        {
          status: 'verified',
          url: 'https://example.com/inr',
          checkedAt: '2026-11-14',
        },
      ],
    },
    {
      id: 'usd-vendor',
      pricing: {
        status: 'verified',
        currency: 'USD',
        plans: [
          { name: 'Standard', price: 20, billingPeriod: 'Annually' },
        ],
      },
      sources: [
        {
          status: 'verified',
          url: 'https://example.com/usd',
          checkedAt: '2026-11-14',
        },
      ],
    },
  ]

  const ranges = getPricingRange(vendors, 'IN')

  assert.match(ranges, /₹/)
  assert.match(ranges, /\$/)
  assert.match(ranges, /billed in USD/)
})
