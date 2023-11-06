import axios from 'axios'

const API_URL = process.env.API_URL

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})
