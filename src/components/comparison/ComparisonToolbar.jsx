
import { Search, SlidersHorizontal, X } from 'lucide-react'

function ComparisonToolbar({
  searchQuery = '',
  onSearchChange,
  sortBy = 'recommended',
  onSortChange,
  resultCount,
  onClearFilters,
  hasActiveFilters = false,
}) {
  return (
    <section
      aria-label="Comparison tools"
      className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Compare software
          </h2>

          {typeof resultCount === 'number' && (
            <p
              className="mt-1 text-sm text-slate-500"
              aria-live="polite"
            >
              {resultCount} {resultCount === 1 ? 'tool' : 'tools'} found
            </p>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block min-w-0 sm:w-64">
            <span className="sr-only">Search software in this category</span>

            <Search
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder="Search software..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 transition hover:border-slate-300 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
            <SlidersHorizontal
              size={16}
              aria-hidden="true"
              className="shrink-0 text-slate-500"
            />

            <span className="sr-only">Sort software</span>

            <select
              value={sortBy}
              onChange={(event) => onSortChange?.(event.target.value)}
              className="min-w-0 bg-transparent text-sm text-slate-700 outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </label>

          {hasActiveFilters && onClearFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <X size={16} aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default ComparisonToolbar
