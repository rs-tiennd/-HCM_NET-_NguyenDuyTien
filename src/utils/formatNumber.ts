const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
})

export const toCurrency = (value: number) => formatter.format(value)
