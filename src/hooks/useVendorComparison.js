import { useEffect, useMemo, useState } from 'react'
import { MAX_COMPARE } from '../components/comparison/comparison-section/constants'

function useVendorComparison(vendors = [], categoryId = '') {
  const [selectedVendorIds, setSelectedVendorIds] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  const [activeVendor, setActiveVendor] = useState(null)

  const validVendors = useMemo(
    () =>
      Array.isArray(vendors)
        ? vendors.filter(
            (vendor) => vendor?.id && vendor?.name
          )
        : [],
    [vendors]
  )

  const selectedVendors = useMemo(
    () =>
      selectedVendorIds
        .map((id) =>
          validVendors.find((vendor) => vendor.id === id)
        )
        .filter(Boolean),
    [selectedVendorIds, validVendors]
  )

  useEffect(() => {
    setSelectedVendorIds([])
    setShowComparison(false)
    setActiveVendor(null)
  }, [categoryId])

  const toggleVendor = (vendor) => {
    if (!vendor?.id) return

    setSelectedVendorIds((current) => {
      if (current.includes(vendor.id)) {
        const updated = current.filter((id) => id !== vendor.id)

        if (updated.length < 2) {
          setShowComparison(false)
        }

        return updated
      }

      if (current.length >= MAX_COMPARE) return current

      return [...current, vendor.id]
    })
  }

  const removeVendor = (vendorId) => {
    setSelectedVendorIds((current) => {
      const updated = current.filter((id) => id !== vendorId)

      if (updated.length < 2) {
        setShowComparison(false)
      }

      return updated
    })
  }

  const clearSelection = () => {
    setSelectedVendorIds([])
    setShowComparison(false)
  }

  const openComparison = () => {
    if (selectedVendors.length < 2) return false

    setShowComparison(true)
    setActiveVendor(null)

    return true
  }

  const closeComparison = () => {
    setShowComparison(false)
  }

  const openVendorDetails = (vendor) => {
    if (!vendor?.id) return
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
