/**
 * 
 */
var $j = jQuery.noConflict();

var showAll = document.getElementById('input--show-all');

function setupShowAll() {
	if (showAll) {

		showAll.addEventListener('change', (event) => {
			  if (event.currentTarget.checked) {
			    alert('checked');
			  } else {
			    alert('not checked');
			  }
			})
	}

}

$j(document).ready(setupShowAll);