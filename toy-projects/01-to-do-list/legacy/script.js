const inputText = document.querySelector("#input-box");
const taskUl = document.querySelector(".task-list");

function addTask() {
  if (inputText.value === "") {
    alert('You must write something');
  }
  else {
    let li = document.createElement('li');
    li.innerText = inputText.value;
    taskUl.appendChild(li);
    let span = document.createElement('span');
    span.innerText = '\u00d7';
    li.appendChild(span);
    saveData();
  }
  inputText.value = '';
}

taskUl.addEventListener('click', (event) => {
    if(event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
        saveData();
    }
    else if(event.target.tagName === 'SPAN') {
        event.target.parentElement.remove();
        saveData();
    }
})

function saveData() {
    localStorage.setItem('data',taskUl.innerHTML);
}

function showData() {
    taskUl.innerHTML = localStorage.getItem('data');
}
showData();