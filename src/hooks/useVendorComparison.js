import { useEffect, useMemo, useState } from 'react'
import { MAX_COMPARE } from '../components/comparison/comparison-section/constants'

function useVendorComparison(vendors = [], categoryId = '') {
  const [selectedVendorIds, setSelectedVendorIds] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  const [activeVendor, setActiveVendor] = useState(null)

  const validVendors = useMemo(
    () =>
      Array.isArray(vendors)
        ? vendors.filter((vendor) => vendor?.id && vendor?.name)
        : [],
    [vendors]
  )

  const selectedVendors = useMemo(
    () =>
      selectedVendorIds
        .map((id) => validVendors.find((vendor) => vendor.id === id))
        .filter(Boolean),
    [selectedVendorIds, validVendors]
  )

  useEffect(() => {
    setSelectedVendorIds([])
    setShowComparison(false)
    setActiveVendor(null)
  }, [categoryId])

  useEffect(() => {
    const availableIds = new Set(validVendors.map((vendor) => vendor.id))

    setSelectedVendorIds((current) =>
      current.filter((id) => availableIds.has(id))
    )

    setActiveVendor((current) =>
      current && availableIds.has(current.id) ? current : null
    )
  }, [validVendors])

  useEffect(() => {
    if (selectedVendors.length < 2) {
      setShowComparison(false)
    }
  }, [selectedVendors.length])

  const toggleVendor = (vendor) => {
    if (!vendor?.id || !validVendors.some((item) => item.id === vendor.id)) {
      return
    }

    setSelectedVendorIds((current) => {
      if (current.includes(vendor.id)) {
        return current.filter((id) => id !== vendor.id)
      }

      if (current.length >= MAX_COMPARE) {
        return current
      }

      return [...current, vendor.id]
    })
  }

  const removeVendor = (vendorId) => {
    setSelectedVendorIds((current) =>
      current.filter((id) => id !== vendorId)
    )
  }

  const clearSelection = () => {
    setSelectedVendorIds([])
    setShowComparison(false)
  }

  const openComparison = () => {
    if (selectedVendors.length < 2) {
      return false
    }

    setShowComparison(true)
    setActiveVendor(null)
    return true
  }

  const closeComparison = () => {
    setShowComparison(false)
  }

  const openVendorDetails = (vendor) => {
    if (!vendor?.id || !validVendors.some((item) => item.id === vendor.id)) {
      return
    }

    setActiveVendor(vendor)
  }

  const closeVendorDetails = () => {
    setActiveVendor(null)
  }

  return {
    selectedVendorIds,
    selectedVendors,
    showComparison,
    activeVendor,
    toggleVendor,
    removeVendor,
    clearSelection,
    openComparison,
    closeComparison,
    openVendorDetails,
    closeVendorDetails,
    maxCompare: MAX_COMPARE,
  }
}

export default useVendorComparison
