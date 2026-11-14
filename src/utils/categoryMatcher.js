import categories from '../data/categories.json' with { type: 'json' }
import vendors from '../data/vendors.json' with { type: 'json' }

function normalize(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ')
}

function matchesPhrase(query, phrase) {
  const normalizedPhrase = normalize(phrase)

  if (!query || !normalizedPhrase) return false

  const escapedPhrase = normalizedPhrase.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )

  return new RegExp(
    `(^|[^a-z0-9])${escapedPhrase}($|[^a-z0-9])`,
    'i'
  ).test(query)
}

function createResult(type, options = {}) {
  return {
    type,
    category: options.category || null,
    subcategory: options.subcategory || '',
    vendor: options.vendor || null,
  }
}

function matchCategoryName(query) {
  return categories.find((category) =>
    matchesPhrase(query, category.name)
  ) || null
}

function matchCategoryKeyword(query) {
  for (const category of categories) {
    const keywords = Array.isArray(category.keywords)
      ? category.keywords
      : []

    if (keywords.some((keyword) => matchesPhrase(query, keyword))) {
      return category
    }
  }

  return null
}

function matchSubcategory(query) {
  for (const category of categories) {
    const subcategory = (category.subTypes || []).find((item) =>
      matchesPhrase(query, item)
    )

    if (subcategory) return { category, subcategory }
  }

  return null
}

function matchVendor(query) {
  return vendors.find((vendor) =>
    vendor?.name && matchesPhrase(query, vendor.name)
  ) || null
}

export function findCategoryByKeyword(searchTerm) {
  const query = normalize(searchTerm)

  if (!query || query === 'all') {
    return createResult('all')
  }

  const category = matchCategoryName(query)

  if (category) {
    return createResult('category', { category })
  }

  const keywordCategory = matchCategoryKeyword(query)

  if (keywordCategory) {
    return createResult('category', {
      category: keywordCategory,
    })
  }

  const subcategoryMatch = matchSubcategory(query)

  if (subcategoryMatch) {
    return createResult('subcategory', {
      category: subcategoryMatch.category,
      subcategory: subcategoryMatch.subcategory,
    })
  }

  const vendor = matchVendor(query)

  if (vendor) {
    const vendorCategory = categories.find(
      (item) => normalize(item.name) === normalize(vendor.category)
    )

    return createResult('vendor', {
      category: vendorCategory,
      vendor,
    })
  }

  return createResult('no-results')
}

export default findCategoryByKeyword
