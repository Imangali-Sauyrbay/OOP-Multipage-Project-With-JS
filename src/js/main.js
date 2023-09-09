import 'core-js';
import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import GraduallyShowItems from './modules/graduallyShowItems';
import Form from './modules/form';
import ShowInfo from './modules/showInfo';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
  new MainSlider({
    container: '.page',
    next: '.next'
  }).addEventToElems('.sidecontrol > a', 0)
  .render();

  new MainSlider({
    container: '.moduleapp',
    next: '.next',
    prev: '.prev'
  }).addEventToElems('.sidecontrol > a', 0)
  .render();

  new MiniSlider({
    container: '.showup__content-slider',
    next: '.showup__next',
    prev: '.showup__prev',
    activeClass: 'card-active',
    animate: true,
  }).render();

  new MiniSlider({
    container: '.modules__content-slider',
    next: '.modules__info-btns .slick-next',
    prev: '.modules__info-btns .slick-prev',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  }).render();

  
  new MiniSlider({
    container: '.feed__slider',
    next: '.feed__slider .slick-next',
    prev: '.feed__slider .slick-prev',
    activeClass: 'feed__item-active'
  }).render();

  
  new VideoPlayer('.showup .play', '.overlay').init();

  new VideoPlayer('.module__video-item .play', '.overlay').init();


  const getClass = (end) => `.officer${end} .officer__card-item`;
  ['new', 'old'].forEach((str) => new GraduallyShowItems(getClass(str)).init());

  new Form('.form').init();

  new ShowInfo('.plus__content').init();

  new Download('.download').init();
});