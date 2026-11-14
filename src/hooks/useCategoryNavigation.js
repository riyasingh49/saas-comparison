
import { useCallback, useMemo, useState } from 'react'

const ALL_CATEGORY_ID = 'all'

function findCategory(categories, categoryId) {
  return (
    categories.find((category) => category.id === categoryId) || null
  )
}

function validateSubcategory(category, subcategory) {
  if (!category || !subcategory) {
    return ''
  }

  return category.subTypes?.includes(subcategory)
    ? subcategory
    : ''
}

function useCategoryNavigation({
  categories = [],
  initialCategoryId = ALL_CATEGORY_ID,
  initialSubcategory = '',
  onCategoryChange,
  onSubcategoryChange,
} = {}) {
  const [navigationState, setNavigationState] = useState(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // When URL-driven parent values change, use those values immediately.
  // Local selections are retained while the external values stay unchanged.
  const initialCategory = findCategory(categories, initialCategoryId)

  const initialSelection = useMemo(
    () => ({
      categoryId: initialCategory?.id || ALL_CATEGORY_ID,
      subcategory: validateSubcategory(
        initialCategory,
        initialSubcategory
      ),
    }),
    [initialCategory, initialSubcategory]
  )

  const isUsingLocalSelection =
    navigationState?.sourceCategoryId === initialCategoryId &&
    navigationState?.sourceSubcategory === initialSubcategory

  const activeCategoryId = isUsingLocalSelection
    ? navigationState.categoryId
    : initialSelection.categoryId

  const selectedCategory = useMemo(
    () => findCategory(categories, activeCategoryId),
    [categories, activeCategoryId]
  )

  const activeSubcategory = isUsingLocalSelection
    ? validateSubcategory(
        selectedCategory,
        navigationState.subcategory
      )
    : initialSelection.subcategory

  const saveLocalSelection = useCallback(
    (categoryId, subcategory) => {
      setNavigationState({
        sourceCategoryId: initialCategoryId,
        sourceSubcategory: initialSubcategory,
        categoryId,
        subcategory,
      })
    },
    [initialCategoryId, initialSubcategory]
  )

  const handleCategorySelect = useCallback(
    (category) => {
      if (category !== null && !findCategory(categories, category?.id)) {
        return
      }

      const nextCategoryId = category?.id || ALL_CATEGORY_ID

      saveLocalSelection(nextCategoryId, '')
      setIsSheetOpen(false)

      // The parent handles resetting its subcategory state.
      onCategoryChange?.(category || null)
    },
    [categories, onCategoryChange, saveLocalSelection]
  )

  const handleSubcategorySelect = useCallback(
    (subcategory) => {
      const nextSubcategory = validateSubcategory(
        selectedCategory,
        subcategory
      )

      saveLocalSelection(activeCategoryId, nextSubcategory)
      onSubcategoryChange?.(nextSubcategory)
    },
    [
      selectedCategory,
      activeCategoryId,
      onSubcategoryChange,
      saveLocalSelection,
    ]
  )

  const openSheet = useCallback(() => {
    setIsSheetOpen(true)
  }, [])

  const closeSheet = useCallback(() => {
    setIsSheetOpen(false)
  }, [])

  return {
    activeCategoryId,
    activeSubcategory,
    selectedCategory,
    isSheetOpen,
    handleCategorySelect,
    handleSubcategorySelect,
    openSheet,
    closeSheet,
  }
}

export default useCategoryNavigation
