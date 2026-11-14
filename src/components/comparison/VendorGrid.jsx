import VendorCard from './VendorCard'

function VendorGrid({
  vendors = [],
  selectedVendorIds = [],
  onToggleCompare,
  onViewDetails,
  emptyMessage = 'No software found. Try changing your search or filters.',
}) {
  // Ignore incomplete records so one bad item doesn't break the grid.
  const validVendors = vendors.filter(
    (vendor) => vendor && vendor.id && vendor.name
  )

  if (validVendors.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
        <h3 className="font-semibold text-slate-800">
          No results found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <section aria-label="Software results">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
    </section>
  )
}

export default VendorGrid
