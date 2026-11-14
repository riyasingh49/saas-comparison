import { useState } from 'react'
import { Menu, X, Search, ChevronDown } from 'lucide-react'

const navigationLinks = [
  { label: 'Categories', href: '#categories' },
  { label: 'Compare Tools', href: '#comparison' },
  { label: 'Guides', href: '#guides' },
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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <nav
        className="container mx-auto flex h-16 items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        <a
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="SaaS Compare home"
          onClick={closeMenu}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
            S
          </span>

          <span className="text-lg font-bold tracking-tight text-slate-900">
            SaaS<span className="text-indigo-600">Compare</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
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
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Search size={19} />
          </button>

          <a
            href="#comparison"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Explore tools
            <ChevronDown size={15} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden"
        >
          <div className="container mx-auto flex flex-col gap-1">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              onClick={focusSearch}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Search size={17} />
              Search software
            </button>

            <a
              href="#comparison"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Explore tools
              <ChevronDown size={15} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
