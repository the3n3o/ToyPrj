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
const lapList = document.querySelector('.lap-list');

// timer format //
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

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
