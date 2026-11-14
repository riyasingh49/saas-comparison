import { useState } from 'react'
import { calculateUnusedSeatCost } from '../../../utils/saasToolkit'
import { formatPrice } from '../../comparison/comparison-section/formatPrice'
import ToolkitResult from './ToolkitResult'

function UnusedSeatsTool() {
  const [paidSeats, setPaidSeats] = useState('10')
  const [activeSeats, setActiveSeats] = useState('7')
  const [monthlyRate, setMonthlyRate] = useState('20')

  const result = calculateUnusedSeatCost({
    paidSeats,
    activeSeats,
    monthlyRate,
  })

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Unused-seat cost calculator
      </h3>
      <p className="mt-1 text-xs text-gray-500">
        Estimate what inactive seats cost your team.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="text-xs font-medium text-gray-700">
          Paid seats
          <input
            type="number"
            min="1"
            value={paidSeats}
            onChange={(event) => setPaidSeats(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs font-medium text-gray-700">
          Active seats
          <input
            type="number"
            min="0"
            value={activeSeats}
            onChange={(event) => setActiveSeats(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </label>

        <label className="col-span-2 text-xs font-medium text-gray-700">
          Monthly cost per seat (USD)
          <input
            type="number"
            min="0"
            step="0.01"
            value={monthlyRate}
            onChange={(event) => setMonthlyRate(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </label>
      </div>

      {result ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <ToolkitResult
            label="Unused seats"
            value={result.unusedSeats}
          />
          <ToolkitResult
            label="Monthly unused-seat cost"
            value={formatPrice(result.monthlyWaste, 'USD')}
          />
          <div className="col-span-2">
            <ToolkitResult
              label="Potential annual waste"
              value={formatPrice(result.annualWaste, 'USD')}
            />
          </div>
        </div>
      ) : (
        <p className="mt-3 text-xs text-red-600">
          Enter valid seat counts and a non-negative price.
        </p>
      )}
    </article>
  )
}

export default UnusedSeatsTool
