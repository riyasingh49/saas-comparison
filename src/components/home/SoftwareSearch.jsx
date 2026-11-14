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
      searchTerm: '',
    })
  }

  return (
    <form
      id="software-search"
      role="search"
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100"
    >
      <Search
        size={20}
        className="ml-2 shrink-0 text-slate-400"
        aria-hidden="true"
      />

      <label htmlFor="software-search-input" className="sr-only">
        Search software categories
      </label>

      <input
        id="software-search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search CRM, project management, accounting..."
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
        autoComplete="off"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <X size={17} />
        </button>
      )}

      <button
        type="submit"
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        <Search size={16} />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  )
}

export default SoftwareSearch
