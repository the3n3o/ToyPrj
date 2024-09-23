const display = document.querySelector('input[name="display"]');
const equal = document.querySelector('.equal');

function isValidExpression(expr) {
  const regex = /^[0-9+\-*/().\s]+$/; // 숫자,+,-,*,/,(,),공백만 허용
  return regex.test(expr);
}


equal.addEventListener('click', () => {
  
if (isValidExpression(display.value)) {
  display.value = new Function('return ' + display.value)();
} else {
  alert('유효하지 않은 수식입니다.');
}

})