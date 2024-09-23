const currentDate = document.querySelector(".current-date");
const days = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  // 지난달 말일
  let fisrtDayofMonth = new Date(currYear, currMonth, 1).getDay();
  // 이번달 1일 요일
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  // 현재 month + 1 (다음달) 의 0일 = 지난달의 말일
  let lastDayofMonth = new Date(currYear, currMonth + 1, 0).getDay();
  // 이번달 말일 요일

  let li = '';

  for (let i = fisrtDayofMonth; i > 0; i--) {
    li += `<li class = "inactive">${lastDateofLastMonth - i + 1}</li>`
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
    // i가 오늘 일자와 같고, 현재 월 = 이번 달 , 현재 년도 = 이번 년도 일경우 "active" 반환, 그렇지 않을 경우 "" 반환
    li += `<li class = "${isToday}">${i}</li>`;
  } // 말일까지 반복해서 li 변수에 값을 축적 (+=)
    // isToday 조건을 만족할 경우 class 에 "active" 추가

  for (let i = lastDayofMonth; i < 6; i++) {
    li += `<li class = "inactive">${i - lastDayofMonth + 1}</li>`
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  days.innerHTML = li;
  // days 라는 ul 안에 li 넣기
};

renderCalendar();

prevNextIcon.forEach(icon => {
  icon.addEventListener('click', () => {
    currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      // currMonth 의 값이 index를 넘었을 때 date 변수를 새로 불러온다. 
      // 예를들어 1월에서 prev 아이콘을 누르면 currMonth는 -1이 될 것이고
      // date = new Date(2024, -1); 의 값은 2023년도 12월이다.
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
      // 그 외의 경우엔 date = 현재 날짜로 반환
    }
    renderCalendar();
  })
})