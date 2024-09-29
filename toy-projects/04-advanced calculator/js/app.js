const keys = document.querySelectorAll(".key");
const displayInput = document.querySelector(".display .input");
const displayOutput = document.querySelector(".display .output");

let input = "";

////// 각 key들의 동작 //////
for (let key of keys) {
  const value = key.dataset.key;
  // data-key 값

  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      displayInput.innerHTML = "";
      displayOutput.innerHTML = "";
    } else if (value == "backspace") {
      input = input.slice(0, -1);
      displayInput.innerHTML = cleanInput(input);
    } else if (value == "=") {
      let result = new Function('return ' + input)();
      // 원래 eval(input); 으로 작성되었다. input으로 들어가는 값만 eval해주니 적당히 안전하다고 하지만 new Function으로 구현.
      displayOutput.innerHTML = cleanOutput(result);
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 || // '(' 이 없거나
        (input.indexOf("(") != -1 && // '(' 이 존재하고
          input.indexOf(")") != -1 && // ')' 도 존재하며
          input.lastIndexOf("(") < input.lastIndexOf(")")) // ')' 이 마지막으로 끝났을 때 [즉 '(' 으로 열려있지 않은 상태일때]
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) || // '(' 이 있으면서 ')'으로 안닫혀있을 때
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")")) // '(' 와 ')' 가 이미 존재할때 '('이 마지막에 나오는 경우
      ) {
        input += ")";
      }
      displayInput.innerHTML = cleanInput(input);
    } else {
      input += value;
      displayInput.innerHTML = cleanInput(input);
    }
  });
}

////// Input에 연산기호들 make-up 해주고 공백 넣어줌 //////
function cleanInput(input) {
  let inputArray = input.split('');
  let inputArrayLength = inputArray.length;

  for (let i = 0; i < inputArrayLength; i++){
    if (inputArray[i] == '*') {
      inputArray[i] = ' <span class="operator">x</span> '
    }
    else if (inputArray[i] == '/') {
      inputArray[i] = ' <span class="operator">÷</span> '
    }
    else if (inputArray[i] == '+') {
      inputArray[i] = ' <span class="operator">+</span> '
    }
    else if (inputArray[i] == '-') {
      inputArray[i] = ' <span class="operator">-</span> '
    }
    else if (inputArray[i] == '(') {
      inputArray[i] = ' <span class="brackets">(</span> '
    }
    else if (inputArray[i] == ')') {
      inputArray[i] = ' <span class="brackets">)</span> '
    }
    else if (inputArray[i] == '%') {
      inputArray[i] = ' <span class="percent">%</span> '
    }
  }

  return  inputArray.join('');
}

////// 쉼표 추가와 소숫점 구현 //////
function cleanOutput(output) {
  let outputString = output.toString();
  let decimal = outputString.split('.')[1]; // 소수점 이하 부분
  outputString = outputString.split('.')[0]; // 소수점 이상 부분

  let outputArray = outputString.split('');

  // 정수부분 쉼표 추가
  if (outputArray.length > 3) { // 1000 이상일 경우 쉼표 추가
    for (let i = outputArray.length - 3; i > 0; i -= 3) {
      outputArray.splice(i, 0, ',');
    }
  }

  // 쉼표가 추가된 정수부분에 소수점과 소수를 합쳐줌
  if (decimal) { // decimal이 undefined 이면 false
    outputArray.push('.'); // 소수점 이상 배열에 . 을 추가
    outputArray.push(decimal); // 그 뒤에 소숫점 이하 부분 추가
  }

  // 해당 array들을 합쳐준다.
  return outputArray.join('');
}

// 36:00