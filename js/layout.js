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

window.addEventListener('scroll', () => {
  let value = window.scrollY;

  parallaxTextElement[0].style.marginTop = value * 2.5 + 'px';
  parallaxCloud1Element.style.top = value * -0.5 + 'px';
  parallaxCloud2LElement.style.left = value * -0.5 + 'px';
  parallaxCloud2RElement.style.left = value * 0.3 + 'px';
  parallaxCloud3Element.style.left = value * 0.1 + 'px';
  parallaxCloud4Element.style.left = value * -0.1 + 'px';
  parallaxBackLElement.style.left = value * -0.1 + 'px';
  parallaxBackRElement.style.left = value * 0.1 + 'px';
  parallaxCloud5Element.style.left = value * -0.2 + 'px';

  parallaxBgElement.style.top = value * -0.05 + 'px';
  parallaxHrzElement.style.top = value * -0.05 + 'px';

});