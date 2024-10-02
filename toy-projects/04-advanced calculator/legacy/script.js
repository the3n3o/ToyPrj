const keys = document.querySelectorAll(".key");
const displayInput = document.querySelector(".input");
const displayOutput = document.querySelector(".output");

let input = ""; // 기본 input

// Key 동작
for (let key of keys) {
  let value = key.dataset.key; // data-key 값

  key.addEventListener("click", () => {
    // 1. Clear 버튼
    if (value == "clear") {
      // 클릭한 key의 data-key 값이 clear일 경우
      input = ""; // input 값 초기화
      displayInput.innerHTML = input; // Display Input 내용 초기화
      displayOutput.innerHTML = input; // Display Output 내용 초기화
    }
    // 2. Brackets 버튼
    else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 || // '(' 이 없거나
        (input.indexOf("(") != -1 && // '(' 이 있으면서
          input.indexOf(")") != -1 && // ')' 이 있으면서
          input.lastIndexOf("(") < input.lastIndexOf(")")) // '(' 보다 ')' 이 더 뒤에 나왔을 때, 즉 ')'이 마지막으로 나왔을 때
      ) {
        input += "("; // input에 '('를 추가한다.
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) || // '(' 이 있으면서 ')' 는 없을 때
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")")) // '(' 와 ')' 이 존재할 때 '(' 이 마지막으로 나온 경우
      ) {
        input += ")"; // input에 ')'를 추가한다.
      }
      displayInput.innerHTML = cleanInput(input);
    }
    // 3. Backspace 버튼
    else if (value == "backspace") {
      input = input.slice(0, -1);
      // slice(start, end); , start에서 end까지 반환, 음수를 사용할 경우 끝에서부터 인덱스 계산
      // slice(0, -1); 의 경우 0번째부터 -1(끝에서 -1 인덱스)번째 까지, 즉 마지막 요소를 제외하고 반환
      displayInput.innerHTML = cleanInput(input);
    }
    // 4. = 버튼
    else if (value == "=") {
      let result = new Function("return " + perpareInput(input))();
      displayOutput.innerHTML = cleanOutput(formatDecimal(result));
    }
    // 5. 그 외 버튼
    else {
      if (validateInput(value)) {
      input += value;
      displayInput.innerHTML = cleanInput(input);
      }
    }
  });
}

// Display Input Make-up
function cleanInput(input) {
  let inputArray = input.split(""); // input 문자열을 array 형태로 쪼개줌
  let inputArrayLength = inputArray.length;

  for (let i = 0; i < inputArrayLength; i++) {
    if (inputArray[i] == "*") {
      inputArray[i] = ' <span class="operator">x</span> ';
    } else if (inputArray[i] == "/") {
      inputArray[i] = ' <span class="operator">÷</span> ';
    } else if (inputArray[i] == "-") {
      inputArray[i] = ' <span class="operator">-</span> ';
    } else if (inputArray[i] == "+") {
      inputArray[i] = ' <span class="operator">+</span> ';
    } else if (inputArray[i] == "(") {
      inputArray[i] = ' <span class="action">(</span> ';
    } else if (inputArray[i] == ")") {
      inputArray[i] = ' <span class="action">)</span> ';
    } else if (inputArray[i] == "%") {
      inputArray[i] = ' <span class="action">%</span> ';
    }
  }

  return inputArray.join("");
}

// 쉼표구현
function cleanOutput(output) {
  let outputString = output.toString(); // output 의 type을 문자열로
  let outputInteger = outputString.split(".")[0]; // .을 기준으로 배열화 했을 때 0번째 인덱스는 정수
  let decimal = outputString.split(".")[1]; // .을 기준으로 배열화 했을 때 1번째 인덱스는 소수

  let outputArray = outputInteger.split(""); // 정수를 배열로 쪼개기

  // 정수에 쉼표 추가
  if (outputArray.length > 3) {
    // 정수가 1000 자리수 이상일 때
    for (let i = outputArray.length - 3; i > 0; i -= 3) {
      // i를 3씩 -
      outputArray.splice(i, 0, ","); // 천 단위로 쉼표 요소 추가
    }
  }

  // 정수 array에 소수를 뒤에 추가
  if (decimal) {
    // 소수가 있다면 decimal은 true, 없다면 undefined 처리되어서 false를 반환
    outputArray.push("."); // . 요소를 배열 끝에 추가
    outputArray.push(decimal); // 그 뒤에 decimal 숫자 추가
  }

  return outputArray.join(""); // 배열로 쪼개놓은것을 문자열로 합침
}

// Validate
function validateInput(value) {
  let lastInput = input.slice(-1); // 마지막 인풋요소
  let operator = ["+", "-", "*", "/"];

  if (value == "." && lastInput == ".") {
    // .을 눌렀을 때 마지막 문자가 .이라면 (즉, 중복된다면)
    return false;
  }

  if (value == "%" && lastInput == "%") {
    return false;
  }

  if (operator.includes(value)) {
    // 누른 value가 operator 배열에 포함되어있다면,
    if (operator.includes(lastInput)) {
      // 마지막 문자가 operator 에 포함되어있다면,
      return false;
    } else {
      return true;
    }
  }

  return true; // 위 경우 외에는 모두 true
}

// % 처리
function perpareInput(input) {
  let inputArray = input.split('');

  for(i = 0; i <= inputArray.length; i++) {
    if (inputArray[i] == '%') {
      inputArray[i] = '/100';
    }
  }

  return inputArray.join('');
}

// 순환소수 처리
function formatDecimal(output) {
  let outputString = output.toString(); // 문자화
  let outputDecimal = outputString.split('.')[1]; // 소수부분

  if (outputDecimal) {
    // 소수가 있다면
    if (outputDecimal.length > 6) {
      // 소수가 6자리가 넘으면 반올림
      output = parseFloat(output.toFixed(6));
    }
  }
  
  return output;
}

// parseFloat이 8진수로 인식하는 경우
