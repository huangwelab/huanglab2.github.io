jQuery(document).ready(function( $ ) {
  $(window).load(function() {
    $('.flexslider').flexslider({
      slideshow: false,
      controlNav: false,
      directionNav: false
    }).flexsliderManualDirectionControls();
  });
});


var gallerySlides = document.getElementsByClassName('slides');
var currentCounts = document.getElementsByClassName('current-count');
var totalCounts = document.getElementsByClassName('total-count');

function loopThroughEverything() {
  for (i = 0; i < gallerySlides.length; i++) {

    var slidesList = gallerySlides[i].getElementsByTagName('li');

    setCurrentCount(i, slidesList);
    setTotalCount(i, slidesList);
  }
}

function setCurrentCount(i, slidesList) {
  for (x = 0; x < slidesList.length; x++) {
    if (slidesList[x].classList.contains('flex-active-slide')) {
      var currentSlide = x;
    }
  }

  currentCounts[i].innerHTML = currentSlide + 1;
}

function setTotalCount(i, slidesList) {
  totalCounts[i].innerHTML = slidesList.length;
}
