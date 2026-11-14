
import { Search, X } from 'lucide-react'
import { SORT_OPTIONS } from './comparison-section/constants'

function ComparisonToolbar({
  searchQuery = '',
  onSearchChange,
  sortBy = 'recommended',
  onSortChange,
  resultCount = 0,
  hasActiveFilters = false,
  onClearFilters,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative min-w-0 flex-1 sm:max-w-md">
        <label htmlFor="vendor-search" className="sr-only">
          Search software vendors
        </label>

        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />

        <input
          id="vendor-search"
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder="Search software vendors..."
          maxLength={100}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-100"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor="vendor-sort"
          className="text-sm font-medium text-gray-600"
        >
          Sort by
        </label>

        <select
          id="vendor-sort"
          value={sortBy}
          onChange={(event) => onSortChange?.(event.target.value)}
          className="min-w-36 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-colors hover:border-gray-400 hover:bg-gray-100 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span
          className="text-sm text-gray-500"
          aria-live="polite"
          aria-atomic="true"
        >
          {resultCount} {resultCount === 1 ? 'result' : 'results'}
        </span>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            <X size={15} aria-hidden="true" />
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

export default ComparisonToolbar
