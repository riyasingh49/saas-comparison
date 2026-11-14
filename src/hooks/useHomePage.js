import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  filterVisibleVendors,
  getPageState,
  getPricingRange,
  getSummaryContent,
  updatePageUrl,
} from '../utils/homePageHelpers'

function useHomePage(categories = [], vendors = []) {
  const [pageState, setPageState] = useState(() =>
    getPageState(categories, vendors)
  )

  const pageStateRef = useRef(pageState)

  const applyPageState = useCallback((nextState) => {
    pageStateRef.current = nextState
    setPageState(nextState)
    updatePageUrl(nextState)
  }, [])

  const handleCategoryChange = useCallback(
    (category) => {
      const nextState = {
        ...pageStateRef.current,
        category: category || null,
        subcategory: '',
        searchTerm: '',
        searchType: '',
        vendor: null,
      }

      applyPageState(nextState)
    },
    [applyPageState]
  )

  const handleSubcategoryChange = useCallback(
    (subcategory) => {
      const nextState = {
        ...pageStateRef.current,
        subcategory: subcategory || '',
        searchTerm: '',
        searchType: '',
        vendor: null,
      }

      applyPageState(nextState)
    },
    [applyPageState]
  )

  const handleSearchResult = useCallback(
    (result) => {
      const nextState = {
        ...pageStateRef.current,
        category: result?.category || null,
        subcategory: result?.subcategory || '',
        searchTerm: result?.searchTerm || '',
        searchType: result?.type || '',
        vendor: result?.vendor || null,
      }

      applyPageState(nextState)
    },
    [applyPageState]
  )

  const handleRegionChange = useCallback(
    (region) => {
      if (region !== 'US' && region !== 'IN') {
        return
      }

      const nextState = {
        ...pageStateRef.current,
        region,
      }

      applyPageState(nextState)
    },
    [applyPageState]
  )

  const visibleVendors = useMemo(
    () => filterVisibleVendors(vendors, pageState),
    [vendors, pageState]
  )

  const summaryContent = useMemo(
    () => getSummaryContent(pageState, visibleVendors),
    [pageState, visibleVendors]
  )

  const pricingRange = useMemo(
    () => getPricingRange(visibleVendors, pageState.region),
    [visibleVendors, pageState.region]
  )

  useEffect(() => {
    const handlePopState = () => {
      const nextState = getPageState(categories, vendors)

      pageStateRef.current = nextState
      setPageState(nextState)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [categories, vendors])

  return {
    pageState,
    visibleVendors,
    summaryContent,
    pricingRange,
    handleCategoryChange,
    handleSubcategoryChange,
    handleSearchResult,
    handleRegionChange,
  }
}

export default useHomePage
