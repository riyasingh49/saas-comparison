export function formatPrice(amount, currency = 'USD') {
    if (amount === null || amount === undefined || amount === '') {
      return 'Not listed'
    }
  
    const numericAmount = Number(amount)
  
    if (!Number.isFinite(numericAmount) || numericAmount < 0) {
      return 'Not listed'
    }
  
    try {
      const locale = currency.toUpperCase() === 'INR' ? 'en-IN' : 'en-US'
  
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(numericAmount)
    } catch {
      return `${currency.toUpperCase()} ${numericAmount.toLocaleString()}`
    }
  }
  
  export function formatBillingPeriod(period) {
    if (!period || typeof period !== 'string') {
      return ''
    }
  
    const normalizedPeriod = period.trim().toLowerCase()
  
    const labels = {
      monthly: 'per month',
      annually: 'per year',
      annual: 'per year',
      yearly: 'per year',
      quarterly: 'per quarter',
      weekly: 'per week',
      one_time: 'one-time payment',
      'one-time': 'one-time payment',
    }
  
    return labels[normalizedPeriod] || period.trim()
  }
  