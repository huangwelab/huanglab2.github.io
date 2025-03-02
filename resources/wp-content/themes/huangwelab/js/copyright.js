/**
 * 
 */
var $j = jQuery.noConflict();

var copyRight = document.getElementById('copyright');

function setupCopyRight() {
	if (copyRight) {

		const d = new Date();
		let year = d.getFullYear();
		var str = "&copy;" + year + " HUANGWELAB";
		copyRight.innerHTML = str;
	}

}

$j(document).ready(setupCopyRight);