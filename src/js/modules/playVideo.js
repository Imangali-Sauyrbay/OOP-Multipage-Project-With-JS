export default class VideoPlayer {
  constructor(triggers, overlay){
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close')
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      const currEl = btn.closest('.module__video-item');
      if(currEl){
        const blockedEl = currEl.nextElementSibling;
        if(i % 2 == 0) {
          blockedEl.setAttribute('data-disabled', 'true');
        }
      }

      btn.addEventListener('click', this.createPlayer(btn.getAttribute('data-url'), btn));
    });
  }

  bindClose() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    })
  }

  onPlayerStateChanged(state) {
    if(state.data !== 0)
      return;
    const blockedEl = this.lastClicked.closest('.module__video-item').nextElementSibling;
    const playSvg = this.lastClicked.querySelector('svg').cloneNode(true);

    const playCircle = blockedEl.querySelector('.play__circle');
    if(playCircle && playCircle.classList.contains('closed')){
      playCircle.classList.remove('closed');
      blockedEl.querySelector('svg').remove();
      playCircle.appendChild(playSvg);

      const text = blockedEl.querySelector('.play__text');
      text.textContent = 'play video';
      text.classList.remove('attention');

      blockedEl.style.opacity = 1;
      blockedEl.style.filter = 'none';
      blockedEl.setAttribute('data-disabled', 'false');
    }

  }

  createPlayer(url, btn) {

    const create = () => {
      try {
        this.player = new YT.Player('frame', {
          height: '100%',
          width: '100%',
          videoId: `${url}`,
          events: {
            onStateChange: this.onPlayerStateChanged.bind(this),
          }
        });
        this.overlay.style.display = 'flex';
      } catch (e) {
      }
    }


    return (e) => {
      if(btn.closest('.module__video-item') &&
      btn.closest('.module__video-item').getAttribute('data-disabled') == 'true')
        return;
    
      this.lastClicked = btn;
      if(document.querySelector('iframe#frame')){
        this.overlay.style.display = 'flex';
        const currUrl = btn.getAttribute('data-url');
        if(this.path !== currUrl){
          try{
            this.player.loadVideoById({videoId: currUrl});
            this.path = currUrl;
          } catch(e){}
        }
      } else {
        this.path = url;
        create();
      }
    }
  }

  init() {
    if(this.btns.length > 0) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.querySelector('script');
      firstScriptTag.parentElement.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindClose();
    }
  }
}