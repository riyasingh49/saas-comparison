import { SearchX } from 'lucide-react'
import VendorCard from './VendorCard'

function VendorGrid({
  vendors = [],
  selectedVendorIds = [],
  onToggleCompare,
  onViewDetails,
}) {
  const validVendors = Array.isArray(vendors)
    ? vendors.filter((vendor) => vendor?.id && vendor?.name)
    : []

  if (validVendors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <SearchX size={22} aria-hidden="true" />
        </span>

        <h3 className="mt-4 text-base font-semibold text-gray-900">
          No software found
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
          No matching software is available for this selection. Try changing
          your search or choosing another category.
        </p>
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Available software vendors"
    >
      {validVendors.map((vendor) => (
        <VendorCard
          key={vendor.id}
          vendor={vendor}
          isSelected={selectedVendorIds.includes(vendor.id)}
          onToggleCompare={onToggleCompare}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  )
}

export default VendorGrid
