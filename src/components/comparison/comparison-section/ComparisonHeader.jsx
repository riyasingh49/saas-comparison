import { ArrowRight, Layers3 } from 'lucide-react'

function ComparisonHeader({
  title = 'Explore and compare software',
  selectedCategory = null,
  selectedSubcategory = '',
}) {
  const categoryName = selectedCategory?.name || ''

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
          <Layers3 size={18} aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
            {title}
          </h2>

          {(categoryName || selectedSubcategory) && (
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
              <span>{categoryName || 'All categories'}</span>

              {selectedSubcategory && (
                <>
                  <ArrowRight
                    size={13}
                    className="text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="font-medium text-gray-700">
                    {selectedSubcategory}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {!selectedCategory && !selectedSubcategory && (
        <p className="text-sm leading-6 text-gray-500">
          Browse available software and compare tools side by side.
        </p>
      )}
    </div>
  )
}

export default ComparisonHeader
