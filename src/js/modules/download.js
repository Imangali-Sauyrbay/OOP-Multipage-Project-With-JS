export default class Download {
  constructor(triggers){
    this.btns = document.querySelectorAll(triggers);
    this.path = 'assets/img/mainbg.jpg';
  }

  downloadItem(path) {
    const temp = path.split('/');
    const fileName = temp[temp.length - 1].split('.')[0];

    console.log(path, fileName)

    const newLink = document.createElement('a');
    newLink.setAttribute('href', path);
    newLink.setAttribute('style', 'display: none;');
    newLink.setAttribute('download', fileName);
    document.body.appendChild(newLink); 
    newLink.click();
    document.body.removeChild(newLink);
  }

  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.downloadItem(this.path);
      });
    })
  }
}