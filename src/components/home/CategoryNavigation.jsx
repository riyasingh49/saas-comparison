import { useEffect, useState } from 'react'
import { LayoutGrid } from 'lucide-react'
import categories from '../../data/categories.json'
import MainCategorySelector from './category-navigation/MainCategorySelector'
import SubcategorySelector from './category-navigation/SubcategorySelector'
import AllCategoriesSheet from './category-navigation/AllCategoriesSheet'

function getValidCategory(categoryId) {
  return categories.find((category) => category.id === categoryId)
}

function getValidSubcategory(category, subcategory) {
  return category?.subTypes?.includes(subcategory) ? subcategory : ''
}

function CategoryNavigation({
  initialCategoryId,
  initialSubcategory = '',
  onCategoryChange,
  onSubcategoryChange,
}) {
  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    return (
      getValidCategory(initialCategoryId)?.id ||
      categories[0]?.id ||
      ''
    )
  })

  const [activeSubType, setActiveSubType] = useState(() => {
    const category =
      getValidCategory(initialCategoryId) || categories[0]

    return getValidSubcategory(category, initialSubcategory)
  })

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const selectedCategory = categories.find(
    (category) => category.id === activeCategoryId
  )

  // Keep the selectors in sync with URL changes, including browser history.
  useEffect(() => {
    const category =
      getValidCategory(initialCategoryId) || categories[0]

    setActiveCategoryId(category?.id || '')
    setActiveSubType(
      getValidSubcategory(category, initialSubcategory)
    )
  }, [initialCategoryId, initialSubcategory])

  const handleCategorySelect = (category) => {
    if (!category?.id || !getValidCategory(category.id)) return

    setActiveCategoryId(category.id)
    setActiveSubType('')
    setIsSheetOpen(false)

    onCategoryChange?.(category)
    onSubcategoryChange?.('')
  }

  const handleSubcategorySelect = (subType) => {
    const nextSubcategory = getValidSubcategory(
      selectedCategory,
      subType
    )

    setActiveSubType(nextSubcategory)
    onSubcategoryChange?.(nextSubcategory)
  }

  return (
    <section
      id="categories"
      className="container mx-auto py-8"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Explore categories
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Find software that fits your needs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSheetOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          aria-haspopup="dialog"
          aria-expanded={isSheetOpen}
        >
          <LayoutGrid size={16} />
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
          activeSubType={activeSubType}
          onSelectSubType={handleSubcategorySelect}
        />
      )}

      <AllCategoriesSheet
        isOpen={isSheetOpen}
        categories={categories}
        onClose={() => setIsSheetOpen(false)}
        onSelectCategory={handleCategorySelect}
      />
    </section>
  )
}

export default CategoryNavigation
