import styles from './navMenu.module.scss'

export class NavMenu {
	public _navMenu = document.createElement('nav')

	private addStyle() {
		this._navMenu.classList.add(styles.nav_panel)
	}

	public draw() {
		const Els = ['books', 'audiobooks', 'Stationery & gifts', 'blog']
		const ulEl = document.createElement('ul')

		for (const El of Els) {
			const liEl = document.createElement('li')
			const aEl = document.createElement('a')

			if (El === 'books') aEl.classList.add(styles.active)

			aEl.setAttribute('href', '#')

			aEl.append(El)
			liEl.append(aEl)
			ulEl.append(liEl)
		}
		this._navMenu.append(ulEl)

		this.addStyle()

		return this._navMenu
	}
}
