import { Basket } from '@/components/ui/basket/basket'

import styles from './categories.module.scss'

import { BookItem } from '../book-item/bookItem'

export class Categories {
	public _categoriesWrapper = document.createElement('nav')

	private _categories = ['Architecture']

	private addStyle() {
		this._categoriesWrapper.classList.add(styles.categories)
	}

	public get getCategories() {
		return this._categories
	}

	private handleClick(el: string, bookItem: BookItem, basket: Basket) {
		if (this._categories[0] === el) return

		this._categories.pop()
		this._categories.push(el)

		bookItem.loadingWrapper.innerHTML = ''
		bookItem.wrapperLoadBtn.innerHTML = ''
		bookItem.bookItem.innerHTML = ''
		bookItem.draw(basket)

		this._categoriesWrapper.innerHTML = ''
		this.draw(bookItem, basket)

		const btnEls = this._categoriesWrapper.querySelectorAll('button')

		btnEls.forEach(btnEl => {
			btnEl.disabled = true

			const timeId = setTimeout(() => {
				btnEl.disabled = false

				clearTimeout(timeId)
			}, 700)
		})
	}

	public draw(bookItem: BookItem, basket: Basket) {
		const categoriesEls = [
			'Architecture',
			'Art & Fashion',
			'Biography',
			'Business',
			'Crafts & Hobbies',
			'Drama',
			'Food & Drink',
			'Health & Wellbeing',
			'History & Politics',
			'Humor',
			'Poetry',
			'Psychology',
			'Science',
			'Technology',
			'Travel & Maps'
		]
		const ulEl = document.createElement('ul')

		categoriesEls.forEach(el => {
			const liEl = document.createElement('li')
			const btnEl = document.createElement('button')

			this._categories[0] === el && liEl.classList.add(styles.active)

			btnEl.onclick = () => this.handleClick(el, bookItem, basket)

			btnEl.append(el)
			liEl.append(btnEl)
			ulEl.append(liEl)
		})

		this._categoriesWrapper.append(ulEl)

		this.addStyle()

		return this._categoriesWrapper
	}
}
