const menuIcon = document.querySelector('#menu');
const xIcon = document.querySelector('#x');
const timeListBoxToggle = document.querySelector('#time-list-box-toggle');

// icons //
menuIcon.addEventListener('click', () => {
  timeListBoxToggle.classList.remove('hidden');
})

xIcon.addEventListener('click', () => {
  timeListBoxToggle.classList.add('hidden');
})

// - , + , fullview


// timer //