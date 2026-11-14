import { useState } from 'react'
import { calculateBillingComparison } from '../../../utils/saasToolkit'
import ToolkitResult from './ToolkitResult'
import { formatPrice } from '../../comparison/comparison-section/formatPrice'

function AnnualMonthlyTool() {
  const [monthlyRate, setMonthlyRate] = useState('20')
  const [annualRate, setAnnualRate] = useState('16')
  const [seats, setSeats] = useState('5')

  const result = calculateBillingComparison({
    monthlyRate,
    annualRate,
    seats,
  })

  const format = (value) =>
    result ? formatPrice(value, 'USD') : '—'

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Annual vs. monthly billing
      </h3>
      <p className="mt-1 text-xs text-gray-500">
        Compare the yearly cost of monthly billing with an annual plan.
        Enter the per-user monthly-equivalent rates.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="text-xs font-medium text-gray-700">
          Monthly rate / user
          <input
            type="number"
            min="0"
            step="0.01"
            value={monthlyRate}
            onChange={(event) => setMonthlyRate(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs font-medium text-gray-700">
          Annual rate / user / month
          <input
            type="number"
            min="0"
            step="0.01"
            value={annualRate}
            onChange={(event) => setAnnualRate(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </label>

        <label className="col-span-2 text-xs font-medium text-gray-700">
          Number of seats
          <input
            type="number"
            min="1"
            max="10000"
            value={seats}
            onChange={(event) => setSeats(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </label>
      </div>

      {result ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <ToolkitResult
            label="Monthly billing per year"
            value={format(result.monthlyTotal * 12)}
          />
          <ToolkitResult
            label="Annual billing per year"
            value={format(result.annualTotal)}
          />
          <div className="col-span-2">
            <ToolkitResult
              label="Potential annual saving"
              value={format(result.annualSavings)}
              description="Based on the rates entered above."
            />
          </div>
        </div>
      ) : (
        <p className="mt-3 text-xs text-red-600">
          Enter valid non-negative rates and at least one seat.
        </p>
      )}
    </article>
  )
}

export default AnnualMonthlyTool
