import test from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateBillingComparison,
  calculateUnusedSeatCost,
  calculateRenewalIncrease,
} from '../src/utils/saasToolkit.js'

test('compares monthly and annual billing correctly', () => {
  const result = calculateBillingComparison({
    monthlyRate: 20,
    annualRate: 16,
    seats: 5,
  })

  assert.equal(result.monthlyTotal, 100)
  assert.equal(result.annualTotal, 960)
  assert.equal(result.annualSavings, 240)
})

test('returns no saving when annual billing costs more', () => {
  const result = calculateBillingComparison({
    monthlyRate: 10,
    annualRate: 12,
    seats: 2,
  })

  assert.equal(result.annualSavings, 0)
})

test('calculates unused seat costs', () => {
  const result = calculateUnusedSeatCost({
    paidSeats: 10,
    activeSeats: 7,
    monthlyRate: 20,
  })

  assert.equal(result.unusedSeats, 3)
  assert.equal(result.monthlyWaste, 60)
  assert.equal(result.annualWaste, 720)
})

test('does not report negative unused seats', () => {
  const result = calculateUnusedSeatCost({
    paidSeats: 5,
    activeSeats: 8,
    monthlyRate: 20,
  })

  assert.equal(result.unusedSeats, 0)
  assert.equal(result.monthlyWaste, 0)
})

test('calculates renewal price increases', () => {
  const result = calculateRenewalIncrease({
    currentPrice: 1200,
    increasePercent: 10,
  })

  assert.equal(result.increaseAmount, 120)
  assert.equal(result.renewalPrice, 1320)
  assert.equal(result.monthlyEquivalent, 110)
})

test('rejects invalid calculation inputs', () => {
  assert.equal(
    calculateBillingComparison({
      monthlyRate: -1,
      annualRate: 10,
      seats: 2,
    }),
    null
  )

  assert.equal(
    calculateUnusedSeatCost({
      paidSeats: 0,
      activeSeats: 2,
      monthlyRate: 10,
    }),
    null
  )

  assert.equal(
    calculateRenewalIncrease({
      currentPrice: 100,
      increasePercent: -5,
    }),
    null
  )
})
