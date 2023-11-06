import { IBookData } from '@/components/screens/books/book-item/bookItem.interface'

import styles from './button.module.scss'

import { Basket } from '../basket/basket'

export class Button {
	private _button = document.createElement('button')
	private _booksBasket: IBookData[] = []

	private addStyle() {
		this._button.classList.add(styles.button)
	}

	private parseOfLocalStorage() {
		if (localStorage.getItem('basket')) {
			this._booksBasket = [
				...JSON.parse(localStorage.getItem('basket') as string)
			]
		}
	}

	private handleClickAddBasket(bookItem: IBookData, basket: Basket) {
		this.parseOfLocalStorage()

		this._booksBasket.push(bookItem!)

		localStorage.setItem('basket', JSON.stringify(this._booksBasket))

		this._button.innerHTML = ''
		this.draw('in the cart', null, bookItem, basket)
		basket.draw()
	}

	public handleClickRemoveBasket(bookItem: IBookData, basket: Basket) {
		this.parseOfLocalStorage()

		const updateBooksBasket = this._booksBasket.filter(book => {
			if (
				!(
					book.volumeInfo.title === bookItem.volumeInfo.title &&
					book.volumeInfo.description === bookItem.volumeInfo.description
				)
			) {
				return book
			}
		})

		localStorage.setItem('basket', JSON.stringify(updateBooksBasket))

		this._button.innerHTML = ''
		this.draw('buy now', null, bookItem, basket)

		basket.draw().innerHTML = ''
		basket.draw()
	}

	public draw(
		children: string,
		handleIncreaseMaxResult: (() => void) | null,
		bookItem?: IBookData,
		basket?: Basket
	) {
		this._button.append(children)

		this.addStyle()

		children === 'load more' &&
			(this._button.onclick = () => handleIncreaseMaxResult!())

		children === 'buy now' &&
			((this._button.onclick = () =>
				this.handleClickAddBasket(bookItem!, basket!)),
			this._button.classList.remove(styles.basket))

		children === 'in the cart' &&
			((this._button.onclick = () =>
				this.handleClickRemoveBasket(bookItem!, basket!)),
			this._button.classList.add(styles.basket))

		return this._button
	}
}
