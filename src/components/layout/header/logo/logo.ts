import styles from './logo.module.scss'

export class Logo {
	private _logo = document.createElement('h1')

	private addStyle() {
		this._logo.classList.add(styles.logo)
	}

	private handleClick() {
		const currentURL = window.location.pathname

		if (currentURL !== '/') {
			this._logo.onclick = () => {
				window.history.pushState({}, '', '/')
			}
		}
	}

	public draw() {
		this._logo.append('Bookshop')

		this.addStyle()
		this.handleClick()

		return this._logo
	}
}
