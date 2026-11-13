function Skeleton({ className = '' }) {
    return (
      <div
        className={`animate-pulse rounded-xl bg-slate-200/70 ${className}`}
      />
    )
  }
  
  function PageLoader() {
    return (
      <main className="min-h-screen bg-slate-50">
        {/* Navbar placeholder */}
        <header className="border-b border-slate-200 bg-white">
          <div className="container flex h-16 items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="hidden items-center gap-6 md:flex">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </header>
  
        <div className="container py-10">
          {/* Hero placeholder */}
          <section className="mx-auto max-w-3xl space-y-4 text-center">
            <Skeleton className="mx-auto h-7 w-36 rounded-full" />
            <Skeleton className="mx-auto h-10 w-3/4 max-w-xl" />
            <Skeleton className="mx-auto h-5 w-full max-w-lg" />
            <Skeleton className="mx-auto h-5 w-2/3 max-w-md" />
            <Skeleton className="mx-auto mt-6 h-12 w-48 rounded-lg" />
          </section>
  
          {/* Category cards */}
          <section className="mt-16">
            <Skeleton className="mb-6 h-7 w-48" />
  
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-11 w-11 rounded-xl" />
                    <Skeleton className="h-5 w-16" />
                  </div>
  
                  <Skeleton className="mt-5 h-5 w-2/3" />
                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-4/5" />
  
                  <div className="mt-6 flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-24 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </section>
  
          {/* Comparison section placeholder */}
          <section className="mt-14">
            <Skeleton className="mb-6 h-7 w-56" />
  
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5">
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }
  
  export default PageLoader
  