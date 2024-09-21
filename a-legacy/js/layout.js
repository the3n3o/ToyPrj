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
  if (value >= 1279) {
    parallaxCloudBtmElement.style.position = "fixed";
    parallaxCloudBtmElement.style.top = "0px";
    parallaxCloudBtmElement.style.height = "1279px";
    parallaxBgElement.style.top = value * "px";
    parallaxHrzElement.style.top = value * "px";
  } else {
    parallaxCloudBtmElement.style.position = "absolute";
    parallaxCloudBtmElement.style.top = "100%";
    parallaxBgElement.style.top = value * -0.05 + "px";
    parallaxHrzElement.style.top = value * -0.05 + "px";
  }

  /* 스크롤 시 Main Text 스케일 & 투명도 */
  const textBox1 = document.querySelector(".main-text-box.opacity-visible");
  const textBox2 = document.querySelector(".main-text-box.opacity-hidden");

  if (value >= 1000 && value <= 1400) {
    // opacity
    const fadeOutStart = 1000;
    const fadeOutEnd = 1400;
    const progressOpacity =
      (value - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    textBox1.style.opacity = 1 - progressOpacity;
  } else if (value > 1400) {
    textBox1.style.opacity = 0;
    // textBox1.style.visibility = 'hidden';
  } else {
    textBox1.style.opacity = 1;
    // textBox1.style.visibility = 'visible';
  }

  if (value >= 0 && value <= 1400) {
    // scale
    const scaleStart = 0;
    const scaleEnd = 1000;
    const scaleMin = 1.5;
    const scaleMax = 1.7;
    const progressScale =
      scaleMin +
      ((value - scaleStart) / (scaleEnd - scaleStart)) * (scaleMax - scaleMin);
    textBox1.style.transform = `translateY(1.5rem) scale(${progressScale}`;
    // color transition
    const tran1 = document.querySelector(".tran1");
    const startColor = [80, 80, 80];
    const endColor = [128, 0, 128];
    const progressColor = value / 1000;

    const r = Math.round(
      startColor[0] + progressColor * (endColor[0] - startColor[0])
    );
    const g = Math.round(
      startColor[1] + progressColor * (endColor[1] - startColor[1])
    );
    const b = Math.round(
      startColor[2] + progressColor * (endColor[2] - startColor[2])
    );
    tran1.style.color = `rgb(${r}, ${g}, ${b})`;
  } else if (value > 1400) {
    textBox1.style.transform = "translateY(1.5rem) scale(1.7)";
  } else {
    textBox1.style.transform = "translateY(1.5rem) scale(1.5)";
  }

  if (value >= 1500 && value <= 1800) {
    // opacity
    const fadeInStart = 1500;
    const fadeInEnd = 1800;
    const progressOpacity = (value - fadeInStart) / (fadeInEnd - fadeInStart);
    textBox2.style.opacity = progressOpacity;
  } else if (value >= 2400 && value <= 3000) {
    const fadeOutStart = 2400;
    const fadeOutEnd = 3000;
    const progressOpacity =
      (value - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    textBox2.style.opacity = 1 - progressOpacity;
  } else if (value >= 1800 && value <= 2400) {
    textBox2.style.opacity = 1;
    // textBox2.style.visibility = 'visible';
  } else {
    textBox2.style.opacity = 0;
    // textBox2.style.visibility = 'hidden';
  }

  if (value >= 1500 && value <= 3000) {
    // scale
    const scaleStart = 1500;
    const scaleEnd = 3000;
    const scaleMin = 1.5;
    const scaleMax = 1.7;
    const progressScale =
      scaleMin +
      ((value - scaleStart) / (scaleEnd - scaleStart)) * (scaleMax - scaleMin);
    textBox2.style.transform = `translateY(1.5rem) scale(${progressScale})`;
    // color transition
    const tran2 = document.querySelector(".tran2");
    const startColor = [37, 37, 37];
    const endColor = [27, 99, 255];
    let progressColor = 0;
    if (value >= 1500) {
      progressColor = (value - 1500) / 1500;
    }
    const r = Math.round(
      startColor[0] + progressColor * (endColor[0] - startColor[0])
    );
    const g = Math.round(
      startColor[1] + progressColor * (endColor[1] - startColor[1])
    );
    const b = Math.round(
      startColor[2] + progressColor * (endColor[2] - startColor[2])
    );
    tran2.style.color = `rgb(${r}, ${g}, ${b})`;
  } else if (value > 2700) {
    textBox2.style.transform = "translateY(1.5rem) scale(1.7)";
  } else {
    textBox2.style.transform = "translateY(1.5rem) scale(1.5)";
  }

  // 스크롤 다운
  if (value >= 3000 && value <= 3500) {
    const fadeOutStart = 3000;
    const fadeOutEnd = 3500;
    const maxOpacity = 1;
    const minOpacity = 0;
    const progressOpacity =
      maxOpacity -
      ((value - fadeOutStart) / (fadeOutEnd - fadeOutStart)) *
        (maxOpacity - minOpacity);

    scrollDownBoxElement.style.opacity = progressOpacity;
    scrollDownElement.style.display = 'flex';
  } else if (value > 3500) {
    scrollDownBoxElement.style.opacity = 0;
    scrollDownElement.style.display = 'none';
  } else {
    scrollDownBoxElement.style.opacity = 1;
    scrollDownElement.style.display = 'flex';
  }

  if (value >= 3500 && value <= 4000) {
    const fadeOutStart = 3500;
    const fadeOutEnd = 4000;
    const maxOpacity = 1;
    const minOpacity = 0;
    const progressOpacity =
      maxOpacity -
      ((value - fadeOutStart) / (fadeOutEnd - fadeOutStart)) *
        (maxOpacity - minOpacity);

    parallaxElement.style.opacity = Math.max(minOpacity, Math.min(progressOpacity, maxOpacity));
    // bridge
    bridgeTextElement.style.opacity = Math.max(minOpacity, math.min(progressOpacity, maxOpacity));
    bridgeTextElement.style.position = 'fixed';
    bridgeTextElement.style.display = 'block';
  } else if (value > 4000) {
    parallaxElement.style.opacity = 0;
    // bridge
    bridgeTextElement.style.opacity = 1;
    bridgeTextElement.style.position = 'fixed';
    bridgeTextElement.style.display = 'block';
  } else {
    parallaxElement.style.opacity = 1;
    // bridge
    bridgeTextElement.style.opacity = 0;
    bridgeTextElement.style.position = 'fixed';
    bridgeTextElement.style.display = 'none';
  }
});
