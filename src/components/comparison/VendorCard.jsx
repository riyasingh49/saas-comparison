
import { ExternalLink, Info, Plus, Check } from 'lucide-react'

function VendorCard({
  vendor,
  isSelected = false,
  onToggleCompare,
  onViewDetails,
}) {
  if (!vendor?.id || !vendor?.name) {
    return null
  }

  const website = vendor.website || vendor.url || ''

  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words text-base font-semibold text-gray-900">
            {vendor.name}
          </h3>

          {vendor.category && (
            <p className="mt-1 text-xs font-medium text-gray-500">
              {vendor.category}
            </p>
          )}
        </div>

        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-700">
          {vendor.name.charAt(0).toUpperCase()}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-600">
        {vendor.description || 'Vendor information is not available yet.'}
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {vendor.startingPrice && <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">From {vendor.startingPrice}</span>}
        {vendor.features?.freePlan === true && <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">Free plan</span>}
        {vendor.pricing?.freeTrial === true && <span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700">Free trial</span>}
      </div>

      {vendor.subcategories?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {vendor.subcategories.slice(0, 3).map((subcategory) => (
            <span
              key={subcategory}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
            >
              {subcategory}
            </span>
          ))}

          {vendor.subcategories.length > 3 && (
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
              +{vendor.subcategories.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={() => onToggleCompare?.(vendor)}
          aria-pressed={isSelected}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
            isSelected
              ? 'bg-gray-900 text-white hover:bg-gray-700'
              : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-200'
          }`}
        >
          {isSelected ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Plus size={16} aria-hidden="true" />
          )}
          {isSelected ? 'Added to compare' : 'Add to compare'}
        </button>

        <button
          type="button"
          onClick={() => onViewDetails?.(vendor)}
          aria-label={`View details for ${vendor.name}`}
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 p-2.5 text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-200 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
        >
          <Info size={17} aria-hidden="true" />
        </button>

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${vendor.name} website`}
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 p-2.5 text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-200 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
          >
            <ExternalLink size={17} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

export default VendorCard
