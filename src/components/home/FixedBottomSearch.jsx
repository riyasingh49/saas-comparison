import SoftwareSearch from './SoftwareSearch'

function FixedBottomSearch({
  initialQuery = '',
  placeholder,
  onSearchResult,
}) {
  return (
    <div
      className="fixed-search-dock"
      role="region"
      aria-label="Search software"
    >
      <div className="fixed-search-dock__inner">
        <SoftwareSearch
          initialQuery={initialQuery}
          placeholder={placeholder}
          onSearchResult={onSearchResult}
          formId="fixed-software-search-form"
          inputId="fixed-software-search-input"
        />
      </div>
    </div>
  )
}

export default FixedBottomSearch
