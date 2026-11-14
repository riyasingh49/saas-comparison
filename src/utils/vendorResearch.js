
import overrides from '../data/vendor-research-overrides.json' with { type: 'json' }
import pricingResearch from '../data/vendor-pricing-research.json' with { type: 'json' }
import trelloResearch from '../data/trello-pricing-research.json' with { type: 'json' }

function mergePlans(existingPlans = [], updatedPlans = []) {
  const plans = new Map()

  existingPlans.forEach((plan) => {
    if (plan?.name) plans.set(plan.name, plan)
  })

  updatedPlans.forEach((plan) => {
    if (plan?.name) {
      plans.set(plan.name, {
        ...plans.get(plan.name),
        ...plan,
      })
    }
  })

  return [...plans.values()]
}

function mergeVendorResearch(vendor, override) {
  if (!override) return vendor

  const existingSources = Array.isArray(vendor.sources)
    ? vendor.sources
    : []

  const updatedSources = Array.isArray(override.sources)
    ? override.sources
    : []

  const sourceMap = new Map(
    existingSources
      .filter((source) => source?.url)
      .map((source) => [source.url, source])
  )

  updatedSources.forEach((source) => {
    if (source?.url) {
      sourceMap.set(source.url, {
        ...sourceMap.get(source.url),
        ...source,
      })
    }
  })

  return {
    ...vendor,
    ...override,
    pricing: {
      ...vendor.pricing,
      ...(override.pricing || {}),
      plans: mergePlans(
        vendor.pricing?.plans || [],
        override.pricing?.plans || []
      ),
    },
    features: {
      ...vendor.features,
      ...(override.features || {}),
    },
    sources: [...sourceMap.values()],
    verification: {
      ...vendor.verification,
      ...(override.verification || {}),
    },
  }
}

export default function enrichVendorsWithResearch(vendors = []) {
  if (!Array.isArray(vendors)) return []

  return vendors.map((vendor) => {
    const withExistingResearch = mergeVendorResearch(
      vendor,
      overrides[vendor?.id]
    )

    const withPricingResearch = mergeVendorResearch(
      withExistingResearch,
      pricingResearch[vendor?.id]
    )

    return mergeVendorResearch(
      withPricingResearch,
      trelloResearch[vendor?.id]
    )
  })
}
