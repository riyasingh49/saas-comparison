function formatComparisonCurrency(value, currency) {
    if (
      value === null ||
      value === undefined ||
      !Number.isFinite(value) ||
      !currency
    ) {
      return 'Not listed'
    }
  
    try {
      return new Intl.NumberFormat(
        currency === 'INR' ? 'en-IN' : 'en-US',
        {
          style: 'currency',
          currency,
          maximumFractionDigits: 2,
        }
      ).format(value)
    } catch {
      return `${currency} ${value.toLocaleString()}`
    }
  }
  
  export default formatComparisonCurrency
  