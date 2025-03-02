var accentImageContainer = document.getElementById('accent-image-container');
var accentImage = document.getElementById('accent-image');
if(accentImage){
var accentImageWidth = accentImage.getBoundingClientRect().width;

function setImageContainerWidth() {
  accentImageContainer.style.width = accentImageWidth + 'px';
}

$j(document).ready(setImageContainerWidth);
}
