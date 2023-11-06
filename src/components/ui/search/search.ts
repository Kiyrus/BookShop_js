import styles from './search.module.scss'

export class Search {
	private _search = document.createElement('button')

	private addStyle() {
		this._search.classList.add(styles.search)
	}

	public draw() {
		this._search.disabled = true

		this.addStyle()

		return this._search
	}
}
