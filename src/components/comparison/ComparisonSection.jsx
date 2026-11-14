import { useMemo, useState } from 'react'
import ComparisonToolbar from './ComparisonToolbar'
import VendorGrid from './VendorGrid'
import CompareSelectionBar from './CompareSelectionBar'
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
      }),
    [
      vendors,
      selectedCategory,
      selectedSubcategory,
      searchQuery,
      sortBy,
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

        {showComparison ? (
          <div className="min-w-0 overflow-hidden rounded-xl">
            <ComparisonTable
              vendors={selectedVendors}
              features={features}
              onRemoveVendor={removeVendor}
              onBack={closeComparison}
            />
          </div>
        ) : (
          <VendorGrid
            vendors={filteredVendors}
            selectedVendorIds={selectedVendorIds}
            onToggleCompare={toggleVendor}
            onViewDetails={openVendorDetails}
          />
        )}

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

        {selectedVendorIds.length >= maxCompare && !showComparison && (
          <p className="text-center text-sm text-gray-500">
            You've reached the limit of {maxCompare} tools per comparison.
          </p>
        )}
      </div>
    </section>
  )
}

export default ComparisonSection
