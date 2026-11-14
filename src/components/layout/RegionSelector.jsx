import { Globe } from 'lucide-react'

const regions = [
  { value: 'US', label: 'United States', currency: 'USD' },
  { value: 'IN', label: 'India', currency: 'INR' },
]

function RegionSelector({ region = 'US', onChange }) {
  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Pricing region</legend>

      <Globe
        size={17}
        className="shrink-0 text-gray-500"
        aria-hidden="true"
      />

      <label htmlFor="pricing-region" className="sr-only">
        Choose pricing region
      </label>

      <select
        id="pricing-region"
        value={region}
        onChange={(event) => onChange?.(event.target.value)}
        className="min-h-10 max-w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs font-medium text-gray-700 outline-none transition hover:border-gray-400 focus-visible:ring-2 focus-visible:ring-gray-400 sm:text-sm"
      >
        {regions.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label} ({item.currency})
          </option>
        ))}
      </select>
    </fieldset>
  )
}

export default RegionSelector
