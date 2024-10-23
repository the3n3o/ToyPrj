// switch 
let month = 11;
let monthName;

switch (month) {
  case 1: monthName = 'Jan';
  break;
  case 2: monthName = 'Feb';
  break;
  case 3: monthName ='Mar';
  break;
  case 4: monthName ='Apr';
  break;
  case 5: monthName ='May';
  break;
  case 6: monthName ='Jun';
  break;
  case 7: monthName ='Jul';
  break;
  case 8: monthName ='Aug';
  break;
  case 9: monthName ='Sep';
  break; 
  case 10: monthName ='Oct';
  break;
  case 11: monthName ='Nov';
  break;
  case 12: monthName ='Dec';
  break;
  default: monthName = 'Invalid Month';
}

console.log(monthName);

// switch로 작성해보는 윤년 판별 예제

let year = 2000;
month = 2;
let days = 0;

switch(month) {
  case 1: case 3: case 5: case 7: case 9: case 11:
    days = 30;
    break;
  case 4: case 6: case 8: case 10: case 12:
    days = 31;
    break;
  case 2:
    days = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 29 : 28;
    break;
  default:
    console.log('Invalid month');
}

console.log(days);

// for
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 6; j++){
    if (i + j === 6) console.log(`[${i}, ${j}]`);
  }
}

// while
let count = 0;

/* while (count < 3) {
  console.log(count);
  count++;
} */

while (true) {
  console.log(count);
  count++;
  if (count === 3) break;
}

// do ... while 

count = 10;
do {
  console.log(count);
  count++;
} while (count < 13);

// break
// break은 레이블문, 반복문, switch문의 코드 블록 외에서 사용하면 SyntaxError
foo: console.log('foo'); // foo 라는 레이블 식별자가 붙은 레이블 문
foo: {
  console.log(1);
  break foo;
  console.log(2);
}
console.log('Done!');
// 중첩 for문에서 내부for문을 break 하면 외부 for문 진입
// 이때 외부 for문을 탈출하려면 레이블문을 사용한다. (break label;)
outer : for (let i = 0; i < 3; i++){
  for (let j = 0; j < 3; j++){
    if (i + j === 3) break outer;
    console.log(`inner : [${i}, ${j}]`);
  }
} // i 와 j는 각각 0,1,2 인데, 합이 3이되는 경우엔 break 되니깐 합이 4가되는 조합까지 반복하지 않음 
// [0,0] [0,1] [0,2] [1,0] [1,1] 

// indexOf를 for문으로
let string = 'Hello World!';
let search = 'l';
let index;

for (let i = 0; i < string.length; i++){
  if (string[i] === search){
    index = i;
    break;
  }
}
console.log(index);

// continue
// continue가 나오면 거기서 코드실행을 중단하고 반복문의 증감식으로 실행을 이동시킴

string = 'Hello World!';
search = 'l';
count = 0;

for (let i = 0; i < string.length; i++){
  if (string[i] !== search) continue;
  count++; // continue 문이 실행되면 이 문은 실행되지 않음.
  // 즉 string[i] 가 'l' 이 아닐때 count를 진행하지않고 i++ 부분에서 다시 코드를 진행시킴
}
console.log(count);
// match 메서드와 같은 동작

const regexp = new RegExp(search, 'g')
console.log(string.match(regexp));