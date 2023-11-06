import { Basket } from '@/components/ui/basket/basket'

import styles from './header.module.scss'

import { Logo } from './logo/logo'
import { NavMenu } from './nav-menu/navMenu'
import { NavPanel } from './nav-panel/navPanel'

export class Header {
	private _header = document.createElement('header')
	private _logo = new Logo()
	private _navMenu = new NavMenu()
	private _navPanel = new NavPanel()

	private addStyle() {
		this._header.classList.add(styles.header)
	}

	public draw(basket: Basket) {
		this._header.append(
			this._logo.draw(),
			this._navMenu.draw(),
			this._navPanel.draw(basket, this._navMenu._navMenu)
		)

		this.addStyle()

		return this._header
	}
}
