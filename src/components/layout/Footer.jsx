import { ArrowUpRight } from 'lucide-react'

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Categories', href: '#categories' },
      { label: 'Compare Tools', href: '#comparison' },
      { label: 'Guides', href: '#guides' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Contact', href: 'mailto:hello@example.com' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
    ],
  },
]

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container mx-auto py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
                S
              </span>

              <span className="text-lg font-bold text-slate-900">
                SaaS<span className="text-indigo-600">Compare</span>
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
              Find and compare software tools to make better decisions
              for your business.
            </p>
          </div>

          {/* Footer links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">
                {group.title}
              </h3>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-indigo-600"
                    >
                      {link.label}
                      <ArrowUpRight size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SaaSCompare. All rights reserved.
          </p>

          <p>Built to make software decisions easier.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
