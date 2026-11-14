
import { ArrowUpRight, Layers3, Mail } from 'lucide-react'

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'All categories', href: '#categories' },
      { label: 'Compare software', href: '#comparison' },
      { label: 'Search tools', href: '#software-search' },
    ],
  },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-gray-900"
              aria-label="Back to SaaS Compare homepage"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
                <Layers3 size={19} />
              </span>

              <span className="text-lg font-bold tracking-tight">
                SaaS Compare
              </span>
            </a>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Find, explore, and compare software tools to make more
              informed decisions for your business.
            </p>

            <a
              href="mailto:hello@example.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-black"
            >
              <Mail size={16} />
              Contact us
              <ArrowUpRight size={14} />
            </a>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-gray-900">
                {group.title}
              </h2>

              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              About
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Our goal is to make software research simpler with
              organized categories and side-by-side comparisons.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} SaaS Compare. All rights reserved.</p>

          <a
            href="#top"
            className="w-fit font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
