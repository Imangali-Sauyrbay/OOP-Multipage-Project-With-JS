import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor(props){
    super(props);

    const {activeClass = 'active', animate, autoplay} = props;

    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
  }

  makeFirstSlideActive() {
    const toggle = (target, shouldHide = false) => {
      if(this.animate){
        [{
          selector: '.card__title',
          opacity: '0.4'
        },
        {
          selector: '.card__controls-arrow',
          opacity: '0'
        }].forEach(({selector, opacity}) => {
          target.querySelector(selector).style.opacity = shouldHide ? opacity : '1';
        });
      }
    };

    this.slides.forEach($slide => {
      $slide.classList.remove(this.activeClass);
      toggle($slide, true);
    });


    this.childrenSlides[0].classList.add(this.activeClass)
    toggle(this.childrenSlides[0]);

  }

  ShowNext() {

    this.container.appendChild(this.childrenSlides[0]);
    for(let i = 0; i < this.childrenSlides.length - 3; i++){
      if(this.childrenSlides[i].tagName === 'BUTTON'){
        this.container.appendChild(this.childrenSlides[i]);
      }
    }
    
    this.makeFirstSlideActive();
  }

  ShowPrev() {
    for(let i = this.childrenSlides.length - 1; i >= 0; i--){
      if(this.childrenSlides[i].tagName !== 'BUTTON'){
        const prevSlide = this.childrenSlides[i];
        this.container.insertBefore(prevSlide, this.childrenSlides[0]);
        this.makeFirstSlideActive();
        break;
      }
    }
  }

  bindTriggers() {
    const next = ($btn) => {
      $btn.addEventListener('click', this.ShowNext.bind(this));
    }

    const prev = ($btn) => {
      $btn.addEventListener('click', this.ShowPrev.bind(this));
    }

		this.nextBtn && this.nextBtn.forEach(next);
		this.prevBtn && this.prevBtn.forEach(prev);
  }

  render() {
    try {
      
    this.container.style.cssText = `
      display: flex;
      overflow: hidden;
      align-items: flex-start;
    `;
    

    this.slides.forEach($el => {
      $el.style.flexShrink = '0';
    })

    if(this.autoplay) {
      let id = setInterval(this.ShowNext.bind(this), 5000);
      
      this.container.addEventListener('mouseenter', () => {
        clearInterval(id);
      });

      this.container.addEventListener('mouseleave', () => {
        id = setInterval(this.ShowNext.bind(this), 5000);
      })
    }

    this.bindTriggers();
    this.makeFirstSlideActive();
  } catch(e) {}
    return this;
  }
}