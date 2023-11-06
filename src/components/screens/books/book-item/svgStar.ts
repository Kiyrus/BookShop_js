export class SvgStar {
	private svgWrapper = document.createElement('div')
	private _svgStar: SVGElement | undefined
	private _pathStar: SVGPathElement | undefined

	private addAttr(averageRating: number, i: number, urlId: number) {
		const svgAttr = [
			['width', '12'],
			['height', '11'],
			['viewBox', '0 0 12 11'],
			['fill', 'none']
		]

		for (const [attr, val] of svgAttr) {
			this._svgStar!.setAttribute(attr, val)
		}

		this._pathStar!.setAttribute(
			'd',
			'M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z'
		)

		Math.ceil(averageRating) > i
			? this._pathStar!.setAttribute('fill', '#F2C94C')
			: Math.ceil(averageRating) === i
			? this._pathStar!.setAttribute('fill', `url(#urlId_${urlId}`)
			: this._pathStar!.setAttribute('fill', '#eeedf5')
	}

	public draw(averageRating: number) {
		for (let i = 1; i <= 5; i++) {
			this._svgStar = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'svg'
			)
			this._pathStar = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'path'
			)
			const defsEl = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'defs'
			)
			const linearGradientEl = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'linearGradient'
			)
			const stopElLeft = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'stop'
			)
			const stopElRight = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'stop'
			)
			const oneHundredPercent = 100
			const fillPercentageLeftSide =
				oneHundredPercent -
				(averageRating * oneHundredPercent -
					Math.floor(averageRating) * oneHundredPercent)
			const fillPercentageRightSide = oneHundredPercent - fillPercentageLeftSide
			const urlId = i + fillPercentageLeftSide / oneHundredPercent

			linearGradientEl.setAttribute('id', `urlId_${urlId}`)
			stopElLeft.setAttribute('offset', `${fillPercentageLeftSide}%`)
			stopElLeft.setAttribute('stop-color', '#F2C94C')
			stopElRight.setAttribute('offset', `${fillPercentageRightSide}%`)
			stopElRight.setAttribute('stop-color', '#eeedf5')

			linearGradientEl.append(stopElLeft, stopElRight)
			defsEl.append(linearGradientEl)

			this.addAttr(averageRating, i, urlId)

			this._svgStar!.append(this._pathStar!, defsEl)
			this.svgWrapper.append(this._svgStar)
		}

		return this.svgWrapper
	}
}
