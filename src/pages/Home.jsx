
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
  const {
    pageState,
    visibleVendors,
    summaryContent,
    pricingRange,
    handleCategoryChange,
    handleSubcategoryChange,
    handleSearchResult,
  } = useHomePage(categories, vendors)

  const summarySources = visibleVendors.flatMap((vendor) => vendor.sources || []).slice(0, 5)
  const checkedDates = summarySources.map((source) => source.checkedAt).filter(Boolean)

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
          <SoftwareSearch key={pageState.searchTerm} initialQuery={pageState.searchTerm} onSearchResult={handleSearchResult} />
        </div>

        <div id="categories" className="scroll-mt-24">
          <CategoryNavigation
            initialCategoryId={pageState.category?.id || 'all'}
            initialSubcategory={pageState.subcategory}
            onCategoryChange={handleCategoryChange}
            onSubcategoryChange={handleSubcategoryChange}
          />
        </div>

        <SoftwareCostCalculator vendors={visibleVendors} />

        <PricingExplainer />

        <ComparisonSection
          vendors={visibleVendors}
          features={comparisonFeatures}
          selectedCategory={pageState.category}
          selectedSubcategory={pageState.subcategory}
          title="Explore and compare software"
        />

        <DecisionSupport categoryName={pageState.category?.name || 'business software'} />
      </main>

      <Footer />
    </div>
  )
}

export default Home
