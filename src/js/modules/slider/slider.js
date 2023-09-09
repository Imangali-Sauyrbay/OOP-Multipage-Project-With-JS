
export default class Slider {
	constructor({container = null, next = null, prev = null} = {}) {
		if (!container)
			throw new Error(`Container for slides wasn't provided into Slider class`);

		this.container = document.querySelector(container) || {};
		
		this.childrenSlides = this.container.children || [];
		this.slides = [].slice.call(this.container.children || []);

		if (next)
			this.nextBtn = document.querySelectorAll(next);

		if (prev)
			this.prevBtn = document.querySelectorAll(prev);
	}
}