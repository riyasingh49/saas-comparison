import { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SummarySection from '../components/home/SummarySection'
import CategoryNavigation from '../components/home/CategoryNavigation'
import SoftwareSearch from '../components/home/SoftwareSearch'
import ComparisonSection from '../components/comparison/ComparisonSection'

import vendors from '../data/vendors.json'
import categories from '../data/categories.json'
import comparisonFeatures from '../data/comparison-features.json'

function getPageState() {
  const params = new URLSearchParams(window.location.search)
  const categoryId = params.get('category')
  const subcategory = params.get('subcategory') || ''

  const category = categories.find(
    (item) => item.id === categoryId
  )

  return {
    category: category || null,
    subcategory:
      category?.subTypes?.includes(subcategory) ? subcategory : '',
  }
}

function Home() {
  const [pageState, setPageState] = useState(getPageState)

  const updateUrl = useCallback((category, subcategory = '') => {
    const params = new URLSearchParams()

    if (category?.id) {
      params.set('category', category.id)
    }

    if (subcategory) {
      params.set('subcategory', subcategory)
    }

    const queryString = params.toString()
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname

    window.history.pushState({}, '', newUrl)
  }, [])

  const handleCategoryChange = (category) => {
    setPageState({
      category,
      subcategory: '',
    })

    updateUrl(category)
  }

  const handleSubcategoryChange = (subcategory) => {
    setPageState((current) => {
      const nextState = {
        ...current,
        subcategory,
      }

      updateUrl(nextState.category, subcategory)

      return nextState
    })
  }

  const handleSearchResult = (result) => {
    const category = result?.category || null
    const subcategory = result?.subcategory || ''

    setPageState({
      category,
      subcategory,
    })

    updateUrl(category, subcategory)
  }

  useEffect(() => {
    const handlePopState = () => {
      setPageState(getPageState())
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <SummarySection />

        <div className="container mx-auto pt-6">
          <SoftwareSearch onSearchResult={handleSearchResult} />
        </div>

        <CategoryNavigation
          key={pageState.category?.id || 'all-categories'}
          initialCategoryId={pageState.category?.id}
          initialSubcategory={pageState.subcategory}
          onCategoryChange={handleCategoryChange}
          onSubcategoryChange={handleSubcategoryChange}
        />

        <ComparisonSection
          vendors={vendors}
          features={comparisonFeatures}
          selectedCategory={pageState.category}
          selectedSubcategory={pageState.subcategory}
          title="Explore and compare software"
        />
      </main>

      <Footer />
    </div>
  )
}

export default Home
