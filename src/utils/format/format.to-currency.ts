export const formatToCurrency = (number: number) => {
	return new Intl.NumberFormat('ru-RU', {
		currency: 'RUB',
		style: 'currency'
	}).format(number)
}
