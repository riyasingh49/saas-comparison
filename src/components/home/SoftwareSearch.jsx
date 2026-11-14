
import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { findCategoryByKeyword } from '../../utils/categoryMatcher'

function SoftwareSearch({ onSearchResult }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const searchTerm = query.trim()

    if (!searchTerm) {
      handleClear()
      return
    }

    const result = findCategoryByKeyword(searchTerm)

    onSearchResult?.({
      ...result,
      searchTerm,
    })
  }

  const handleClear = () => {
    setQuery('')

    onSearchResult?.({
      type: 'all',
      category: null,
      subcategory: '',
      vendor: null,
      searchTerm: '',
    })
  }

  return (
    <form
      id="software-search"
      role="search"
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100"
    >
      <Search
        size={20}
        className="ml-2 shrink-0 text-gray-400"
        aria-hidden="true"
      />

      <label htmlFor="software-search-input" className="sr-only">
        Search software categories and vendors
      </label>

      <input
        id="software-search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search CRM, project management, accounting..."
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400"
        autoComplete="off"
        maxLength={100}
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
        >
          <X size={17} aria-hidden="true" />
        </button>
      )}

      <button
        type="submit"
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
      >
        <Search size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  )
}

export default SoftwareSearch
