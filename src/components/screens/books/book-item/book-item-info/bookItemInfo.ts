import { Basket } from '@/components/ui/basket/basket'
import { Button } from '@/components/ui/button/button'

import { formatToCurrency } from '@/utils/format/format.to-currency'

import styles from './bookItemInfo.module.scss'

import { IBookData } from '../bookItem.interface'
import { SvgStar } from '../svgStar'

export class BookItemInfo {
	private _bookItemInfo = document.createElement('div')

	private addStyle() {
		this._bookItemInfo.classList.add(styles.book_item_info)
	}

	public draw(bookItem: IBookData, booksBasket: IBookData[], basket: Basket) {
		const authorWrapper = document.createElement('p')
		const title = document.createElement('h2')
		const rating = document.createElement('div')
		const description = document.createElement('p')
		const price = document.createElement('p')

		bookItem.volumeInfo.authors
			? bookItem.volumeInfo.authors.forEach((author, index) => {
					index === 0
						? authorWrapper.append(author)
						: authorWrapper.append(`, ${author}`)
			  })
			: authorWrapper.append('Author unknown')

		title.append(bookItem.volumeInfo.title)

		if (bookItem.volumeInfo.averageRating && bookItem.volumeInfo.ratingsCount) {
			rating.append(new SvgStar().draw(bookItem.volumeInfo.averageRating))
			const ratingText = document.createElement('span')

			ratingText.append(`${bookItem.volumeInfo.ratingsCount} review`)
			rating.append(ratingText)
		}

		description.append(bookItem.volumeInfo.description)

		bookItem.saleInfo.retailPrice &&
			price.append(`${formatToCurrency(bookItem.saleInfo.retailPrice.amount)}`)

		let _isBookToBasket = false

		booksBasket.find(book => {
			if (
				bookItem.volumeInfo.title === book.volumeInfo.title &&
				bookItem.volumeInfo.description === book.volumeInfo.description
			) {
				_isBookToBasket = true
			}
		})

		this._bookItemInfo.append(
			authorWrapper,
			title,
			bookItem.volumeInfo.averageRating && bookItem.volumeInfo.ratingsCount
				? rating
				: '',
			bookItem.volumeInfo.description ? description : '',
			bookItem.saleInfo.retailPrice ? price : '',
			!_isBookToBasket
				? new Button().draw('buy now', null, bookItem, basket)
				: new Button().draw('in the cart', null, bookItem, basket)
		)

		this.addStyle()

		return this._bookItemInfo
	}
}
