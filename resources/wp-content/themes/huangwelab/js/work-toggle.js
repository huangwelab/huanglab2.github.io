var $j = jQuery.noConflict();

var radioWork = document.getElementById('radio--work');
var inputRandom = document.getElementById('input--random');
var inputAlphabetical = document.getElementById('input--alphabetical');
var inputLocation = document.getElementById('input--location');
var divAlphabetical = document.getElementById('projects--alphabetical');
var divLocation = document.getElementById('projects--location');


function whichWorkChecked() {
  if (radioWork) {
	  var divRandom = document.getElementById('projects--random');
	if (inputRandom.checked) {
	  divRandom.classList.remove('hidden');
	  divLocation.classList.add('hidden');
      divAlphabetical.classList.add('hidden');
	} else if (inputAlphabetical.checked) {
      divLocation.classList.add('hidden');
	  divRandom.classList.add('hidden');
      divAlphabetical.classList.remove('hidden');
    } else if (inputLocation.checked) {
      divAlphabetical.classList.add('hidden');
	  divRandom.classList.add('hidden');
      divLocation.classList.remove('hidden');
    }
  }
}

if (radioWork) {
  inputRandom.addEventListener("click", whichWorkChecked);
  inputAlphabetical.addEventListener("click", whichWorkChecked);
  inputLocation.addEventListener("click", whichWorkChecked);
}

$j(document).ready(whichWorkChecked);
