import vendorSubcategoryMappings from '../data/vendor-subcategory-mappings.json'

const normalize = (value) =>
  String(value || '').trim().toLowerCase()

const subcategoryMappings = new Map(
  vendorSubcategoryMappings.map((mapping) => [
    mapping.vendorId,
    Array.isArray(mapping.subcategories)
      ? mapping.subcategories
      : [],
  ])
)

/**
 * Adds assessment-based subcategory assignments to a vendor.
 * The original vendor object is not mutated.
 */
function enrichVendor(vendor) {
  const assignments = subcategoryMappings.get(vendor.id) || []

  return {
    ...vendor,
    subcategories: assignments
      .map((assignment) => assignment.name)
      .filter(Boolean),
    subcategoryAssignments: assignments,
  }
}

export function getPageState(categories = [], vendors = []) {
  const params = new URLSearchParams(window.location.search)

  const categoryId = params.get('category') || ''
  const subcategory = params.get('subcategory') || ''
  const searchTerm = params.get('q') || ''
  const searchType = params.get('type') || ''

  const category =
    categories.find((item) => item.id === categoryId) || null

  const vendor =
    searchType === 'vendor'
      ? vendors.find(
          (item) => normalize(item.name) === normalize(searchTerm)
        ) || null
      : null

  return {
    category,
    subcategory,
    searchTerm,
    searchType,
    vendor,
  }
}

export function updatePageUrl(nextState = {}) {
  const params = new URLSearchParams()

  if (nextState.category?.id) {
    params.set('category', nextState.category.id)
  }

  if (nextState.subcategory) {
    params.set('subcategory', nextState.subcategory)
  }

  if (nextState.searchTerm) {
    params.set('q', nextState.searchTerm)
  }

  if (nextState.searchType) {
    params.set('type', nextState.searchType)
  }

  const queryString = params.toString()
  const nextUrl = queryString
    ? `${window.location.pathname}?${queryString}${window.location.hash}`
    : `${window.location.pathname}${window.location.hash}`

  window.history.pushState({}, '', nextUrl)
}

export function filterVisibleVendors(vendors = [], pageState = {}) {
  if (!Array.isArray(vendors)) {
    return []
  }

  const enrichedVendors = vendors
    .filter((vendor) => vendor?.id && vendor?.name)
    .map(enrichVendor)

  if (pageState.searchType === 'no-results') {
    return []
  }

  if (pageState.searchType === 'vendor') {
    return enrichedVendors.filter(
      (vendor) => vendor.id === pageState.vendor?.id
    )
  }

  let results = enrichedVendors

  if (pageState.category?.name) {
    const categoryName = normalize(pageState.category.name)

    results = results.filter(
      (vendor) => normalize(vendor.category) === categoryName
    )
  }

  if (pageState.subcategory) {
    const selectedSubcategory = normalize(pageState.subcategory)

    results = results.filter((vendor) =>
      vendor.subcategories.some(
        (subcategory) => normalize(subcategory) === selectedSubcategory
      )
    )
  }

  return results
}

export function getSummaryContent(pageState = {}, visibleVendors = []) {
  if (pageState.searchType === 'no-results') {
    return {
      title: 'No matching software found',
      summary: `We couldn't find a match for "${pageState.searchTerm}".`,
      details:
        'Try a different software name, category, or subcategory to explore the available options.',
    }
  }

  if (pageState.searchType === 'vendor' && pageState.vendor) {
    return {
      title: pageState.vendor.name,
      summary: pageState.vendor.description ||
        'Explore the available information and compare this software with other tools.',
      details:
        'Pricing and feature information should be checked against reliable sources before being treated as verified.',
    }
  }

  if (pageState.category) {
    const categoryName = pageState.category.name

    return {
      title: pageState.subcategory
        ? `${pageState.subcategory} Software`
        : categoryName,
      summary: `Explore and compare ${categoryName.toLowerCase()} tools.`,
      details:
        `${visibleVendors.length} software options are currently listed. ` +
        'Some subcategory assignments are provisional and should be verified against the vendor’s official product information.',
    }
  }

  return {
    title: 'Find and compare business software',
    summary:
      'Explore software categories, compare vendors, and review their features and pricing information.',
    details:
      'Vendor information and comparison details are being organized with clear verification status so that confirmed facts can be distinguished from provisional assignments.',
  }
}