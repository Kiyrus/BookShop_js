import './assets/styles/global.scss'
import { Layout } from './components/layout/layout'
import { Books } from './components/screens/books/books'
import { Basket } from './components/ui/basket/basket'

class App {
	private _rootApp = document.getElementById('app')
	private _basket = new Basket()
	private _layout = new Layout()
	private _books = new Books()

	public draw() {
		this._rootApp?.append(
			this._layout.draw(this._basket, this._books.draw(this._basket))
		)
	}
}

new App().draw()
