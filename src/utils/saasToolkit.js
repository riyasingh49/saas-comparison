export function calculateBillingComparison({
    monthlyRate,
    annualRate,
    seats,
  }) {
    const monthly = Number(monthlyRate)
    const annual = Number(annualRate)
    const count = Number(seats)
  
    if (
      !Number.isFinite(monthly) ||
      !Number.isFinite(annual) ||
      !Number.isFinite(count) ||
      monthly < 0 ||
      annual < 0 ||
      count < 1
    ) {
      return null
    }
  
    const monthlyTotal = monthly * count
    const annualTotal = annual * count * 12
  
    return {
      monthlyTotal,
      annualTotal,
      annualSavings: Math.max(0, monthlyTotal * 12 - annualTotal),
      seats: count,
    }
  }
  
  export function calculateUnusedSeatCost({
    paidSeats,
    activeSeats,
    monthlyRate,
  }) {
    const paid = Number(paidSeats)
    const active = Number(activeSeats)
    const rate = Number(monthlyRate)
  
    if (
      !Number.isFinite(paid) ||
      !Number.isFinite(active) ||
      !Number.isFinite(rate) ||
      paid < 1 ||
      active < 0 ||
      rate < 0
    ) {
      return null
    }
  
    const unusedSeats = Math.max(0, paid - active)
    const monthlyWaste = unusedSeats * rate
  
    return {
      unusedSeats,
      monthlyWaste,
      annualWaste: monthlyWaste * 12,
    }
  }
  
  export function calculateRenewalIncrease({
    currentPrice,
    increasePercent,
  }) {
    const current = Number(currentPrice)
    const increase = Number(increasePercent)
  
    if (
      !Number.isFinite(current) ||
      !Number.isFinite(increase) ||
      current < 0 ||
      increase < 0
    ) {
      return null
    }
  
    const increaseAmount = current * (increase / 100)
  
    return {
      currentPrice: current,
      increaseAmount,
      renewalPrice: current + increaseAmount,
      monthlyEquivalent: (current + increaseAmount) / 12,
    }
  }
  