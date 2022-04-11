'use strict';
////////////////////Selecting From DOM//////////////////////
const sliderContainer = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const buttonsContainer = document.querySelector('.slider__btns');
const dotContainer = document.querySelector('.dots');
const overlay = document.querySelector('.loading__overlay');
//////////////////////////////////////////////////////////
overlay.remove();

const slider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;
  overlay.classList.remove('loading__overlay');
  overlay.remove();

  ////////////////////Functions //////////////////////
  const activateDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(d => d.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const creatDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `
        <button class="dots__dot" data-slide = "${i}" ></button>`
      );
    });
  };
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      console.log(slide);
    });
    activateDots(slide);
  };
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };
  const highlightBtn = function (e) {
    e.preventDefault();
    const targetBtn = e.target;
    if (!targetBtn.classList.contains('btn')) return;
    if (targetBtn.classList.contains('highlight__btn')) {
      targetBtn.classList.remove('highlight__btn');
    } else {
      targetBtn.classList.add('highlight__btn');
    }
  };
  const sliderBTN = function (e) {
    e.preventDefault();
    const targetBtn = e.target;
    if (targetBtn.classList.contains('slide__btn--left')) {
      prevSlide();
    } else if (targetBtn.classList.contains('slide__btn--right')) {
      nextSlide();
    }
  };
  const init = function () {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * i}%)`;
    });
    creatDots();
    activateDots(curSlide);
  };
  init();
  ////////////////////Events //////////////////////
  buttonsContainer.addEventListener('click', sliderBTN);
  buttonsContainer.addEventListener('mouseover', highlightBtn);
  buttonsContainer.addEventListener('mouseout', highlightBtn);
  dotContainer.addEventListener('click', function (e) {
    e.preventDefault();
    const targetDot = e.target;
    if (!targetDot.classList.contains('dots__dot')) return;
    const { slide } = targetDot.dataset;
    goToSlide(slide);
    activateDots(slide);
  });
};
// loading webpage
document.addEventListener('DOMContentLoaded', slider);
