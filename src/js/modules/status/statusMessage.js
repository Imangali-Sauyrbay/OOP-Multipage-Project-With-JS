import loader from './loader';
import cross from './cross';
import check from './check';
import {
  createBlock,
  showBlock
} from './utils';

export default class StatusMessage {
  constructor(btn) {
    this.btn = btn;
    this.btnInnerHtml = btn.innerHTML;
  }

  onLoading() {
    this.btn.innerHTML = loader;
    this.btn.disabled = true;
    this.btn.style.paddingTop = '6px';
    this.btn.style.paddingBottom = '6px';
  }

  onSuccess() {
    this.btn.innerHTML = this.btnInnerHtml;
    this.btn.disabled = false;
    this.btn.removeAttribute('style');
    showBlock(createBlock('SUCCESS!', 'green', 'white', check));
  }

  onError() {
    this.btn.innerHTML = this.btnInnerHtml;
    this.btn.disabled = false;
    this.btn.removeAttribute('style');
    showBlock(createBlock('ERROR!', 'red', 'white', cross));
  }
}