
import questions from '../data/guided-recommendation-questions.json' with { type: 'json' }
import pricingBillingOptions from '../data/pricing-billing-options.json' with { type: 'json' }
import { getVerifiedPricingPlans } from './pricing.js'

const TEAM_SIZE_SEATS = {
  '1': 1,
  '2-10': 5,
  '11-50': 25,
  '51-200': 100,
  '200+': 200,
}

function getTeamSeatCount(teamSize) {
  return TEAM_SIZE_SEATS[teamSize] || null
}

function getLowestPublishedRate(vendor, billingOptions) {
  const plans = getVerifiedPricingPlans(vendor, billingOptions)

  if (!plans.length) {
    return null
  }

  const rates = plans
    .map((plan) => plan.rates.annual ?? plan.rates.monthly)
    .filter(
      (rate) =>
        typeof rate === 'number' &&
        Number.isFinite(rate) &&
        rate > 0
    )

  return rates.length ? Math.min(...rates) : null
}

function getFeatureLabel(featureKey) {
  return (
    questions.mustHaveFeature.options.find(
      (feature) => feature.value === featureKey
    )?.label || featureKey
  )
}

function scoreVendor(vendor, answers, billingOptions) {
  let score = 0
  const reasons = []

  const featureKey = answers.mustHaveFeature

  if (featureKey) {
    const featureValue = vendor.features?.[featureKey]

    if (featureValue === true) {
      score += 5
      reasons.push(`${getFeatureLabel(featureKey)} is listed`)
    }
  }

  const budgetMax = Number(answers.budgetMax)
  const budgetCurrency = answers.budgetCurrency
  const vendorCurrency = vendor.pricing?.currency

  const monthlyRate = getLowestPublishedRate(
    vendor,
    billingOptions
  )

  if (
    Number.isFinite(budgetMax) &&
    budgetMax > 0 &&
    monthlyRate !== null &&
    budgetCurrency &&
    vendorCurrency === budgetCurrency
  ) {
    if (monthlyRate <= budgetMax) {
      score += 4
      reasons.push('Published price fits your budget')
    } else {
      score -= 2
      reasons.push('Published price exceeds your budget')
    }
  }

  if (
    answers.currentToolId &&
    answers.currentToolId !== 'none' &&
    answers.currentToolId !== 'other' &&
    vendor.id === answers.currentToolId
  ) {
    score -= 4
    reasons.push('Your current tool — alternatives are prioritized')
  }

  const seats = getTeamSeatCount(answers.teamSize)

  const monthlyTeamEstimate =
    seats && monthlyRate !== null
      ? monthlyRate * seats
      : null

  return {
    vendorId: vendor.id,
    score,
    reasons,
    monthlyRate,
    monthlyTeamEstimate,
    currency: vendorCurrency || null,
    estimatedSeats: seats,
  }
}

export function getRecommendationRanking(
  vendors = [],
  answers = {},
  billingOptions = pricingBillingOptions
) {
  if (!Array.isArray(vendors)) {
    return {
      rankedVendors: [],
      vendorIds: [],
      results: [],
    }
  }

  const validVendors = vendors.filter(
    (vendor) => vendor?.id && vendor?.name
  )

  const scoredResults = validVendors.map(
    (vendor, originalIndex) => ({
      ...scoreVendor(vendor, answers, billingOptions),
      originalIndex,
    })
  )

  const currentToolId =
    answers.currentToolId &&
    answers.currentToolId !== 'none' &&
    answers.currentToolId !== 'other'
      ? answers.currentToolId
      : null

  scoredResults.sort((a, b) => {
    const aIsCurrentTool = a.vendorId === currentToolId
    const bIsCurrentTool = b.vendorId === currentToolId

    // Keep the selected current tool below alternative vendors.
    if (aIsCurrentTool !== bIsCurrentTool) {
      return aIsCurrentTool ? 1 : -1
    }

    return (
      b.score - a.score ||
      a.originalIndex - b.originalIndex
    )
  })

  const vendorMap = new Map(
    validVendors.map((vendor) => [vendor.id, vendor])
  )

  const rankedVendors = scoredResults
    .map((result) => vendorMap.get(result.vendorId))
    .filter(Boolean)

  return {
    rankedVendors,
    vendorIds: rankedVendors.map((vendor) => vendor.id),
    results: scoredResults.map((result) => ({
      vendorId: result.vendorId,
      score: result.score,
      reasons: result.reasons,
      monthlyRate: result.monthlyRate,
      monthlyTeamEstimate: result.monthlyTeamEstimate,
      currency: result.currency,
      estimatedSeats: result.estimatedSeats,
    })),
  }
}

export { getTeamSeatCount }
