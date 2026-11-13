import { lazy, Suspense } from 'react'
import ErrorBoundary from './components/common/ErrorBoundary'
import PageLoader from './components/common/PageLoader'

const Home = lazy(() => import('./pages/Home'))

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Home />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
