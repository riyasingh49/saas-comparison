import { useMemo, useState } from 'react'
import { MAX_COMPARE } from '../components/comparison/comparison-section/constants'

function useVendorComparison(vendors = [], categoryId = '') {
  const [comparisonState, setComparisonState] = useState({
    categoryId,
    selectedVendorIds: [],
    showComparison: false,
    activeVendorId: null,
  })

  const validVendors = useMemo(
    () =>
      Array.isArray(vendors)
        ? vendors.filter((vendor) => vendor?.id && vendor?.name)
        : [],
    [vendors]
  )

  const isCurrentCategory = comparisonState.categoryId === categoryId

  const availableIds = useMemo(
    () => new Set(validVendors.map((vendor) => vendor.id)),
    [validVendors]
  )

  const selectedVendorIds = useMemo(() => {
    const storedIds = isCurrentCategory
      ? comparisonState.selectedVendorIds
      : []

    return storedIds.filter((id) => availableIds.has(id))
  }, [
    isCurrentCategory,
    comparisonState.selectedVendorIds,
    availableIds,
  ])

  const selectedVendors = useMemo(
    () =>
      selectedVendorIds
        .map((id) => validVendors.find((vendor) => vendor.id === id))
        .filter(Boolean),
    [selectedVendorIds, validVendors]
  )

  const activeVendor = useMemo(() => {
    if (!isCurrentCategory || !comparisonState.activeVendorId) {
      return null
    }

    return (
      validVendors.find(
        (vendor) => vendor.id === comparisonState.activeVendorId
      ) || null
    )
  }, [
    isCurrentCategory,
    comparisonState.activeVendorId,
    validVendors,
  ])

  const showComparison =
    isCurrentCategory &&
    comparisonState.showComparison &&
    selectedVendors.length >= 2

  const updateCurrentCategory = (updater) => {
    setComparisonState((current) => {
      const currentState =
        current.categoryId === categoryId
          ? current
          : {
              categoryId,
              selectedVendorIds: [],
              showComparison: false,
              activeVendorId: null,
            }

      return updater(currentState)
    })
  }

  const toggleVendor = (vendor) => {
    if (!vendor?.id || !availableIds.has(vendor.id)) {
      return
    }

    updateCurrentCategory((current) => {
      const selectedIds = current.selectedVendorIds.filter(
        (id) => availableIds.has(id)
      )

      if (selectedIds.includes(vendor.id)) {
        return {
          ...current,
          selectedVendorIds: selectedIds.filter(
            (id) => id !== vendor.id
          ),
          showComparison: false,
        }
      }

      if (selectedIds.length >= MAX_COMPARE) {
        return current
      }

      return {
        ...current,
        selectedVendorIds: [...selectedIds, vendor.id],
      }
    })
  }

  const removeVendor = (vendorId) => {
    updateCurrentCategory((current) => {
      const selectedIds = current.selectedVendorIds.filter(
        (id) => availableIds.has(id) && id !== vendorId
      )

      return {
        ...current,
        selectedVendorIds: selectedIds,
        showComparison:
          current.showComparison && selectedIds.length >= 2,
      }
    })
  }

  const clearSelection = () => {
    updateCurrentCategory((current) => ({
      ...current,
      selectedVendorIds: [],
      showComparison: false,
    }))
  }

  const openComparison = () => {
    if (selectedVendors.length < 2) {
      return false
    }

    updateCurrentCategory((current) => ({
      ...current,
      showComparison: true,
      activeVendorId: null,
    }))

    return true
  }

  const closeComparison = () => {
    updateCurrentCategory((current) => ({
      ...current,
      showComparison: false,
    }))
  }

  const openVendorDetails = (vendor) => {
    if (!vendor?.id || !availableIds.has(vendor.id)) {
      return
    }

    updateCurrentCategory((current) => ({
      ...current,
      activeVendorId: vendor.id,
    }))
  }

  const closeVendorDetails = () => {
    updateCurrentCategory((current) => ({
      ...current,
      activeVendorId: null,
    }))
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
