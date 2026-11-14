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
  } = useVendorComparison(vendors, selectedCategory?.id || '')

  const filteredVendors = useMemo(
    () =>
      filterAndSortVendors({
        vendors,
        selectedCategory,
        searchQuery,
        sortBy,
      }),
    [vendors, selectedCategory, searchQuery, sortBy]
  )

  const handleClearFilters = () => {
    setSearchQuery('')
    setSortBy('recommended')
  }

  return (
    <section
      id="comparison"
      className="container mx-auto space-y-6 py-10"
    >
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
        <ComparisonTable
          vendors={selectedVendors}
          features={features}
          onRemoveVendor={removeVendor}
          onBack={closeComparison}
        />
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
        <p className="text-center text-sm text-slate-500">
          You've reached the limit of {maxCompare} tools per comparison.
        </p>
      )}
    </section>
  )
}

export default ComparisonSection
