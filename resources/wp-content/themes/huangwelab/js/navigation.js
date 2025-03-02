/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
	var header, container, button, menu, links, i, len;

	header = document.getElementsByTagName( 'header' )[0];

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	button = document.getElementById( 'navigation-toggle' );
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );

			button.innerHTML = "Menu";
			header.classList.remove('header--toggled');
		} else {
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );

			button.innerHTML = button.getAttribute("data-xbutton");
			header.classList.add('header--toggled');
		}
	};

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	/**
	 * Toggles `focus` class to allow submenu access on tablets.
	 */
	( function( container ) {
		var touchStartFn, i,
			parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		if ( 'ontouchstart' in window ) {
			touchStartFn = function( e ) {
				var menuItem = this.parentNode, i;

				if ( ! menuItem.classList.contains( 'focus' ) ) {
					e.preventDefault();
					for ( i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem === menuItem.parentNode.children[i] ) {
							continue;
						}
						menuItem.parentNode.children[i].classList.remove( 'focus' );
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( i = 0; i < parentLink.length; ++i ) {
				parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
			}
		}
	}( container ) );
} )();


/**
 * Replaces "English" with "Eng"
 */

var divs = document.getElementsByClassName("qtranxs_text_en");

[].slice.call( divs ).forEach(function ( div ) {
    div.innerHTML = "<span>Eng</span>";
});


/**
 * Set active menu item
 */

var primaryMenu = document.getElementById('primary-menu');
var menuItems = primaryMenu.getElementsByClassName('menu-item');
var body = document.getElementById('body');

var visionClasses = ['page-vision'];
var workClasses = ['page-id-314', 'post-type-archive-work', 'tax-type', 'single-work'];
var peopleClasses = ['post-type-archive-people', 'page-id-599', 'single-people'];
var aboutClasses = ['page-id-21', 'page-id-3116', 'page-id-3117', 'post-type-publications'];
var publicationClasses = ['post-type-publications'];
var newsClasses = ['page-id-1174', 'post-type-archive-news', 'post-type-archive-insights', 'post-type-archive-awards', 'post-type-archive-events', 'single-news', 'single-insights'];
var contactClasses = ['page-id-14'];
var careersClasses = ['page-id-448'];

var currentClassTesting;

//Vision
for (i = 0; i < visionClasses.length; i++) {
	currentClassTesting = visionClasses[i];

	if (body.classList.contains(currentClassTesting)) {
		menuItems[0].classList.add('active');
	}
}

// Work
for (i = 0; i < workClasses.length; i++) {
	currentClassTesting = workClasses[i];

	if (body.classList.contains(currentClassTesting)) {
		menuItems[1].classList.add('active');
	}
}

// People
for (i = 0; i < peopleClasses.length; i++) {
	currentClassTesting = peopleClasses[i];

	if (body.classList.contains(currentClassTesting)) {
		menuItems[2].classList.add('active');
	}
}

// Publications
for (i = 0; i < aboutClasses.length; i++) {
	currentClassTesting = aboutClasses[i];

	if (body.classList.contains(currentClassTesting)) {
		menuItems[3].classList.add('active');
	}
}

// News
for (i = 0; i < newsClasses.length; i++) {
	currentClassTesting = newsClasses[i];

	if (body.classList.contains(currentClassTesting)) {
		menuItems[13].classList.add('active');
	}
}

// Funding
for (i = 0; i < careersClasses.length; i++) {
	currentClassTesting = careersClasses[i];

	if (body.classList.contains(currentClassTesting)) {
		menuItems[4].classList.add('active');
	}
}

// Contact
for (i = 0; i < contactClasses.length; i++) {
	currentClassTesting = contactClasses[i];

	if (body.classList.contains(currentClassTesting)) {
		menuItems[5].classList.add('active');
	}
}


// Scroll sticky menu
var $ = jQuery.noConflict();

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var logoHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 10);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > logoHeight){
        // Scroll Down
        $('.menu--show').removeClass('menu--show').addClass('menu--hide');
				$('.home .header').removeClass('menu--home-reverse');
				$('.menu--home-reverse').removeClass('menu--home-reverse');
				$('.menu--home-reverse-clear').removeClass('menu--home-reverse-clear');

				if($('.featured-video__down-arrow')) {
					$('.featured-video__down-arrow').addClass('hidden');
				}
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
          $('.menu--hide').removeClass('menu--hide').addClass('menu--show');
					$('.home .header').addClass('menu--home-reverse');
					if (st/$(window).height() < .7) {
						$('.home .header').addClass('menu--home-reverse-clear');
					}
        }
    }

    lastScrollTop = st;
}

//Open all external links in a new window
// $(document).ready(function() {

//   var website = window.location.hostname;

//   var internalLinkRegex = new RegExp('^((((http:\\/\\/|https:\\/\\/)(www\\.)?)?'
//                                      + website
//                                      + ')|(localhost:\\d{4})|(\\/.*))(\\/.*)?$', '');

//   $('a').filter(function() {
//     var href = $(this).attr('href');
//     return href != '#' && !internalLinkRegex.test(href);
//   })
//   .each(function() {
//     $(this).attr('target', '_blank');
// 	$(this).attr('rel', 'noopener');
//   });

// });