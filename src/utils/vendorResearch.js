import overrides from '../data/vendor-research-overrides.json' with { type: 'json' }

function mergeVendorResearch(vendor, override) {
  if (!override) {
    return vendor
  }

  const existingSources = Array.isArray(vendor.sources)
    ? vendor.sources
    : []

  const updatedSources = Array.isArray(override.sources)
    ? override.sources
    : []

  const sourceMap = new Map(
    existingSources.map((source) => [source.url, source])
  )

  updatedSources.forEach((source) => {
    sourceMap.set(source.url, source)
  })

  return {
    ...vendor,
    ...override,
    pricing: {
      ...vendor.pricing,
      ...(override.pricing || {}),
      plans: override.pricing?.plans
        ? override.pricing.plans
        : vendor.pricing?.plans || []
    },
    features: {
      ...vendor.features,
      ...(override.features || {})
    },
    sources: [...sourceMap.values()],
    verification: {
      ...vendor.verification,
      ...(override.verification || {})
    }
  }
}

export default function enrichVendorsWithResearch(vendors = []) {
  if (!Array.isArray(vendors)) {
    return []
  }

  return vendors.map((vendor) =>
    mergeVendorResearch(vendor, overrides[vendor?.id])
  )
}
