
import { useState } from 'react'

import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SummarySection from '../components/home/SummarySection'
import CategoryNavigation from '../components/home/CategoryNavigation'
import ComparisonSection from '../components/comparison/ComparisonSection'

import vendors from '../data/vendors.json'

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState('')

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSelectedSubcategory('')
  }

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <SummarySection />

        <CategoryNavigation
          onCategoryChange={handleCategoryChange}
          onSubcategoryChange={handleSubcategoryChange}
        />

        <ComparisonSection
          vendors={vendors}
          features={[]}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          title="Explore and compare software"
        />
      </main>

      <Footer />
    </div>
  )
}

export default Home
