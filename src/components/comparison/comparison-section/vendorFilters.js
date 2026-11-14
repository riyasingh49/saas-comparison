function normalize(value) {
    return String(value || '').trim().toLowerCase()
  }
  
  export function filterAndSortVendors({
    vendors = [],
    selectedCategory = null,
    searchQuery = '',
    sortBy = 'recommended',
  } = {}) {
    if (!Array.isArray(vendors)) return []
  
    const categoryName = normalize(selectedCategory?.name)
    const query = normalize(searchQuery)
  
    let results = vendors.filter((vendor) => {
      if (!vendor?.id || !vendor?.name) return false
  
      if (
        categoryName &&
        normalize(vendor.category) !== categoryName
      ) {
        return false
      }
  
      if (!query) return true
  
      const searchableText = [
        vendor.name,
        vendor.description,
        vendor.category,
      ]
        .filter(Boolean)
        .map(normalize)
        .join(' ')
  
      return searchableText.includes(query)
    })
  
    if (sortBy === 'name-asc') {
      results = [...results].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    }
  
    if (sortBy === 'name-desc') {
      results = [...results].sort((a, b) =>
        b.name.localeCompare(a.name)
      )
    }
  
    return results
  }
  
  export default filterAndSortVendors
  