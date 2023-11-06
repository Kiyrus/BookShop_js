import styles from './auth.module.scss'

export class Auth {
	private _auth = document.createElement('button')

	private addStyle() {
		this._auth.classList.add(styles.auth)
	}

	public draw() {
		this._auth.disabled = true

		this.addStyle()

		return this._auth
	}
}
