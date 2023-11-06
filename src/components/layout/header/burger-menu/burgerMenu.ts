import styles from './burgerMenu.module.scss'

export class BurgerMenu {
	private _burgerMenu = document.createElement('button')
	private _isShowNavMenu = true

	private addStyle() {
		this._burgerMenu.classList.add(styles.burger_menu)
	}

	private handleToggleIcon(navMenu: HTMLElement) {
		this._burgerMenu.classList.toggle(styles.close)

		this._isShowNavMenu
			? ((navMenu.style.display = 'block'), (this._isShowNavMenu = false))
			: ((navMenu.style.display = 'none'), (this._isShowNavMenu = true))
	}

	public draw(navMenu: HTMLElement) {
		const imgProps = [
			{
				src: '/public/burger.png',
				alt: 'burger'
			},
			{
				src: '/public/close.png',
				alt: 'close'
			}
		]

		imgProps.forEach(imgProp => {
			const imgEl = document.createElement('img')

			for (const [attr, val] of Object.entries(imgProp)) {
				imgEl.setAttribute(attr, val)
			}

			this._burgerMenu.append(imgEl)
		})

		this._burgerMenu.onclick = () => this.handleToggleIcon(navMenu)

		this.addStyle()

		return this._burgerMenu
	}
}
