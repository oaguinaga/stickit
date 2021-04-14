export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }

  // check if its a clear dollar amount
  if (amount % 100 === 0) options.minimumFractionDigits = 0

  const formater = Intl.NumberFormat('en-MX', options)

  return formater.format(amount / 100)
}
