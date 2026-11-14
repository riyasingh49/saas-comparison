function normalize(value) {
    return String(value || '').trim().toLowerCase()
  }
  
  function getVendorSubcategories(vendor) {
    if (Array.isArray(vendor?.subcategoryAssignments)) {
      return vendor.subcategoryAssignments
        .map((assignment) => assignment?.name)
        .filter(Boolean)
    }
  
    return Array.isArray(vendor?.subcategories)
      ? vendor.subcategories.filter(Boolean)
      : []
  }
  
  function filterAndSortVendors({
    vendors = [],
    selectedCategory = null,
    selectedSubcategory = '',
    searchQuery = '',
    sortBy = 'recommended',
  } = {}) {
    if (!Array.isArray(vendors)) {
      return []
    }
  
    const categoryName = normalize(selectedCategory?.name)
    const subcategoryName = normalize(selectedSubcategory)
    const query = normalize(searchQuery)
  
    let results = vendors.filter((vendor) => {
      if (!vendor?.id || !vendor?.name) {
        return false
      }
  
      if (
        categoryName &&
        normalize(vendor.category) !== categoryName
      ) {
        return false
      }
  
      if (subcategoryName) {
        const vendorSubcategories = getVendorSubcategories(vendor)
  
        const matchesSubcategory = vendorSubcategories.some(
          (subcategory) => normalize(subcategory) === subcategoryName
        )
  
        if (!matchesSubcategory) {
          return false
        }
      }
  
      if (!query) {
        return true
      }
  
      const searchableText = [
        vendor.name,
        vendor.description,
        vendor.category,
        ...getVendorSubcategories(vendor),
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
  
  export { filterAndSortVendors }