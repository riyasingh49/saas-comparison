import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  filterVisibleVendors,
  getPageState,
  getSummaryContent,
  updatePageUrl,
} from '../utils/homePageHelpers'

function useHomePage(categories = [], vendors = []) {
  const [pageState, setPageState] = useState(() =>
    getPageState(categories, vendors)
  )

  // Keep the latest state available to handlers called back-to-back.
  const pageStateRef = useRef(pageState)

  const applyPageState = useCallback((nextState) => {
    pageStateRef.current = nextState
    setPageState(nextState)
    updatePageUrl(nextState)
  }, [])

  const handleCategoryChange = useCallback((category) => {
    const nextState = {
      ...pageStateRef.current,
      category: category || null,
      subcategory: '',
      searchTerm: '',
      searchType: '',
      vendor: null,
    }

    applyPageState(nextState)
  }, [applyPageState])

  const handleSubcategoryChange = useCallback((subcategory) => {
    const nextState = {
      ...pageStateRef.current,
      subcategory: subcategory || '',
      searchTerm: '',
      searchType: '',
      vendor: null,
    }

    applyPageState(nextState)
  }, [applyPageState])

  const handleSearchResult = useCallback((result) => {
    const nextState = {
      category: result?.category || null,
      subcategory: result?.subcategory || '',
      searchTerm: result?.searchTerm || '',
      searchType: result?.type || '',
      vendor: result?.vendor || null,
    }

    applyPageState(nextState)
  }, [applyPageState])

  const visibleVendors = useMemo(
    () => filterVisibleVendors(vendors, pageState),
    [vendors, pageState]
  )

  const summaryContent = useMemo(
    () => getSummaryContent(pageState, visibleVendors),
    [pageState, visibleVendors]
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
    handleCategoryChange,
    handleSubcategoryChange,
    handleSearchResult,
  }
}

export default useHomePage
