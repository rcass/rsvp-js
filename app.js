document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = document.querySelector('input');

  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');

  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');

  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if (isChecked){
      for (let i = 0; i < lis.length; i++){
        let li = lis[i];
        if(li.className === 'responded'){
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    } else {
      for (let i = 0; i < lis.length; i++){
        let li = lis[i];
        li.style.display = '';
      }
    }

  });

  function createLi(text){
    function createElement(elementName, property, value){
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    function appendToLI(elementName, property, value){
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }

    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
    return li;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = input.value;
    input.value = '';
    
    const li = createLi(text);

    //adding new guest to list
    ul.appendChild(li);
  });

  // Add responded class to checked boxes
  ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;

    if(checked){
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });

  ul.addEventListener('click', (e) => {
    const button = e.target;

    if(button.tagName === 'BUTTON'){
      const li = button.parentNode;
      const ul = li.parentNode;

      if(button.textContent === 'remove') {
        ul.removeChild(li);
      } else if (button.textContent === 'edit') {
        //create edit field
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent; //show original text
        li.insertBefore(input, span);
        li.removeChild(span);

        //change button text to save
        button.textContent = 'save';

      } else if (button.textContent === 'save') {
        //create edit field
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value; //show original text
        li.insertBefore(span, input);
        li.removeChild(input);

        //change button text to save
        button.textContent = 'edit';

      }
    }
  });
});