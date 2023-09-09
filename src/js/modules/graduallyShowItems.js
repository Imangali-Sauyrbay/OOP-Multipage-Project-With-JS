export default class GraduallyShowItems {
  constructor(itemsSelector){
    this.items = document.querySelectorAll(itemsSelector);
    this.triggerContainer = this.items[this.items.length - 1];
    this.counter = 0;
  }

  bindTriggers() { 
    this.triggerContainer
      .querySelector('.plus')
      .addEventListener('click', (e) => {
        if(this.counter == this.items.length - 2){
          this.triggerContainer.remove();
        }
        
        const currItem = this.items[this.counter++];
        currItem.classList.add('animated', 'fadeIn');
        currItem.style.display = 'flex';

        setTimeout(() => {
          currItem.classList.remove('animated', 'fadeIn');
        }, 1000);
      });
  }

  hideItems() {
    this.items.forEach((item) => {
      if(item === this.triggerContainer) return;
  
      item.style.display = 'none';
    });
  }

  init() {
    try{
      this.hideItems();
      this.bindTriggers();
    } catch(e) {}
  }
}