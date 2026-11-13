
import { ArrowUpRight, Layers } from 'lucide-react'

function CategoryCard({ category, onSelect }) {
  if (!category || !category.id || !category.name) {
    return null
  }

  const vendors = Array.isArray(category.vendors)
    ? category.vendors
    : []

  const subTypes = Array.isArray(category.subTypes)
    ? category.subTypes
    : []

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/50 sm:p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Layers size={21} />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-900">
        {category.name}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Compare {vendors.length} {vendors.length === 1 ? 'vendor' : 'vendors'}
        {' '}and explore {subTypes.length} {subTypes.length === 1 ? 'option' : 'options'}.
      </p>

      {vendors.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Popular tools
          </p>

          <div className="flex flex-wrap gap-2">
            {vendors.slice(0, 3).map((vendor) => (
              <span
                key={vendor}
                className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600"
              >
                {vendor}
              </span>
            ))}

            {vendors.length > 3 && (
              <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-500">
                +{vendors.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => onSelect?.(category)}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Explore category
          <ArrowUpRight
            size={17}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </article>
  )
}

export default CategoryCard
