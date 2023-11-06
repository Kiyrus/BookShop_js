import styles from './layout.module.scss'

import { Basket } from '../ui/basket/basket'

import { Header } from './header/header'

export class Layout {
	private _layout = document.createElement('section')
	private _header = new Header()

	private addStyle() {
		this._layout.classList.add(styles.layout)
	}

	public draw(basket: Basket, children: HTMLElement) {
		this._layout.append(this._header.draw(basket), children)

		this.addStyle()

		return this._layout
	}
}
