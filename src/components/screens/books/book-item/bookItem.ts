import { Basket } from '@/components/ui/basket/basket'
import { Button } from '@/components/ui/button/button'

import BookService from '@/services/book/book.service'

import styles from './bookItem.module.scss'

import { Categories } from '../categories/categories'

import { BookItemInfo } from './book-item-info/bookItemInfo'
import { IBookData } from './bookItem.interface'

export class BookItem {
	public wrapperLoadBtn = document.createElement('div')
	public bookItem = document.createElement('div')
	public loadingWrapper = document.createElement('div')

	private _categories: Categories
	private _booksBasket: IBookData[] = []
	private _startIndexRequest = 0
	private _basket: Basket | undefined

	constructor(categories: Categories) {
		this._categories = categories
	}

	private addStyle() {
		this.bookItem.classList.add(styles.book_item)
	}

	private get getBasket() {
		return this._basket
	}

	private set getBasket(basket) {
		this._basket = basket
	}

	private handleIncreaseMaxResult = () => {
		const nextStartIndexRequest = 7
		const loadBtn = this.wrapperLoadBtn.querySelector('button')

		this._startIndexRequest += nextStartIndexRequest

		loadBtn && this.wrapperLoadBtn.removeChild(loadBtn!)
		this.draw(this.getBasket!)
	}

	private async getBooks(
		categories: string[],
		onSuccess: (data: IBookData[]) => void,
		onLoading: (isLoading: boolean) => void
	) {
		let isLoading = false

		try {
			isLoading = true
			onLoading(isLoading)

			const { data } = await BookService.getBookAll(
				categories[0],
				this._startIndexRequest
			)

			data && onSuccess(data.items)
		} catch (error) {
			console.log(error)
		} finally {
			isLoading = false
			onLoading(isLoading)
		}
	}

	public draw(basket: Basket) {
		this.getBasket = basket

		if (localStorage.getItem('basket')) {
			this._booksBasket = [
				...JSON.parse(localStorage.getItem('basket') as string)
			]
		}

		this.getBooks(
			this._categories.getCategories,
			(data: IBookData[]) => {
				data.forEach(bookItem => {
					const itemWrapper = document.createElement('div')
					const imgEl = document.createElement('img')
					const infoWrapper = new BookItemInfo().draw(
						bookItem,
						this._booksBasket,
						basket
					)

					const imgAttr = [
						[
							'src',
							bookItem.volumeInfo.imageLinks
								? bookItem.volumeInfo.imageLinks.thumbnail
								: ''
						],
						['alt', 'book image']
					]

					for (const [attr, val] of imgAttr) {
						imgEl.setAttribute(attr, val)
					}

					itemWrapper.append(imgEl, infoWrapper)
					this.bookItem.append(itemWrapper)
				})

				this.wrapperLoadBtn.append(
					new Button().draw('load more', this.handleIncreaseMaxResult)
				)

				this.bookItem.append(this.wrapperLoadBtn)
			},
			(isLoading: boolean) => {
				if (isLoading) {
					this.loadingWrapper.innerText = 'Loading...'
					this.bookItem.append(this.loadingWrapper)
				} else {
					this.bookItem.removeChild(this.loadingWrapper)
				}
			}
		)

		this.addStyle()

		return this.bookItem
	}
}
