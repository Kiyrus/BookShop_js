export interface IBookData {
	volumeInfo: {
		imageLinks: {
			thumbnail: string
		}
		authors: string[]
		title: string
		averageRating: number
		ratingsCount: number
		description: string
	}
	saleInfo: {
		retailPrice: {
			amount: number
			currencyCode: string
		}
	}
}
