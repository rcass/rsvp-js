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
    // create new name in list
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    //create checkbox
    const label = document.createElement('label');
    label.textContent = 'confirmed';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    li.appendChild(label);

    //edit name button
    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    li.appendChild(editButton);

    //remove name button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    li.appendChild(removeButton);

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