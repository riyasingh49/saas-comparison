import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SummarySection from '../components/home/SummarySection'
import CategoryNavigation from '../components/home/CategoryNavigation'
import ComparisonSection from '../components/comparison/ComparisonSection'

import vendors from '../data/vendors.json'

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <SummarySection />

        <CategoryNavigation />

        <ComparisonSection
          vendors={vendors}
          features={[]}
          title="Explore and compare software"
        />
      </main>

      <Footer />
    </div>
  )
}

export default Home
