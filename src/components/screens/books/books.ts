import { Basket } from '@/components/ui/basket/basket'

import styles from './books.module.scss'

import { Slider } from '../../ui/slider/slider'

import { BookItem } from './book-item/bookItem'
import { Categories } from './categories/categories'

export class Books {
	private _home = document.createElement('main')
	private _slider = new Slider()
	private _categories = new Categories()
	private _bookItem = new BookItem(this._categories)

	private addStyle() {
		this._home.classList.add(styles.main)
	}

	public draw(basket: Basket) {
		const mainWrapper = document.createElement('section')
		const sliderWrapper = document.createElement('div')
		const promoWrapper = document.createElement('div')
		const promoText = ['Change old book on new', 'top 100 books 2022']

		promoText.forEach(promo => {
			const linkEl = document.createElement('a')
			const promoItem = document.createElement('div')
			const arrow = document.createElement('img')
			const imgProps = [
				['src', '/public/arrow-long.svg'],
				['alt', 'arrow']
			]

			for (const [attr, val] of imgProps) {
				arrow.setAttribute(attr, val)
			}
			linkEl.href = '#'

			promoItem.append(promo, arrow)
			linkEl.append(promoItem)
			promoWrapper.append(linkEl)
		})

		sliderWrapper.append(this._slider.draw(), promoWrapper)
		mainWrapper.append(
			this._categories.draw(this._bookItem, basket),
			this._bookItem.draw(basket)
		)
		this._home.append(sliderWrapper, mainWrapper)

		this.addStyle()

		return this._home
	}
}
