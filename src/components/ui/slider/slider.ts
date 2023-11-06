import styles from './slider.module.scss'

import { UseSlider } from './useSlider'

export class Slider extends UseSlider {
	private _slider = document.createElement('div')

	private addStyle() {
		this._slider.classList.add(styles.slider)
	}

	public draw() {
		const arrows = [
			{
				src: 'public/arrow.png',
				alt: 'arrow'
			},
			{
				src: 'public/arrow.png',
				alt: 'arrow'
			}
		]
		const itemsSlider = [
			{
				src: 'public/banner.png',
				alt: 'slider-img'
			},
			{
				src: 'public/banner_2.png',
				alt: 'slider-img'
			},
			{
				src: 'public/banner_3.png',
				alt: 'slider-img'
			}
		]
		const dotsWrapper = document.createElement('div')

		arrows.forEach((arrow, index) => {
			const arrowBtn = document.createElement('button')
			const imgEl = document.createElement('img')
			const imgProps = Object.entries(arrow)

			for (const [attr, val] of imgProps) {
				imgEl.setAttribute(attr, val)
			}
			imgEl.draggable = false

			index === 0
				? arrowBtn.classList.add('left-btn')
				: arrowBtn.classList.add('right-btn')

			this.handleSwitchImgArrow(
				arrowBtn,
				itemsSlider.length,
				this._slider,
				styles
			)

			arrowBtn.append(imgEl)
			this._slider.append(arrowBtn)
		})

		itemsSlider.forEach((itemSlider, index) => {
			const imgEl = document.createElement('img')
			const imgProps = Object.entries(itemSlider)
			const dot = document.createElement('button')

			for (const [attr, val] of imgProps) {
				imgEl.setAttribute(attr, val)
			}
			imgEl.draggable = false

			index === 0 &&
				(imgEl.classList.add(styles.active), dot.classList.add(styles.active))
			imgEl.classList.add(`n${index}`)
			dot.classList.add(`n${index}`)

			this.handleSwitchImgDot(
				dot,
				index,
				this._slider,
				styles,
				itemsSlider.length
			)

			dotsWrapper.append(dot)
			this._slider.append(imgEl, dotsWrapper)
		})

		this.handleAutoSwitchImg(itemsSlider.length, this._slider, styles)
		this.addStyle()

		return this._slider
	}
}
