// 새로고침 시 최상단에서 스크롤 다운
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';  // 기본 스크롤 복원 동작 비활성화
}

window.addEventListener('load', function() {
  setTimeout(function() {
    window.scrollTo(0, sessionStorage.getItem('scrollPos') || 0);
  }, 1);  // 페이지가 로드된 후 스크롤을 복원 (약간의 딜레이 설정)
});

// 사용자가 페이지를 떠나거나 새로고침할 때 스크롤 위치 저장
window.addEventListener('beforeunload', function() {
  sessionStorage.setItem('scrollPos', window.scrollY);
});


// Top Button
const topBtnElement = document.getElementById("top-btn");

// Parallax
const parallaxElement = document.querySelector('.parallax-box');

const parallaxTextElementRaw = document.getElementsByClassName('main-text');
const parallaxText1Element = parallaxTextElementRaw[0];
const parallaxText2Element = parallaxTextElementRaw[1];
const parallaxTextBoxElementRaw = document.getElementsByClassName('main-text-box');
const parallaxTextBox1Element = parallaxTextBoxElementRaw[0];
const parallaxTextBox2Element = parallaxTextBoxElementRaw[1];

const parallaxBgElement = document.getElementById('cloud-bg');
const parallaxHrzElement = document.getElementById('cloud-hrz');
const parallaxBackLElement = document.getElementById('cloud-back-L');
const parallaxBackRElement = document.getElementById('cloud-back-R');
const parallaxCloud1Element = document.getElementById('cloud1');
const parallaxCloud2LElement = document.getElementById('cloud2-L');
const parallaxCloud2RElement = document.getElementById('cloud2-R');
const parallaxCloud3Element = document.getElementById('cloud3');
const parallaxCloud4Element = document.getElementById('cloud4');
const parallaxCloud5Element = document.getElementById('cloud5');
const parallaxCloudBtmElement = document.getElementById('cloud-btm');

const scrollDownElement = document.querySelector('.scroll-down');
const scrollDownBoxElement = document.querySelector('.scroll-down-box');
