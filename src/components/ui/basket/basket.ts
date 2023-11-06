import { IBookData } from '@/components/screens/books/book-item/bookItem.interface'

import styles from './basket.module.scss'

export class Basket {
	private _basket = document.createElement('button')
	private _amountWrapperCircle = document.createElement('div')
	private _booksBasket: IBookData[] = []

	private addStyle() {
		this._basket.classList.add(styles.basket)
	}

	public draw() {
		if (localStorage.getItem('basket')) {
			this._booksBasket = [
				...JSON.parse(localStorage.getItem('basket') as string)
			]
		}

		this._booksBasket.length &&
			((this._amountWrapperCircle.innerText = `${this._booksBasket.length}`),
			this._basket.append(this._amountWrapperCircle))

		this._basket.disabled = true

		this.addStyle()

		return this._basket
	}
}
