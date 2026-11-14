import categories from '../data/categories.json'
import vendors from '../data/vendors.json'

function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

function matchesPhrase(query, phrase) {
  const normalizedPhrase = normalize(phrase)

  if (!query || !normalizedPhrase) {
    return false
  }

  const escapedPhrase = normalizedPhrase.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )

  const pattern = new RegExp(
    `(^|[^a-z0-9])${escapedPhrase}($|[^a-z0-9])`,
    'i'
  )

  return pattern.test(query)
}

function createResult(type, options = {}) {
  return {
    type,
    category: options.category || null,
    subcategory: options.subcategory || '',
    vendor: options.vendor || null,
  }
}

function findCategoryByName(query) {
  return categories.find((category) =>
    matchesPhrase(query, category.name)
  ) || null
}

function findSubcategory(query) {
  for (const category of categories) {
    const subcategory = (category.subTypes || []).find((item) =>
      matchesPhrase(query, item)
    )

    if (subcategory) {
      return { category, subcategory }
    }
  }

  return null
}

function findVendor(query) {
  return vendors.find((vendor) =>
    matchesPhrase(query, vendor.name)
  ) || null
}

function findCategoryByKeyword(query) {
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

export function findCategoryByKeyword(searchTerm) {
  const query = normalize(searchTerm)

  if (!query || query === 'all') {
    return createResult('all')
  }

  // Prefer exact category matches.
  const category = findCategoryByName(query)

  if (category) {
    return createResult('category', { category })
  }

  // Match assessment-defined subcategories.
  const subcategoryMatch = findSubcategory(query)

  if (subcategoryMatch) {
    return createResult('subcategory', {
      category: subcategoryMatch.category,
      subcategory: subcategoryMatch.subcategory,
    })
  }

  // Match a listed software vendor.
  const vendor = findVendor(query)

  if (vendor) {
    const vendorCategory = categories.find(
      (item) => normalize(item.name) === normalize(vendor.category)
    )

    return createResult('vendor', {
      category: vendorCategory,
      vendor,
    })
  }

  // Match assessment-defined category search keywords.
  const keywordCategory = findCategoryByKeyword(query)

  if (keywordCategory) {
    return createResult('category', {
      category: keywordCategory,
    })
  }

  return createResult('no-results')
}

export default findCategoryByKeyword
