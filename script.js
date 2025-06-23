let form = document.getElementById("question-form");;
let clone;
let mcq = 0;
let ul = document.createElement('ul');
let filled = 0;
let flag = 0;
let prev_text;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (flag == 0) {
    flag = 1;
    event.preventDefault();
    clone = document.getElementById('pop-container').cloneNode(true);
    let li = document.createElement('li');
    document.body.appendChild(ul);
    li.appendChild(clone);
    ul.insertBefore(li, ul.firstChild);
    clone.style.display = 'flex';
    let question = document.querySelector("#question").value;
    document.querySelector("#question").value = '';
    clone.querySelector('#popup-question').innerText = `Q: ${question}`;
    let delete_btn = clone.querySelector('#delete');
    delete_btn.addEventListener('click', () => {
      let item = delete_btn.parentNode.parentNode.parentNode;
      item.remove();
      flag = 0;
      filled = 0;
    })
    function createOptionElement(optionNumber) {
      const newDiv = document.createElement('div');
      newDiv.setAttribute('id', `option${optionNumber}`);
      const input = document.createElement('input');
      input.setAttribute('id', `option-text${optionNumber}`);
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', `Add option ${optionNumber}`);
      input.setAttribute('name', 'option');
      input.value= prev_text;
      const button = document.createElement('button');
      button.setAttribute('id', `add${optionNumber}`);
      button.setAttribute('class', 'add');
      button.setAttribute('type', 'submit');
      const span = document.createElement('span');
      span.setAttribute('class', 'fa-stack');
      span.setAttribute('style', 'font-size: 36px;');
      const icon1 = document.createElement('i');
      icon1.setAttribute('class', 'far fa-square fa-stack-1x');
      icon1.setAttribute('style', 'color: white;');
      const icon2 = document.createElement('i');
      icon2.setAttribute('class', 'fas fa-plus fa-stack-1x');
      icon2.setAttribute('style', 'color: white; font-size: 20px;');
      span.appendChild(icon1);
      span.appendChild(icon2);
      button.appendChild(span);
      newDiv.appendChild(input);
      newDiv.appendChild(button);
      return newDiv;
    }

    function setupEditButton(clone) {
      const editBtn = clone.querySelector('#edit');
      editBtn.addEventListener('click', () => {
        for (let i = 1; i <= 4; i++) {
          const form = clone.querySelector(`#option-${i}`);
          prev_text = clone.querySelector(`#option-${i}-text`).innerText;
          form.removeChild(form.firstElementChild);
          const newDiv = createOptionElement(i);
          form.appendChild(newDiv);
        }
        flag = 1;
        filled = 0;
      });
    }

    setupEditButton(clone);

    const setupOptionHandler = (optionNumber) => {
      const optionForm = clone.querySelector(`#option-${optionNumber}`);
      optionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const option = new FormData(optionForm);
        const input = clone.querySelector(`#option-text${optionNumber}`);
        const btn = clone.querySelector(`#add${optionNumber}`);
        const div = clone.querySelector(`#option${optionNumber}`);
        div.removeChild(input);
        div.removeChild(btn);
        const radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        const text = document.createElement('p');
        text.setAttribute('id', `option-${optionNumber}-text`);
        text.innerText = option.get("option");
        text.style.flexShrink = 1;
        div.appendChild(radio);
        div.appendChild(text);
        div.removeAttribute("id");
        div.setAttribute('class', 'mcq-option');
        filled++;
        if (filled == 4) {
          flag = 0;
          filled = 0;
        }
      });
    };

    for (let i = 1; i <= 4; i++) {
      setupOptionHandler(i);
    }
  }
});
