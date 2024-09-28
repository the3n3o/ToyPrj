const keys = document.querySelectorAll(".keys");
const displayInput = document.querySelector(".display .input");
const displayOutput = document.querySelector(".display .output");

let input = "";

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
      displayInput.innerHTML = input;
    } else if (value == "=") {
      let result = eval(input);
      // input으로 들어가는 값만 eval해주니 적당히 안전하다는 하지만 new Function 으로도 적용해보기

      displayOutput.innerHTML = result;
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 || // '(' 이 없거나
        input.indexOf("(") != -1 && // '(' 이 존재하고
        input.indexOf(")") != -1 && // ')' 도 존재하며
        input.lastIndexOf("(") < input.lastIndexOf(")")) // ')' 이 마지막으로 끝났을 때 [즉 '(' 으로 열려있지 않은 상태일때]
       {
        input += "(";
      }
    }
  });
}
