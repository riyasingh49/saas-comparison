import { useMemo, useState } from 'react'
import ComparisonToolbar from './ComparisonToolbar'
import VendorGrid from '../home/VendorGrid'
import CompareSelectionBar from './CompareSelectionBar'
import ComparisonTable from './ComparisonTable'
import VendorDetailsSheet from './VendorDetailsSheet'

const MAX_COMPARE = 4

function ComparisonSection({
  vendors = [],
  features = [],
  title = 'Explore and compare software',
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recommended')
  const [selectedVendorIds, setSelectedVendorIds] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  const [activeVendor, setActiveVendor] = useState(null)

  // Keep only valid vendor records.
  const validVendors = useMemo(
    () =>
      vendors.filter(
        (vendor) => vendor && vendor.id && vendor.name
      ),
    [vendors]
  )

  const selectedVendors = useMemo(
    () =>
      selectedVendorIds
        .map((id) => validVendors.find((vendor) => vendor.id === id))
        .filter(Boolean),
    [selectedVendorIds, validVendors]
  )

  const filteredVendors = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    const results = validVendors.filter((vendor) => {
      if (!query) return true

      const searchableText = [
        vendor.name,
        vendor.description,
        vendor.category,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchableText.includes(query)
    })

    if (sortBy === 'name-asc') {
      results.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (sortBy === 'name-desc') {
      results.sort((a, b) => b.name.localeCompare(a.name))
    }

    return results
  }, [validVendors, searchQuery, sortBy])

  const handleToggleCompare = (vendor) => {
    if (!vendor?.id) return

    setSelectedVendorIds((current) => {
      if (current.includes(vendor.id)) {
        const updated = current.filter((id) => id !== vendor.id)

        if (updated.length < 2) {
          setShowComparison(false)
        }

        return updated
      }

      if (current.length >= MAX_COMPARE) {
        return current
      }

      return [...current, vendor.id]
    })
  }

  const handleRemoveVendor = (vendorId) => {
    setSelectedVendorIds((current) => {
      const updated = current.filter((id) => id !== vendorId)

      if (updated.length < 2) {
        setShowComparison(false)
      }

      return updated
    })
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSortBy('recommended')
  }

  const handleClearSelection = () => {
    setSelectedVendorIds([])
    setShowComparison(false)
  }

  const handleOpenComparison = () => {
    if (selectedVendors.length >= 2) {
      setShowComparison(true)
      setActiveVendor(null)
    }
  }

  return (
    <section
      id="software-comparison"
      className="container mx-auto space-y-6 py-10"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
          Find software that fits your needs and compare its features side by side.
        </p>
      </div>

      <ComparisonToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultCount={filteredVendors.length}
        hasActiveFilters={Boolean(searchQuery.trim()) || sortBy !== 'recommended'}
        onClearFilters={handleClearFilters}
      />

      {showComparison ? (
        <ComparisonTable
          vendors={selectedVendors}
          features={features}
          onRemoveVendor={handleRemoveVendor}
          onBack={() => setShowComparison(false)}
        />
      ) : (
        <VendorGrid
          vendors={filteredVendors}
          selectedVendorIds={selectedVendorIds}
          onToggleCompare={handleToggleCompare}
          onViewDetails={setActiveVendor}
        />
      )}

      {!showComparison && (
        <CompareSelectionBar
          selectedVendors={selectedVendors}
          onOpenComparison={handleOpenComparison}
          onClearSelection={handleClearSelection}
          maxSelection={MAX_COMPARE}
        />
      )}

      <VendorDetailsSheet
        vendor={activeVendor}
        isOpen={Boolean(activeVendor)}
        onClose={() => setActiveVendor(null)}
        onToggleCompare={handleToggleCompare}
        isSelected={selectedVendorIds.includes(activeVendor?.id)}
      />

      {selectedVendorIds.length >= MAX_COMPARE && !showComparison && (
        <p className="text-center text-sm text-slate-500">
          You've reached the limit of {MAX_COMPARE} tools per comparison.
        </p>
      )}
    </section>
  )
}

export default ComparisonSection
