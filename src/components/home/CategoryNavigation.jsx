import { LayoutGrid } from 'lucide-react'
import categories from '../../data/categories.json'
import MainCategorySelector from './category-navigation/MainCategorySelector'
import SubcategorySelector from './category-navigation/SubcategorySelector'
import AllCategoriesSheet from './category-navigation/AllCategoriesSheet'
import useCategoryNavigation from '../../hooks/useCategoryNavigation'

function CategoryNavigation({
  initialCategoryId = 'all',
  initialSubcategory = '',
  onCategoryChange,
  onSubcategoryChange,
}) {
  const {
    activeCategoryId,
    activeSubcategory,
    selectedCategory,
    isSheetOpen,
    handleCategorySelect,
    handleSubcategorySelect,
    openSheet,
    closeSheet,
  } = useCategoryNavigation({
    categories,
    initialCategoryId,
    initialSubcategory,
    onCategoryChange,
    onSubcategoryChange,
  })

  return (
    <section
      id="categories"
      className="container mx-auto px-4 py-8"
      aria-labelledby="category-navigation-heading"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2
            id="category-navigation-heading"
            className="text-lg font-semibold text-slate-900 sm:text-xl"
          >
            Explore categories
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Find software that fits your needs.
          </p>
        </div>

        <button
          type="button"
          onClick={openSheet}
          aria-haspopup="dialog"
          aria-expanded={isSheetOpen}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        >
          <LayoutGrid size={16} aria-hidden="true" />
          <span className="hidden sm:inline">All categories</span>
          <span className="sm:hidden">View all</span>
        </button>
      </div>

      <MainCategorySelector
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={handleCategorySelect}
      />

      {selectedCategory && (
        <SubcategorySelector
          categoryName={selectedCategory.name}
          subTypes={selectedCategory.subTypes}
          activeSubType={activeSubcategory}
          onSelectSubType={handleSubcategorySelect}
        />
      )}

      <AllCategoriesSheet
        isOpen={isSheetOpen}
        categories={categories}
        onClose={closeSheet}
        onSelectCategory={handleCategorySelect}
      />
    </section>
  )
}

export default CategoryNavigation
