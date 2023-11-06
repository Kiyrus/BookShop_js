interface IStyle {
	[className: string]: string
}

export class UseSlider {
	protected _indexImgPosition = 0
	private _intervalId: NodeJS.Timer | undefined

	private get getIntervalId() {
		return this._intervalId
	}

	private set getIntervalId(intervalId) {
		this._intervalId = intervalId
	}

	protected handleAutoSwitchImg(
		amountImg: number,
		slider: HTMLDivElement,
		styles: IStyle
	) {
		const intervalId = setInterval(() => {
			this._indexImgPosition < amountImg - 1
				? this._indexImgPosition++
				: (this._indexImgPosition = 0)

			this.toggleActiveClassImg(slider, styles)
		}, 7000)

		this.getIntervalId = intervalId
	}

	protected handleSwitchImgArrow(
		arrow: HTMLButtonElement,
		amountImg: number,
		slider: HTMLDivElement,
		styles: IStyle
	) {
		const isLeftArrow = arrow.classList.contains('left-btn')

		arrow.onclick = () => {
			const activeImg = slider.querySelector(`.${styles.active}`)

			if (activeImg?.classList.contains('n0')) {
				isLeftArrow
					? (this._indexImgPosition = amountImg - 1)
					: this._indexImgPosition++
			}

			if (activeImg?.classList.contains(`n${amountImg - 1}`)) {
				isLeftArrow ? this._indexImgPosition-- : (this._indexImgPosition = 0)
			}

			if (
				!activeImg?.classList.contains('n0') &&
				!activeImg?.classList.contains(`n${amountImg - 1}`)
			) {
				isLeftArrow ? this._indexImgPosition-- : this._indexImgPosition++
			}

			clearInterval(this.getIntervalId)
			this.handleAutoSwitchImg(amountImg, slider, styles)
			this.toggleActiveClassImg(slider, styles)
		}
	}

	protected handleSwitchImgDot(
		dot: HTMLButtonElement,
		dotIndex: number,
		slider: HTMLDivElement,
		styles: IStyle,
		amountImg: number
	) {
		dot.onclick = () => {
			this._indexImgPosition = dotIndex

			clearInterval(this.getIntervalId)
			this.handleAutoSwitchImg(amountImg, slider, styles)
			this.toggleActiveClassImg(slider, styles)
		}
	}

	protected toggleActiveClassImg(slider: HTMLDivElement, styles: IStyle) {
		slider
			.querySelectorAll(`.${styles.active}`)
			.forEach(el => el?.classList.remove(styles.active))

		slider
			.querySelectorAll(`.n${this._indexImgPosition}`)
			.forEach(el => el?.classList.add(styles.active))
	}
}
