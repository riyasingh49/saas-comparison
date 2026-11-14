import { useCallback, useEffect, useMemo, useState } from 'react'

const ALL_CATEGORY_ID = 'all'

function findCategory(categories, categoryId) {
  return categories.find((category) => category.id === categoryId) || null
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
  const [activeCategoryId, setActiveCategoryId] = useState(
    () => findCategory(categories, initialCategoryId)?.id || ALL_CATEGORY_ID
  )

  const [activeSubcategory, setActiveSubcategory] = useState(() => {
    const category = findCategory(categories, initialCategoryId)
    return validateSubcategory(category, initialSubcategory)
  })

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const selectedCategory = useMemo(
    () => findCategory(categories, activeCategoryId),
    [categories, activeCategoryId]
  )

  // Keep the local selection aligned with URL-driven parent state.
  useEffect(() => {
    const category = findCategory(categories, initialCategoryId)

    setActiveCategoryId(category?.id || ALL_CATEGORY_ID)
    setActiveSubcategory(
      validateSubcategory(category, initialSubcategory)
    )
  }, [categories, initialCategoryId, initialSubcategory])

  const handleCategorySelect = useCallback(
    (category) => {
      if (category !== null && !findCategory(categories, category?.id)) {
        return
      }

      setActiveCategoryId(category?.id || ALL_CATEGORY_ID)
      setActiveSubcategory('')
      setIsSheetOpen(false)

      // The parent handles resetting its subcategory state.
      onCategoryChange?.(category || null)
    },
    [categories, onCategoryChange]
  )

  const handleSubcategorySelect = useCallback(
    (subcategory) => {
      const nextSubcategory = validateSubcategory(
        selectedCategory,
        subcategory
      )

      setActiveSubcategory(nextSubcategory)
      onSubcategoryChange?.(nextSubcategory)
    },
    [selectedCategory, onSubcategoryChange]
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
