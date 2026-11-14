import { Search, Sparkles } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CategorySection from '../components/home/CategorySection'
import ComparisonSection from '../components/comparison/ComparisonSection'

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        {/* Main introduction */}
        <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:pt-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl" />

          <div className="container relative mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm">
              <Sparkles size={16} />
              Find the right SaaS tools
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Compare SaaS tools.
              <span className="mt-2 block text-indigo-600">
                Make smarter decisions.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover, compare, and choose the right software for
              your business. Explore features, pricing, and
              alternatives in one place.
            </p>

            {/* Search UI will be connected to the category data later. */}
            <form
              onSubmit={(event) => event.preventDefault()}
              className="mx-auto mt-9 flex max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/50"
            >
              <Search
                className="ml-3 shrink-0 text-slate-400"
                size={21}
              />

              <input
                type="search"
                placeholder="Search SaaS tools or categories..."
                aria-label="Search SaaS tools or categories"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
              />

              <button
                type="submit"
                className="shrink-0 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 sm:px-6"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        <CategorySection />
      </main>

      <Footer />
    </div>
  )
}

export default Home
