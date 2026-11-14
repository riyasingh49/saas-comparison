function ComparisonHeader({
    title = 'Explore and compare software',
    selectedCategory = null,
    selectedSubcategory = '',
  }) {
    const heading = selectedCategory?.name
      ? `${selectedCategory.name} software`
      : title
  
    const description = selectedSubcategory
      ? `Explore ${selectedSubcategory.toLowerCase()} options and compare available tools.`
      : 'Find software that fits your needs and compare its features side by side.'
  
    return (
      <header>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {heading}
        </h2>
  
        <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
          {description}
        </p>
      </header>
    )
  }
  
  export default ComparisonHeader
  