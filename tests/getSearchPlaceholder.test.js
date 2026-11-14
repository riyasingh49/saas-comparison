import test from 'node:test'
import assert from 'node:assert/strict'
import getSearchPlaceholder from '../src/utils/getSearchPlaceholder.js'

test('uses a general placeholder when All view is selected', () => {
  assert.equal(
    getSearchPlaceholder(null),
    'CRM, accounting, project management...'
  )
})

test('uses the category example when no subcategory is selected', () => {
  assert.equal(
    getSearchPlaceholder({ id: 'accounting' }),
    'Try searching QuickBooks pricing...'
  )
})

test('changes the example for the selected subcategory', () => {
  assert.equal(
    getSearchPlaceholder(
      { id: 'accounting' },
      'GST invoicing'
    ),
    'Try searching TallyPrime GST pricing...'
  )
})

test('supports examples across all categories', () => {
  assert.equal(
    getSearchPlaceholder(
      { id: 'crm' },
      'Sales pipeline'
    ),
    'Try searching Pipedrive pricing...'
  )

  assert.equal(
    getSearchPlaceholder(
      { id: 'project-management' },
      'Kanban'
    ),
    'Try searching Trello Kanban pricing...'
  )

  assert.equal(
    getSearchPlaceholder(
      { id: 'analytics' },
      'BI dashboards'
    ),
    'Try searching Tableau pricing...'
  )
})

test('falls back safely for an unknown category', () => {
  assert.equal(
    getSearchPlaceholder({ id: 'unknown' }),
    'CRM, accounting, project management...'
  )
})
