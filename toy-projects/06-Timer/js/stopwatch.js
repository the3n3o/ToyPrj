let startTime;
let elapsedTime = localStorage.getItem("setStopwatchTime");
let lastLapTime = 0;
let timerInterval;

// localStorage
const setStopwatchTime = () => {
  localStorage.setItem("setStopwatchTime", elapsedTime);
};

const removeStopwatchTime = () => {
  localStorage.removeItem('setStopwatchTime');
}

const saveStopwatchStatus = () => {
  localStorage.setItem("stopwatchStatus", "On");
};

const removeTimerStatus = () => {
  localStorage.removeItem("stopwatchStatus");
};

// Start Stopwatch
const startStopwatch = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    removeTimerStatus();

    start.classList.remove("timer-on");
    start.innerText = "시작";
    reset.classList.remove("lap-on");
    reset.innerText = "재설정";
  } else {
    start.classList.add("timer-on");
    start.innerText = "중지";
    reset.classList.add("lap-on");
    reset.innerText = "랩";
    saveStopwatchStatus();

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
      elapsedTime = (Date.now() - startTime);
      timerDisplay.innerText = formatTime(elapsedTime/1000);
      setStopwatchTime();
    }, 1000);
  }
};

start.addEventListener("click", startStopwatch);

// Lap & Reset Stopwatch
const addLapTime = () => {
  const currentLapTime = elapsedTime - lastLapTime;
  lastLapTime = elapsedTime;

  let lapElement = document.createElement('li');
  lapElement.innerText = `Lap: ${formatTime(currentLapTime/1000)} | Total: ${formatTime(elapsedTime/1000)}`;
  lapList.appendChild(lapElement);
  
  lapList.scrollTop = lapList.scrollHeight;
  // 리스트 10개 유지
  // if (lapList.children.length > 10) {
  //   lapList.removeChild(lapList.firstChild);
  // }
}

const resetLapTime = () => {
  elapsedTime = 0;
  lastLapTime = 0;
  removeStopwatchTime();
  timerDisplay.innerText = formatTime(elapsedTime / 1000);
  lapList.innerHTML = '';
}

reset.addEventListener('click', () => {
  if (reset.classList.contains('lap-on')) {
    addLapTime();
  } else {
    resetLapTime();
  }
})



// page reload //
window.addEventListener("load", () => {
  timerDisplay.innerText = formatTime(elapsedTime/1000);
  if (localStorage.getItem("stopwatchStatus")) {
    startStopwatch();
  }
});