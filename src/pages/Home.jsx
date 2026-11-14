
import { useState } from 'react'

import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SummarySection from '../components/home/SummarySection'
import SoftwareSearch from '../components/home/SoftwareSearch'
import CategoryNavigation from '../components/home/CategoryNavigation'
import SoftwareCostCalculator from '../components/home/SoftwareCostCalculator'
import DecisionSupport from '../components/home/DecisionSupport'
import PricingExplainer from '../components/home/PricingExplainer'
import ComparisonSection from '../components/comparison/ComparisonSection'

import useHomePage from '../hooks/useHomePage'

import vendors from '../data/vendors.json'
import categories from '../data/categories.json'
import comparisonFeatures from '../data/comparison-features.json'

function Home() {
  const [recommendedVendorIds, setRecommendedVendorIds] = useState([])

  const {
    pageState,
    visibleVendors,
    summaryContent,
    pricingRange,
    handleCategoryChange,
    handleSubcategoryChange,
    handleSearchResult,
  } = useHomePage(categories, vendors)

  const resetRecommendations = () => {
    setRecommendedVendorIds([])
  }

  const handleCategorySelection = (category) => {
    resetRecommendations()
    handleCategoryChange(category)
  }

  const handleSubcategorySelection = (subcategory) => {
    resetRecommendations()
    handleSubcategoryChange(subcategory)
  }

  const handleSearchSelection = (result) => {
    resetRecommendations()
    handleSearchResult(result)
  }

  const handleRecommendationsChange = (vendorIds) => {
    setRecommendedVendorIds(
      Array.isArray(vendorIds) ? vendorIds : []
    )
  }

  const summarySources = visibleVendors
    .flatMap((vendor) => vendor.sources || [])
    .filter(
      (source) =>
        source?.status === 'verified' &&
        source?.url &&
        source?.checkedAt
    )
    .slice(0, 5)

  const checkedDates = summarySources
    .map((source) => source.checkedAt)
    .filter(Boolean)

  return (
    <div id="top" className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        <SummarySection
          title={summaryContent.title}
          summary={summaryContent.summary}
          details={summaryContent.details}
          pricingRange={pricingRange}
          sources={summarySources}
          dateChecked={checkedDates[0] || ''}
        />

        <div className="container mx-auto px-4 pt-6">
          <SoftwareSearch
            key={pageState.searchTerm}
            initialQuery={pageState.searchTerm}
            onSearchResult={handleSearchSelection}
          />
        </div>

        <div id="categories" className="scroll-mt-24">
          <CategoryNavigation
            initialCategoryId={pageState.category?.id || 'all'}
            initialSubcategory={pageState.subcategory}
            onCategoryChange={handleCategorySelection}
            onSubcategoryChange={handleSubcategorySelection}
          />
        </div>

        <SoftwareCostCalculator
          vendors={visibleVendors}
          region={pageState.region}
        />

        <PricingExplainer />

        <DecisionSupport
          categoryName={
            pageState.category?.name || 'business software'
          }
          vendors={visibleVendors}
          region={pageState.region}
          onRecommendationsChange={handleRecommendationsChange}
        />

        <ComparisonSection
          vendors={visibleVendors}
          features={comparisonFeatures}
          selectedCategory={pageState.category}
          selectedSubcategory={pageState.subcategory}
          recommendedVendorIds={recommendedVendorIds}
          title="Explore and compare software"
        />
      </main>

      <Footer />
    </div>
  )
}

export default Home
