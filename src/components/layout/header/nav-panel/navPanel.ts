import { Auth } from '@/components/ui/auth/auth'
import { Basket } from '@/components/ui/basket/basket'
import { Search } from '@/components/ui/search/search'

import styles from './navPanel.module.scss'

import { BurgerMenu } from '../burger-menu/burgerMenu'

export class NavPanel {
	private _navPanel = document.createElement('div')
	private _auth = new Auth()
	private _search = new Search()
	private _burger = new BurgerMenu()

	private addStyle() {
		this._navPanel.classList.add(styles.nav_panel)
	}

	public draw(basket: Basket, navMenu: HTMLElement) {
		const navPanelWrapper = document.createElement('div')

		navPanelWrapper.append(
			this._auth.draw(),
			this._search.draw(),
			basket.draw()
		)

		this._navPanel.append(navPanelWrapper, this._burger.draw(navMenu))

		this.addStyle()

		return this._navPanel
	}
}
