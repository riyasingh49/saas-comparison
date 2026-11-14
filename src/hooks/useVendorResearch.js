import { useMemo, useState } from 'react'

function useVendorResearch(vendors = []) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeVendorId, setActiveVendorId] = useState('')

  const validVendors = useMemo(
    () =>
      Array.isArray(vendors)
        ? vendors.filter((vendor) => vendor?.id && vendor?.name)
        : [],
    [vendors]
  )

  const filteredVendors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) return validVendors

    return validVendors.filter((vendor) => {
      const searchableValues = [
        vendor.name,
        vendor.category,
        vendor.description,
        vendor.website,
        ...(vendor.subcategories || []),
        ...(vendor.sources || []).map((source) => source.label)
      ]

      return searchableValues
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(normalizedQuery)
        )
    })
  }, [query, validVendors])

  const activeVendor = validVendors.find(
    (vendor) => vendor.id === activeVendorId
  ) || null

  const openPanel = () => {
    setIsOpen(true)
    setQuery('')
    setActiveVendorId('')
  }

  const closePanel = () => {
    setIsOpen(false)
    setQuery('')
    setActiveVendorId('')
  }

  return {
    isOpen,
    query,
    setQuery,
    filteredVendors,
    activeVendor,
    activeVendorId,
    setActiveVendorId,
    openPanel,
    closePanel
  }
}

export default useVendorResearch
