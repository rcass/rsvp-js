const form = document.getElementById('registrar');
const input = document.querySelector('input');
const ul = document.getElementById('invitedList');

function createLi(text){
  // create new name in list
  const li = document.createElement('li');
  li.textContent = text;

  //create checkbox
  const label = document.createElement('label');
  label.textContent = 'confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label);

  //remove name
  const button = document.createElement('button');
  button.textContent = 'remove';
  li.appendChild(button);

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
  if(e.target.tagName === 'BUTTON'){
    const li = e.target.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
  }
});