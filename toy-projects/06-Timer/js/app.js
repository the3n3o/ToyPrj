const modalFade = document.querySelector('#modalfade');
const menuIcon = document.querySelector("#menu");
const xIcon = document.querySelector("#x");
const timeListBoxToggle = document.querySelector("#time-list-box-toggle");

const timerDisplay = document.querySelector("#timer");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const edit = document.querySelector("#edit");

// icons & backdrop //
menuIcon.addEventListener("click", () => {
  timeListBoxToggle.classList.toggle("hidden");
  if(timeListBoxToggle.classList.contains('hidden')){
    modalFade.style.display = 'none';
  } else {
    modalFade.style.display = 'block';
  }
});

xIcon.addEventListener("click", (event) => {
  const grandparent = event.target.parentElement.parentElement;
  grandparent.classList.add('hidden');
  if(grandparent.classList.contains('hidden')){
    modalFade.style.display = 'none';
  } else {
    modalFade.style.display = 'block';
  }
});

// - , + , fullview

// timer format //
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

// timer //

let timeLeft = 5;
let timerInterval;

const startTimer = () => {
  start.classList.add("timer-on");
  start.innerText = "중지";

  if (timerInterval) {
    start.classList.remove("timer-on");
    start.innerText = "재시작";

    clearInterval(timerInterval);
    timerInterval = null;
  } // 타이머 실행 시 중복 실행 방지
  else {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.innerText = formatTime(timeLeft);
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        start.classList.remove("timer-on");
        start.innerText = "재시작";
      }
    }, 1000);
  }
};

start.addEventListener("click", startTimer);

// edit //
