const modalFade = document.querySelector("#modalfade");
const menuIcon = document.querySelector("#menu");
const addIcon = document.querySelector("#add");
const removeIcon = document.querySelector("#remove");
const fullscreenIcon = document.querySelector("#fullscreen");
const xIcon = document.querySelector("#x");
const timeListBoxToggle = document.querySelector("#time-list-box-toggle");
const cancel = document.querySelector("#cancel");
const save = document.querySelector("#save");
const timeEditBox = document.querySelector("#time-edit-box");

const timerDisplay = document.querySelector("#timer");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const edit = document.querySelector("#edit");
const editHour = document.querySelector("#edit-hour");
const editMin = document.querySelector("#edit-min");
const editSec = document.querySelector("#edit-sec");
const timerName = document.querySelector("#name");
const timerParagraph = document.querySelector("#timer-paragraph");

const specificTimes = document.querySelectorAll("td");

// preventDefault //
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// icons & backdrop //

menuIcon.addEventListener("click", () => {
  timeListBoxToggle.classList.toggle("hidden");
  if (timeListBoxToggle.classList.contains("hidden")) {
    modalFade.style.display = "none";
  } else {
    modalFade.style.display = "block";
  }
});

xIcon.addEventListener("click", (event) => {
  const grandparent = event.target.parentElement.parentElement;
  grandparent.classList.add("hidden");
  if (grandparent.classList.contains("hidden")) {
    modalFade.style.display = "none";
  } else {
    modalFade.style.display = "block";
  }
});

const toggleTimeEditBox = () => {
  timeEditBox.classList.toggle("hidden");
  if (timeEditBox.classList.contains("hidden")) {
    modalFade.style.display = "none";
  } else {
    modalFade.style.display = "block";
  }
};

edit.addEventListener("click", toggleTimeEditBox);
cancel.addEventListener("click", toggleTimeEditBox);

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

const formatEditTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const timerTitle = [];

  if (hours > 0) {
    timerTitle.push(`${hours}시간`);
  }
  if (minutes > 0) {
    timerTitle.push(`${minutes}분`);
  }
  if (seconds > 0) {
    timerTitle.push(`${seconds}초`);
  }

  if (timerTitle.length === 0) {
    return "시간을 설정해주세요.";
  }

  return `${timerTitle.join(" ")} 타이머`;
};

// timer //

let timeLeft = localStorage.getItem("timeLeft");
let timerInterval;

// localStorage
const setTime = () => {
  localStorage.setItem("setTime", timeLeft);
};

const saveTimer = () => {
  localStorage.setItem("timeLeft", timeLeft);
};

const saveTimerStatus = () => {
  localStorage.setItem("timerStatus", "On");
};

const removeTimerStatus = () => {
  localStorage.removeItem("timerStatus");
};

const saveTimerTitle = () => {
  localStorage.setItem("saveTimerTitle", formatEditTime(timeLeft));
};

const startTimer = () => {
  if (timerDisplay.innerText == "00:00:00" && timeLeft > 0) {
    timerDisplay.innerText = formatTime(timeLeft);
    start.classList.add("timer-on");
    start.innerText = "중지";
    saveTimerStatus(); // 타이머 작동상태 ON
  } else if (timerDisplay.innerText == "00:00:00" && timeLeft == 0) {
    alert("타이머 시간을 설정해주세요!");
  } else if (timerDisplay.innerText !== "00:00:00" && timeLeft > 0) {
    start.classList.add("timer-on");
    start.innerText = "중지";
    saveTimerStatus(); // 타이머 작동상태 ON
  }

  if (timerInterval) {
    start.classList.remove("timer-on");
    start.innerText = "재시작";
    removeTimerStatus(); // 타이머 작동상태 OFF

    clearInterval(timerInterval);
    timerInterval = null;
  } // 타이머 실행 시 중복 실행 방지
  else {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.innerText = formatTime(timeLeft);
        saveTimer(); // 매초마다 남은 시간을 저장
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        localStorage.removeItem("timeLeft"); // 타이머 종료시 로컬스토리지 제거
        start.classList.remove("timer-on");
        start.innerText = "시작";
        timeLeft = localStorage.getItem("setTime");
        removeTimerStatus(); // 타이머 작동상태 OFF
      }
    }, 1000);
  }
};

start.addEventListener("click", startTimer);

// reset //
const resetTimer = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = localStorage.getItem("setTime");
  timerDisplay.innerText = formatTime(timeLeft);
  removeTimerStatus();
  saveTimer();
  if (!localStorage.getItem("timeStatus")) {
    start.classList.remove("timer-on");
    start.innerText = "시작";
  }
};

reset.addEventListener("click", resetTimer);

// edit //
save.addEventListener("click", () => {
  timeLeft =
    Number(editHour.value * 3600) +
    Number(editMin.value * 60) +
    Number(editSec.value);
  timerDisplay.innerText = formatTime(timeLeft);
  if (timerName.value) {
    timerParagraph.innerText = timerName.value;
  } else {
    timerParagraph.innerText = formatEditTime(timeLeft);
  }
  timerName.value = "";
  localStorage.removeItem("timerLeft"); // 타이머 재설정시 로컬스토리지 제거
  saveTimer();
  setTime();
  saveTimerTitle();
  toggleTimeEditBox();
});

// page reload //
window.addEventListener("load", () => {
  timerDisplay.innerText = formatTime(timeLeft);
  timerParagraph.innerText = localStorage.getItem("saveTimerTitle");
  if (localStorage.getItem("timerStatus")) {
    startTimer();
  }
  console.log(timeLeft);
});

// specific timer //

for (let i = 0; i < specificTimes.length; i++) {
  const match = specificTimes[i].textContent.match(/\d+/g);
  const matchString = specificTimes[i].textContent.split(" ")[0];

  specificTimes[i].addEventListener("click", (event) => {
    if (matchString.includes("시간")) {
      timeLeft = match * 3600;
    } else if (matchString.includes("분")) {
      timeLeft = match * 60;
    } else if (matchString.includes("초")) {
      timeLeft = match;
    }
    timerDisplay.innerText = formatTime(timeLeft);
    timerParagraph.innerText = `${event.target.textContent}`;
    saveTimer();
    setTime();
    saveTimerTitle();

    // 모달 종료
    timeListBoxToggle.classList.toggle("hidden");
    if (timeListBoxToggle.classList.contains("hidden")) {
      modalFade.style.display = "none";
    } else {
      modalFade.style.display = "block";
    }
  });
}

// 폰트 축소, 확대 & 전체화면 기능 구현
removeIcon.addEventListener("click", () => {
  const currentTimerFontSize = window.getComputedStyle(timerDisplay).fontSize; // 128px
  const formattedCurrentTimerFontSize = currentTimerFontSize.match(/\d+/g)[0];

  if (formattedCurrentTimerFontSize > 100) {
    timerDisplay.style.fontSize = `${
      Number(formattedCurrentTimerFontSize) - 50
    }px`;
  }
});

addIcon.addEventListener("click", () => {
  const currentTimerFontSize = window.getComputedStyle(timerDisplay).fontSize; // 128px
  const formattedCurrentTimerFontSize = currentTimerFontSize.match(/\d+/g)[0];

  if (formattedCurrentTimerFontSize < 150) {
    timerDisplay.style.fontSize = `${
      Number(formattedCurrentTimerFontSize) + 50
    }px`;
  }
});

fullscreenIcon.addEventListener("click", () => {
  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// 스톱워치 구현
