import categories from '../../data/categories.json'
import CategoryCard from './CategoryCard'

function CategorySection({ onSelectCategory }) {
  const validCategories = Array.isArray(categories)
    ? categories.filter(
        (category) =>
          category &&
          typeof category.id === 'string' &&
          typeof category.name === 'string'
      )
    : []

  return (
    <section className="container mx-auto pb-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-indigo-600">
            EXPLORE SOFTWARE
          </p>

          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Browse by category
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Find the right tools for the way you work.
          </p>
        </div>

        <span className="text-sm text-slate-500">
          {validCategories.length} categories
        </span>
      </div>

      {validCategories.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {validCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center">
          <h3 className="font-semibold text-slate-800">
            No categories available
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Please check the category data and try again.
          </p>
        </div>
      )}
    </section>
  )
}

export default CategorySection
