import { $axios } from '../api'

const API_KEY = process.env.API_KEY

class BookService {
	async getBookAll(categories: string, startIndex: number) {
		return $axios.get(
			`/volumes?q=subject:${categories}&key=${API_KEY}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`
		)
	}
}

export default new BookService()
