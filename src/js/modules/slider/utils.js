const getFunctions = ($el) => {
	function disableBtn() {
		$el.style.pointerEvents = 'none';
	}

	function enableBtn() {
		$el.removeAttribute('style');
	}

	return [enableBtn, disableBtn];
}

const slideDownAnimation = (slides, slideIndex, isGoingBack = false, btnControllers = []) => {
	const [enable, disable] = btnControllers;

	typeof disable === 'function' && disable();

	const currEl = slides[slideIndex];
	if(!currEl){
		typeof enable === 'function' && enable();
		return;
	}
		
	const currElStyle = getComputedStyle(currEl);

	currEl.setAttribute('style', `
	display: block;
	z-index: 9999;
	width: 100vw;
	position: absolute;
	background-color: ${currElStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ? currElStyle.backgroundColor : 'white'};
	`);

	const prop = isGoingBack ? 'bottom' : 'top';
	const animation = currEl.animate([{[prop]: '-105%'}, {[prop]: '0'}], {duration: 300});

	animation.onfinish = () => {
		slides.forEach(slide => {
			if (slide !== currEl)
				slide.style.display = 'none';
		});

		currEl.removeAttribute('style');

		typeof enable === 'function' && enable();
	}
}

const showHansonModal = (hanson, slideIndex) => {
	hanson.style.opacity = '0';
	if(slideIndex === 2){
		hanson.classList.add('animated');
		setTimeout(()=>{
			hanson.classList.add('slideInUp');
			hanson.style.opacity = '1';
		},3000)
	} else {
		hanson.classList.remove('slideInUp');
	}
}


export {
  showHansonModal,
  slideDownAnimation,
  getFunctions
}