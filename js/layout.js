/* Back to top button */

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //body.scrollTOP => For Safari || documentElement.scrollTop => Chrome,Firefox,IE and Opera
    topBtnElement.style.visibility = "visible";
    topBtnElement.style.opacity = "1";
  } else {
    topBtnElement.style.opacity = "0";
    // opacity 트렌지션이 끝난 후 visibility를 hidden 으로 설정

    setTimeout(function () {
      if (topBtnElement.style.opacity === "0") {
        topBtnElement.style.visibility = "hidden";
      }
    }, 300); // opacity 트랜지션 시간 (0.3s) 와 동일하게 setTimeout 설정
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/* Parallax */

window.addEventListener("scroll", () => {
  let value = window.scrollY;

  /*   parallaxTextBox1Element.style.marginTop = value * 2.5 + "px"; */
  parallaxCloud1Element.style.top = value * -0.5 + "px";
  parallaxCloud2LElement.style.left = value * -0.5 + "px";
  parallaxCloud2RElement.style.left = value * 0.3 + "px";
  parallaxCloud3Element.style.left = value * 0.5 + "px";
  parallaxCloud4Element.style.left = value * -0.2 + "px";
  parallaxBackLElement.style.left = value * -0.2 + "px";
  parallaxBackRElement.style.left = value * 0.2 + "px";
  parallaxCloud5Element.style.left = value * -0.4 + "px";

  /* Cloud bottom & Bg,Hrz 고정 */
  if (value >= 1415) {
    parallaxCloudBtmElement.style.position = "fixed";
    parallaxCloudBtmElement.style.top = "-70px";
    parallaxCloudBtmElement.style.height = "1349px";
    parallaxBgElement.style.top = value * "px";
    parallaxHrzElement.style.top = value * "px";
  } else {
    parallaxCloudBtmElement.style.position = "absolute";
    parallaxCloudBtmElement.style.top = "100%";
    parallaxBgElement.style.top = value * -0.05 + "px";
    parallaxHrzElement.style.top = value * -0.05 + "px";
  }

  /* 스크롤 시 Main Text 스케일 & 투명도 */

  // Scale은 10번의 스크롤 (scrollY = 1000) 동안 스케일업
  // opacity는 2번의 스크롤 (scrollY = 200) 동안 0
  const textBox1 = 1000;
  const textBox2 = 1400;
  // 스케일이 최고로 커졌을때를 나타내는 방법?
  // clampedScale 이 maxScale 이 되었을 때의 "최초" scrollY 를 추출하고 그값을 currentMaxScaleScrollY에 배열로 storage 하고 clampedScale을 사용할때마다 index가 1씩 증가하게 할 수 있을까?
  // 그렇다면 scale = minScale + ((value - currentMaxScaleScroll[1씩증가]) / 1000); 이 될 듯

  let initMinScale = 0;
  let initMaxScale = 0;
  let initSpeed = 0;
  let initStartPoint = 0;
  const minOpacity = 1;
  const maxOpacity = 0;

  function initSpec(minScale, maxScale, speed, startPoint) {
    initMinScale = minScale;
    initMaxScale = maxScale;
    initSpeed = speed;
    initStartPoint = startPoint;
  }

  initSpec(1.5, 1.7, 5000, textBox1);

  let scale = 0;
  function scaling() {
    scale = initMinScale + value / initSpeed;
    return scale;
  }
  scaling();

  let clampedScale = 0;
  function clampedScaling() {
    clampedScale = Math.min(Math.max(scale, initMinScale), initMaxScale);
    return clampedScale;
  }
  clampedScaling();

  let refScale = 0;
  function refScaling() {
    refScale = initMinScale + (value - initStartPoint) / 2000;
    return refScale;
  }
  refScaling();

  let refClampedScale = 0;
  function refClampedScaling() {
    refClampedScale = Math.min(Math.max(refScale, initMinScale), initMaxScale);
  }
  refClampedScaling();

  function calScaling() {
    scaling();
    clampedScaling();
    refScaling();
    refClampedScaling();
  }
  calScaling();

  let opacity;
  if (refClampedScale <= initMaxScale) {
    opacity =
      maxOpacity +
      (initMaxScale - refClampedScale) / (initMaxScale - initMinScale);
    // maxScale - minScale 은 유동적 스케일의 전체 범위를 뜻하고 이것을 분모로 두고 분자에 maxScale - refClampedScale 을 두어 현재 스케일이 최대 스케일대비 몇% 정도인지 알 수 있음
  } else {
    opacity = minOpacity;
  }

  /* 첫번째 텍스트 */
  parallaxTextBox1Element.style.transform = `translateY(3rem) scale(${clampedScale})`;
  parallaxTextBox1Element.style.opacity = opacity;
  /* 두번째 텍스트 */
  initSpec(1.5, 1.7, 5000, textBox2);
  calScaling();
  parallaxTextBox2Element.style.transform = `translateY(3rem) scale(${clampedScale})`;
  parallaxTextBox2Element.style.opacity = opacity;
});
