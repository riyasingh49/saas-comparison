import pricingBillingOptions from '../data/pricing-billing-options.json' with { type: 'json' }

import {
  calculateSoftwareCost,
  getVerifiedPricingPlans,
  isVendorPricingVerified,
} from './pricing.js'

export function getComparablePlans(
  vendor,
  billingOptions = pricingBillingOptions
) {
  if (!isVendorPricingVerified(vendor)) {
    return []
  }

  return getVerifiedPricingPlans(vendor, billingOptions)
}

export function getFreePlanDetails(vendor) {
  if (!isVendorPricingVerified(vendor)) {
    return {
      available: null,
      limit: null,
      note: null,
    }
  }

  const plans = Array.isArray(vendor.pricing.plans)
    ? vendor.pricing.plans
    : []

  const freePlan = plans.find(
    (plan) =>
      plan &&
      typeof plan.price === 'number' &&
      plan.price === 0
  )

  if (freePlan) {
    return {
      available: true,
      limit: freePlan.unit || null,
      note: freePlan.note || null,
    }
  }

  if (vendor.features?.freePlan === true) {
    return {
      available: true,
      limit: vendor.pricing.freePlanLimit || null,
      note: vendor.pricing.freePlanNote || null,
    }
  }

  if (vendor.features?.freePlan === false) {
    return {
      available: false,
      limit: null,
      note: null,
    }
  }

  return {
    available: null,
    limit: null,
    note: null,
  }
}

export function getContractDetails(plan) {
  if (!plan || typeof plan !== 'object') {
    return null
  }

  const contract = plan.contractTerm || plan.contract

  return typeof contract === 'string' && contract.trim()
    ? contract.trim()
    : null
}

export function getLowestAnnualPrices(
  vendors = [],
  billingOptions = pricingBillingOptions
) {
  const lowestByCurrency = new Map()

  if (!Array.isArray(vendors)) {
    return lowestByCurrency
  }

  vendors.forEach((vendor) => {
    const plans = getComparablePlans(vendor, billingOptions)
    const currency = vendor?.pricing?.currency

    if (!currency) return

    plans.forEach((plan) => {
      const annualRate = plan.rates.annual

      if (
        typeof annualRate !== 'number' ||
        !Number.isFinite(annualRate) ||
        annualRate <= 0
      ) {
        return
      }

      const current = lowestByCurrency.get(currency)

      if (!current || annualRate < current.rate) {
        lowestByCurrency.set(currency, {
          vendorId: vendor.id,
          planName: plan.name,
          rate: annualRate,
        })
      }
    })
  })

  return lowestByCurrency
}

export function getPlanSeatCosts(plan, seats) {
  if (!plan?.rates) {
    return null
  }

  return calculateSoftwareCost({
    monthlyRate: plan.rates.monthly,
    annualRate: plan.rates.annual,
    seats,
  })
}

export function getVerifiedPricingSources(vendor) {
  if (!isVendorPricingVerified(vendor)) {
    return []
  }

  if (!Array.isArray(vendor.sources)) {
    return []
  }

  return vendor.sources.filter(
    (source) =>
      source?.status === 'verified' &&
      source?.type === 'official' &&
      source?.url &&
      source?.checkedAt
  )
}
