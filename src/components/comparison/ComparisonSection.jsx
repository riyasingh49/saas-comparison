import { useMemo, useState } from 'react'
import ComparisonToolbar from './ComparisonToolbar'
import VendorGrid from './VendorGrid'
import CompareSelectionBar from './CompareSelectionBar'
import CompareSelectionPanel from './CompareSelectionPanel'
import ComparisonTable from './ComparisonTable'
import VendorDetailsSheet from './VendorDetailsSheet'
import ComparisonHeader from './comparison-section/ComparisonHeader'
import { filterAndSortVendors } from './comparison-section/vendorFilters'
import useVendorComparison from '../../hooks/useVendorComparison'

function ComparisonSection({
  vendors = [],
  features = [],
  title = 'Explore and compare software',
  selectedCategory = null,
  selectedSubcategory = '',
  recommendedVendorIds = [],
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recommended')

  const {
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
    maxCompare,
  } = useVendorComparison(
    vendors,
    `${selectedCategory?.id || 'all'}:${selectedSubcategory || 'all'}`
  )

  const filteredVendors = useMemo(
    () =>
      filterAndSortVendors({
        vendors,
        selectedCategory,
        selectedSubcategory,
        searchQuery,
        sortBy,
        recommendedVendorIds,
      }),
    [
      vendors,
      selectedCategory,
      selectedSubcategory,
      searchQuery,
      sortBy,
      recommendedVendorIds,
    ]
  )

  const handleClearFilters = () => {
    setSearchQuery('')
    setSortBy('recommended')
  }

  return (
    <section
      id="comparison"
      className="w-full py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <ComparisonHeader
          title={title}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
        />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 space-y-6 lg:col-span-8">
            <ComparisonToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={filteredVendors.length}
              hasActiveFilters={
                Boolean(searchQuery.trim()) ||
                sortBy !== 'recommended'
              }
              onClearFilters={handleClearFilters}
            />

            <VendorGrid
              vendors={filteredVendors}
              selectedVendorIds={selectedVendorIds}
              onToggleCompare={toggleVendor}
              onViewDetails={openVendorDetails}
            />

            {showComparison && (
              <div
                id="vendor-comparison-results"
                className="min-w-0 scroll-mt-24"
                aria-label="Selected software comparison"
              >
                <ComparisonTable
                  vendors={selectedVendors}
                  features={features}
                  onRemoveVendor={removeVendor}
                  onBack={closeComparison}
                />
              </div>
            )}
          </div>

          <div className="hidden min-w-0 lg:col-span-4 lg:block">
            <CompareSelectionPanel
              selectedVendors={selectedVendors}
              maxSelection={maxCompare}
              showComparison={showComparison}
              onRemoveVendor={removeVendor}
              onClearSelection={clearSelection}
              onOpenComparison={openComparison}
              onCloseComparison={closeComparison}
            />
          </div>
        </div>

        {!showComparison && (
          <CompareSelectionBar
            selectedVendors={selectedVendors}
            onOpenComparison={openComparison}
            onClearSelection={clearSelection}
            maxSelection={maxCompare}
          />
        )}

        <VendorDetailsSheet
          vendor={activeVendor}
          isOpen={Boolean(activeVendor)}
          onClose={closeVendorDetails}
          onToggleCompare={toggleVendor}
          isSelected={selectedVendorIds.includes(activeVendor?.id)}
        />

        <p className="text-center text-xs leading-5 text-gray-500">
          SaaS Compare is an independent research tool, not a reseller.
          Prices are list prices from the recorded sources, may change,
          and can exclude taxes, onboarding, add-ons, or usage charges.
        </p>
      </div>
    </section>
  )
}

export default ComparisonSection