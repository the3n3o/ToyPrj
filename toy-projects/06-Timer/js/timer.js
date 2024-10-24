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
