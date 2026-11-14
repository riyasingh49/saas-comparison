
import { useState } from 'react'
import { Menu, X, Search, ArrowRight } from 'lucide-react'

const navigationLinks = [
  { label: 'Categories', href: '#categories' },
  { label: 'Compare Tools', href: '#comparison' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const focusSearch = () => {
    closeMenu()

    document.getElementById('software-search')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })

    window.setTimeout(() => {
      document.getElementById('software-search-input')?.focus()
    }, 350)
  }

  const exploreButtonClass =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-whites shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav
        className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="SaaS Compare home"
          onClick={closeMenu}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-lg font-bold text-gray-800">
            S
          </span>

          <span className="text-lg font-bold tracking-tight text-gray-900">
            SaaSCompare
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-4"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={focusSearch}
            aria-label="Focus software search"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            <Search size={19} />
          </button>

          <a href="#comparison" className={exploreButtonClass}>
            Explore Tools
            <ArrowRight size={17} strokeWidth={2.5} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-gray-200 bg-white px-4 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 sm:px-2">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-950"
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              onClick={focusSearch}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-50"
            >
              <Search size={17} />
              Search software
            </button>

            <a
              href="#comparison"
              onClick={closeMenu}
              className={`${exploreButtonClass} mt-2 w-full`}
            >
              Explore Tools
              <ArrowRight size={17} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
