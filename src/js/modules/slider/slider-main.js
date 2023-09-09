import Slider from "./slider";
import {
  showHansonModal,
  slideDownAnimation,
  getFunctions
} from './utils';

export default class MainSlider extends Slider {
  constructor(props){
    super(props);
    this.slideIndex = 0;

		try{
			this.hanson = document.querySelector('.hanson');
		} catch(e) {
			console.error(e);
		}
  }

  showSlide(n, isGoingBack, btnControllers = []) {
		if (n >= this.slides.length)
			this.slideIndex = 0;

		if (n < 0)
			this.slideIndex = this.slides.length - 1;

		if(this.hanson)
			showHansonModal(this.hanson, this.slideIndex);

		slideDownAnimation(this.slides, this.slideIndex, isGoingBack, btnControllers);
		return this;
	}

	changeSlides(n, ...args) {
		const isGoingBack = n > 0 ? false : true;
		this.showSlide(this.slideIndex += n, isGoingBack, ...args);
		return this;
	}

	addEventToElems(selector, slideIndex, event = 'click') {
		const $els = document.querySelectorAll(selector);
		if ($els === null) return this;

		$els.forEach($el => $el.addEventListener(event, (e) => {
			e.preventDefault();
			if (this.slideIndex == slideIndex)
				return;
			this.slideIndex = slideIndex;
			this.showSlide(this.slideIndex, getFunctions($el));
		}));

		return this;
	}

	render() {
		const addEvent = (i) => ($el) => {
			$el.addEventListener('click', () => {
				this.changeSlides(i, getFunctions($el));
			})
		}

		this.nextBtn && this.nextBtn.forEach(addEvent(1));
		this.prevBtn && this.prevBtn.forEach(addEvent(-1));

		this.slides.forEach(slide => {
			slide.style.display = 'none';
		});

		try {
			this.slides[this.slideIndex].style.display = 'block';
		}	catch(e) {}


		return this;
	}
}