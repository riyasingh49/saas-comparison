import test from 'node:test'
import assert from 'node:assert/strict'
import categories from '../src/data/categories.json' with { type: 'json' }
import { findCategoryByKeyword } from '../src/utils/categoryMatcher.js'

test('contains the eight assessment categories', () => {
  assert.equal(categories.length, 8)
})

test('every category has a name, keywords and subtypes', () => {
  categories.forEach((category) => {
    assert.ok(category.id)
    assert.ok(category.name)
    assert.ok(Array.isArray(category.keywords))
    assert.ok(category.keywords.length > 0)
    assert.ok(Array.isArray(category.subTypes))
    assert.ok(category.subTypes.length > 0)
  })
})

test('every configured keyword maps to its correct category', () => {
  categories.forEach((category) => {
    category.keywords.forEach((keyword) => {
      const result = findCategoryByKeyword(keyword)

      assert.equal(
        result.type,
        'category',
        `Expected "${keyword}" to match a category`
      )

      assert.equal(
        result.category.id,
        category.id,
        `Expected "${keyword}" to map to ${category.name}`
      )
    })
  })
})

test('matches category names regardless of letter case', () => {
  const result = findCategoryByKeyword('CRM SOFTWARE')

  assert.equal(result.category.id, 'crm')
})

test('matches keywords with extra whitespace', () => {
  const result = findCategoryByKeyword('  zoom   pricing  ')

  assert.equal(result.category.id, 'video-conferencing')
})

test('matches HRIS as a complete phrase', () => {
  const result = findCategoryByKeyword('HRIS software')

  assert.equal(result.category.id, 'hr-payroll')
})

test('does not match HRIS inside unrelated words', () => {
  const result = findCategoryByKeyword('christmas')

  assert.equal(result.type, 'no-results')
  assert.equal(result.category, null)
})

test('returns the All result for an empty search', () => {
  const result = findCategoryByKeyword('')

  assert.equal(result.type, 'all')
  assert.equal(result.category, null)
})

test('returns the All result for the all keyword', () => {
  const result = findCategoryByKeyword('all')

  assert.equal(result.type, 'all')
})

test('returns no-results for an unknown keyword', () => {
  const result = findCategoryByKeyword('unlisted software phrase')

  assert.equal(result.type, 'no-results')
  assert.equal(result.category, null)
})

test('recognizes vendor searches', () => {
  const result = findCategoryByKeyword('Salesforce')

  assert.equal(result.type, 'vendor')
  assert.equal(result.vendor.id, 'salesforce')
  assert.equal(result.category.id, 'crm')
})
