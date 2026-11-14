import test from 'node:test'
import assert from 'node:assert/strict'
import getFollowUpQuestions from '../src/utils/followUpQuestions.js'

test('returns category-specific follow-up questions', () => {
  const questions = getFollowUpQuestions('CRM Software')

  assert.equal(questions.length, 4)
  assert.ok(questions.every((question) => typeof question === 'string'))
})

test('includes the selected subtype in relevant questions', () => {
  const questions = getFollowUpQuestions(
    'Project Management',
    'Software teams'
  )

  assert.ok(
    questions.some((question) => question.includes('Software teams'))
  )
})

test('uses a general workflow label when subtype is empty', () => {
  const questions = getFollowUpQuestions('Analytics', '')

  assert.ok(
    questions.some((question) => question.includes('your selected workflow'))
  )
})

test('returns safe fallback questions for unknown categories', () => {
  const questions = getFollowUpQuestions('Unknown category')

  assert.equal(questions.length, 3)
  assert.ok(questions.every((question) => question.length > 0))
})

test('does not mutate the question templates between calls', () => {
  const first = getFollowUpQuestions('Accounting', 'GST invoicing')
  const second = getFollowUpQuestions('Accounting', 'Inventory')

  assert.ok(first.some((question) => question.includes('GST invoicing')))
  assert.ok(second.some((question) => question.includes('Inventory')))
  assert.ok(!second.some((question) => question.includes('GST invoicing')))
})
