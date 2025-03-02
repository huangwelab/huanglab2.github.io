var newsletterDiv = document.getElementsByClassName('newsletter')[0];
var newsletterLink = document.getElementById('menu-item-1358');
var newsletterResponse = document.getElementsByClassName('mc4wp-alert')[0];
var footer = document.getElementsByClassName('footer')[0];
var footerLinks = footer.getElementsByClassName('menu-item');
var grayedLinks = footer.getElementsByClassName('grayed-out');

newsletterLink.addEventListener("click", newsletterClicked);

function newsletterClicked() {
  if (newsletterDiv) {
    if (newsletterDiv.classList.contains('shown')) {
      newsletterDiv.classList.add('hidden');
      newsletterDiv.classList.remove('shown');
      window.scrollTo(0,document.body.scrollHeight);
      unGrayOutLinks();
    } else if (newsletterDiv.classList.contains('hidden')) {
      newsletterDiv.classList.add('shown');
      newsletterDiv.classList.remove('hidden');
      window.scrollTo(0,document.body.scrollHeight);
      grayOutLinks();
    }
  }
}

if(newsletterResponse) {
  newsletterDiv.classList.add('shown');
  newsletterDiv.classList.remove('hidden');
  window.scrollTo(0,document.body.scrollHeight);
  grayOutLinks();
}

function grayOutLinks() {
  for(var i=0; i< footerLinks.length; i++) {
    if(footerLinks[i]!== newsletterLink) {
      footerLinks[i].getElementsByTagName('a')[0].classList.add('grayed-out');
    }
  }
}

function unGrayOutLinks() {
  grayedLinks = footer.getElementsByClassName('grayed-out');
  for(var i = grayedLinks.length - 1; i >= 0; i--) {
    grayedLinks[i].classList.remove('grayed-out');
  }
}
