var $j = jQuery.noConflict();

var radioPeople = document.getElementById('radio--people');
var inputRandom = document.getElementById('input--random');
var inputAlphaFirst = document.getElementById('input--alpha-first');
var inputAlphaLast = document.getElementById('input--alpha-last');
var divRandom = document.getElementById('people--random');
var divAlphaFirst = document.getElementById('people--alpha-first');
var divAlphaLast = document.getElementById('people--alpha-last');
var checkShowAll = document.getElementById('input--show-all');

function whichPeopleChecked() {
  if (radioPeople) {
    if (inputRandom.checked) {
      divRandom.classList.remove('hidden');
      divAlphaFirst.classList.add('hidden');
      divAlphaLast.classList.add('hidden');
    } else if (inputAlphaFirst.checked) {
      divAlphaFirst.classList.remove('hidden');
      divAlphaLast.classList.add('hidden');
      divRandom.classList.add('hidden');
    } else if (inputAlphaLast.checked) {
      divAlphaLast.classList.remove('hidden');
      divAlphaFirst.classList.add('hidden');
      divRandom.classList.add('hidden');
    }
    
    if(checkShowAll.checked)
    	{
    	document.getElementByClassName("people-alumni").style.display="none";
    	}
    else
    	{
    	document.getElementByClassName("people-alumni").style.display="hidden";
    	}
  }
  
  
}

if (radioPeople) {
  console.log("listening");
  inputRandom.addEventListener("click", whichPeopleChecked);
  inputAlphaFirst.addEventListener("click", whichPeopleChecked);
  inputAlphaLast.addEventListener("click", whichPeopleChecked);
  checkShowAll.addEventListener("change",whichPeopleChecked);
}

$j(document).ready(whichPeopleChecked);
