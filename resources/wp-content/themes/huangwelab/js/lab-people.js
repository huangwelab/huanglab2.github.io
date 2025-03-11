/**
 * 
 */
var $j = jQuery.noConflict();

var showAll = document.getElementById('input--show-all');

function setupShowAll() {
	if (showAll) {
		$(".people-alumni").show();
		/*showAll.addEventListener('change', (event) => {
			  if (event.currentTarget.checked) {
			    alert('checked');
			  } else {
			    alert('not checked');
			  }
			})*/
	}

}

function showHideAlumni(cb)
{
	if(cb.checked)
		{
		$(".people-alumni").show();
		}
	else
		{
	$(".people-alumni").hide();
		}
}

$j(document).ready(setupShowAll);