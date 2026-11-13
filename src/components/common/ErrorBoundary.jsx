import { Component } from 'react'

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Something went wrong
            </h1>

            <p className="mt-3 text-slate-600">
              We couldn't load this page. Please try again.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-700"
            >
              Reload page
            </button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
