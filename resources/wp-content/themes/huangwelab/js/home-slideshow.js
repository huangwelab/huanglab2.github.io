var slides = document.querySelectorAll('.slideshow__item__photo');
var videoSlides = document.querySelectorAll('.slideshow__item__photo--video');
var titles = document.querySelectorAll('.slideshow__item__title');
var dots = document.querySelectorAll('.dot');
var enhanceSlogans = document.querySelectorAll('.slogan__img--enhance');
var empowerSlogans = document.querySelectorAll('.slogan__img--empower');
var currentSlide = 0;
var nextSlide;
var slideInterval = setInterval(changeSlides,6000);

function changeSlides(i) {
  slides[currentSlide].className = 'slideshow__item__photo prev';
  titles[currentSlide].className = 'slideshow__item__title';
  dots[currentSlide].className = 'dot';

  enhanceSlogans[currentSlide].className = 'slogan__img--enhance';
  empowerSlogans[currentSlide].className = 'slogan__img--empower';

  if (i == 0 || i) {
    currentSlide = i;
    nextSlide = (i+1)%slides.length;
  } else {
    currentSlide = (currentSlide+1)%slides.length;
    nextSlide = (currentSlide+2)%slides.length;
  }

  slides[currentSlide].className = 'slideshow__item__photo showing';
  slides[nextSlide].className = 'slideshow__item__photo next';
  titles[currentSlide].className = 'slideshow__item__title showing';
  dots[currentSlide].className = 'dot current';
  enhanceSlogans[currentSlide].className = 'slogan__img--enhance showing';
  empowerSlogans[currentSlide].className = 'slogan__img--empower showing';

  clearInterval(slideInterval);
  slideInterval = setInterval(changeSlides, 6000);
}

for(var i=0; i< dots.length; i++) {
      dots[i].addEventListener("click", dotClicked(i));
}

function dotClicked(i) {
  return function() {
    var currentSlide = i;
    changeSlides(i);
  };
}

function showVideoNextTime(slide) {
  let interval = setInterval(function() {
    if(!slide.classList.contains('showing')) {
      slide.querySelector('.featured-video').classList.remove('hidden-mobile');
      clearInterval(interval);
    }
  }, 6000);
}

videoSlides.forEach(function(slide) {
  slide.querySelector('video').addEventListener('canplaythrough', function(evt) {
    showVideoNextTime(slide);
  });
});
