import StatusMessage from "./status/statusMessage";

const postData = async (url, data) => {
  let res = await fetch(url, {
    method: 'POST',
    body: data
  });

  if(!res.ok){
    throw new Error(`Could not fetch ${url}; status: ${res.status}!`);
  }
  
  return await res.text()
}

export default class Form {
  constructor(formSelector){
    this.forms = document.querySelectorAll(formSelector);
    this.path = 'assets/question.php'
  }

  mailBindCheck() {
    const inputs = document.querySelectorAll('[type="email"]');

    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^a-z @\._0-9]/ig, '');
      })
    });
  }

  initPhoneMasks(){
    const setCursorPosition = (pos, $el) => {
      $el.focus();
  
      if($el.setSelectionRange){
        $el.setSelectionRange(pos, pos);
      } else if($el.createTextRange){
        let range = $el.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }
  
    function createMask(e){
      let mask = '+1 (___) ___-____',
          i = 0,
          def = mask.replace(/\D/g, ''),
          val = e.target.value.replace(/\D/g, '');
          
      if(def.length >= val.length)
          val = def;
  
      e.target.value = mask.replace(/./g, function(a){
        let res;
        if(/[_\d]/.test(a) && i < val.length)
            res = val.charAt(i++);
        else if(i >= val.length)
            res = '';
        else res = a;
  
        return res;
      });
  
      if (e.type === 'blur'){
        if(e.target.value.length == 2)
          e.target.value = '';
      } else {
        setCursorPosition(e.target.value.length, e.target);
      }
    }
  
    const inputs = document.querySelectorAll('[name="phone"]');
  
    inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    })
  }


  init() {
    this.forms.forEach(form => {
      const btn = form.querySelector('button');
      const status = new StatusMessage(btn);
      
      const inputs = form.querySelectorAll('input');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.onLoading();

        const formData = new FormData(form);

        postData(this.path, formData)
          .then(() => {
            status.onSuccess();
            inputs.forEach(el => el.value = '')
          })
          .catch(e => status.onError());
      });
    });

    this.mailBindCheck();
    this.initPhoneMasks();
  }
}