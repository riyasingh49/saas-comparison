import { ExternalLink, Check } from 'lucide-react'

function VendorCard({
  vendor,
  isSelected = false,
  onToggleCompare,
  onViewDetails,
}) {
  if (!vendor || !vendor.id || !vendor.name) {
    return null
  }

  const handleCompare = () => {
    onToggleCompare?.(vendor)
  }

  const handleViewDetails = () => {
    onViewDetails?.(vendor)
  }

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-white p-5 transition ${
        isSelected
          ? 'border-indigo-400 ring-2 ring-indigo-100'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
            {vendor.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              {vendor.name}
            </h3>

            {vendor.category && (
              <p className="mt-1 text-xs text-slate-500">
                {vendor.category}
              </p>
            )}
          </div>
        </div>

        {isSelected && (
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white"
            aria-label="Selected for comparison"
          >
            <Check size={14} />
          </span>
        )}
      </div>

      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
        {vendor.description || 'Explore this software to learn more about its features and pricing.'}
      </p>

      {vendor.startingPrice && (
        <p className="mt-4 text-sm font-semibold text-slate-900">
          {vendor.startingPrice}
          <span className="ml-1 font-normal text-slate-500">
            starting price
          </span>
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={handleCompare}
          aria-pressed={isSelected}
          className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            isSelected
              ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isSelected ? 'Remove from compare' : 'Add to compare'}
        </button>

        {onViewDetails && (
          <button
            type="button"
            onClick={handleViewDetails}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Details
          </button>
        )}

        {vendor.website && (
          <a
            href={vendor.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${vendor.name} website`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </article>
  )
}

export default VendorCard
