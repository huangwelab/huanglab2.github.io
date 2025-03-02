var $j = jQuery.noConflict();

var slider = document.getElementById("instagram-slider");
var ul = slider.getElementsByTagName('ul')[0];
var listItems = slider.getElementsByTagName('li');
var leftArrow = document.getElementById('left-arrow');
var rightArrow = document.getElementById('right-arrow');
var screenSize = window.innerWidth;

var i = 0;

while (i < listItems.length) {
  // Assign classes for original list item orders
  listItems[i].classList.add("item-" + i);

  // Assign ids for order (which will change)
  listItems[i].id = "order-" + (i + 2);

  if (i == (listItems.length - 2)) {
    listItems[i].id = "order-" + 0;
  } else if (i == (listItems.length - 1)) {
    listItems[i].id = "order-" + 1;
  }

i++;
}

leftArrow.addEventListener("click", slideBack);
rightArrow.addEventListener("click", slideForward);
window.addEventListener("resize", evaluateOrder);

function slideBack() {
  var i = 0;

  while (i < listItems.length) {
    var currentItemId = listItems[i].id;
    var numberString = currentItemId.split('-').pop();
    var number = Number(numberString);
    var newNumber = (number + 1)%listItems.length;

    listItems[i].id = "order-" + newNumber;

    i++;
  }

  evaluateOrder();
}

function slideForward() {
  var i = 0;

  while (i < listItems.length) {
    var currentItemId = listItems[i].id;
    var numberString = currentItemId.split('-').pop();
    var number = Number(numberString);
    var newNumber = (number - 1);

    if (newNumber == -1) {
      newNumber = listItems.length - 1;
    }

    listItems[i].id = "order-" + newNumber;

    i++;
  }

  evaluateOrder();
}

function evaluateOrder() {
  screenSize = window.innerWidth;
  var nextOnLeft;
  var nextOnRight;
  var lastItem = document.getElementsByClassName("item-11")[0];
  var firstItem = document.getElementsByClassName("item-0")[0];

  i = 0;

  while (i < listItems.length) {
    listItems[i].classList.remove('next-on-left');
    listItems[i].classList.remove('next-on-right');
    i++;
  }

  if (screenSize >= 768) {
    nextOnLeft = document.getElementById("order-1");
  } else {
    return;
  }

  if (screenSize >= 768 && screenSize < 992) {
    nextOnRight = document.getElementById("order-4");
  } else if (screenSize >= 992 && screenSize < 1350) {
    nextOnRight = document.getElementById("order-5");
  } else if (screenSize >= 1350 && screenSize < 1600) {
    nextOnRight = document.getElementById("order-6");
  } else if (screenSize >= 1600) {
    nextOnRight = document.getElementById("order-7");
  } else {
    return;
  }

  nextOnLeft.classList.add('next-on-left');
  nextOnRight.classList.add('next-on-right');

  if (nextOnLeft == lastItem) {
    lastItem.classList.add('hidden');
    leftArrow.classList.add('hidden');

  } else {
    lastItem.classList.remove('hidden');
    leftArrow.classList.remove('hidden');
  }

  if (nextOnRight == firstItem) {
    firstItem.classList.add('hidden');
    rightArrow.classList.add('hidden');
  } else {
    firstItem.classList.remove('hidden');
    rightArrow.classList.remove('hidden');
  }
}

$j(document).ready(evaluateOrder);
