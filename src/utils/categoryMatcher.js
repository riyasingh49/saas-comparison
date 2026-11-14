import categories from '../data/categories.json'

function normalizeKeyword(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

function matchesPhrase(query, keyword) {
  const escapedKeyword = keyword.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )

  const pattern = new RegExp(
    `(^|[^a-z0-9])${escapedKeyword}($|[^a-z0-9])`,
    'i'
  )

  return pattern.test(query)
}

export function findCategoryByKeyword(searchTerm) {
  const query = normalizeKeyword(searchTerm)

  if (!query || query === 'saas') {
    return {
      type: 'all',
      category: null,
      subcategory: '',
    }
  }

  for (const category of categories) {
    const subTypes = Array.isArray(category.subTypes)
      ? category.subTypes
      : []

    const matchedSubcategory = subTypes.find((subType) =>
      matchesPhrase(query, normalizeKeyword(subType))
    )

    if (matchedSubcategory) {
      return {
        type: 'subcategory',
        category,
        subcategory: matchedSubcategory,
      }
    }

    const keywords = Array.isArray(category.keywords)
      ? category.keywords.map(normalizeKeyword).filter(Boolean)
      : []

    const matchedKeyword = keywords.find((keyword) =>
      matchesPhrase(query, keyword)
    )

    if (matchedKeyword) {
      return {
        type: 'category',
        category,
        subcategory: '',
        matchedKeyword,
      }
    }
  }

  return {
    type: 'all',
    category: null,
    subcategory: '',
  }
}

export default findCategoryByKeyword
