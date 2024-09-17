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

/*   parallaxTextElement[0].style.marginTop = value * 2.5 + "px"; */
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

  /* Main Text Box 스크롤 & 고정 */
  const textboxTargetScrollY = 1080;
  if (value < textboxTargetScrollY) {
    parallaxTextElement[0].style.marginTop = value * 2.5 + "px";
    parallaxTextElement[0].style.position = 'absolute';
    parallaxTextElement[0].style.top = 'inherit';
  } else {
    parallaxTextElement[0].style.marginTop = textboxTargetScrollY * 2.5 + "px";
    parallaxTextElement[0].style.position = 'sticky';
    parallaxTextElement[0].style.top = '517.5px';
  }
});
