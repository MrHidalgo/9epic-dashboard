"use strict";

/*
*
* ============================
* ============================
*
* Include lib:
*
* - preventBehavior.js;
*
* ============================
* ============================
* */

/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
var initHamburger = function initHamburger() {

	var btn = document.querySelectorAll("[hamburger-js]"),
	    mobileContainer = document.querySelector("[menu-js]");

	/**
   * @description
  */
	if (btn) {
		for (var i = 0; i < btn.length; i++) {
			var b = btn[i];

			b.addEventListener("click", function (ev) {
				var elem = ev.currentTarget;

				if ($(elem).closest('.dashboard__subheader')) {
					$('.dashboard__sidebar .hamburger').addClass('is-active');
					$('#overlay').fadeIn(500);
				}

				if (elem.classList.contains('is-active')) {
					elem.classList.remove("is-active");
					mobileContainer.classList.remove("is-open");

					$('.dashboard__sidebar-btn').hide();
					$('.dashboard__sidebar .dashboard__logo').hide();

					$('.dashboard__sidebar-btn').removeClass('is-active');
					$('.dashboard__sidebar-collapse-body').slideUp(350);

					$('.dashboard__subheader .hamburger').removeClass('is-active');
					$('#overlay').fadeOut(500);

					if ($(window).width() < 768) {
						$('html, body').removeClass('is-hideScroll');
					}
				} else {
					elem.classList.add("is-active");
					mobileContainer.classList.add("is-open");

					if ($(window).width() < 768) {
						$('html, body').addClass('is-hideScroll');
					}

					setTimeout(function () {
						$('.dashboard__sidebar-btn').fadeIn(500);
						$('.dashboard__sidebar .dashboard__logo').fadeIn(500);
					}, 250);
				}
			});
		}
	}
};

/**
 * @name initPreventBehavior
 *
 * @description
 */
var initPreventBehavior = function initPreventBehavior() {

	var link = document.querySelectorAll("a");

	link.forEach(function (val, idx) {

		val.addEventListener("click", function (e) {
			if (val.getAttribute("href") === "#") {
				e.preventDefault();
			}
		});
	});
};

/**
 * @description Document DOM ready.
 */
(function () {
	/*
 * CALLBACK :: start
 * ============================================= */
	var sidebarCB = function sidebarCB() {
		$('.dashboard__sidebar-circle').on('click', function (ev) {
			if (!$('[hamburger-js]').hasClass('is-active')) {
				$('[hamburger-js]').trigger('click');
				$(ev.currentTarget).closest('.dashboard__sidebar-collapse-cover').find('.dashboard__sidebar-btn').trigger('click');
			} else {
				$(ev.currentTarget).closest('.dashboard__sidebar-collapse-cover').find('.dashboard__sidebar-btn').trigger('click');
			}
		});

		$('.dashboard__sidebar-btn').on('click', function (ev) {
			if ($(ev.currentTarget).hasClass('is-active')) {
				$(ev.currentTarget).removeClass('is-active');

				$(ev.currentTarget).closest('.dashboard__sidebar-collapse-head').siblings('.dashboard__sidebar-collapse-body').slideUp(350);
			} else {
				$('.dashboard__sidebar-btn').removeClass('is-active');
				$(ev.currentTarget).addClass('is-active');

				$('.dashboard__sidebar-collapse-body').slideUp(350);
				$(ev.currentTarget).closest('.dashboard__sidebar-collapse-head').siblings('.dashboard__sidebar-collapse-body').slideDown(350);
			}
		});

		$('.dashboard__sidebar-collapse-body a').on('click', function (ev) {
			$('.dashboard__sidebar-collapse-body a').removeClass('is-active');
			$(ev.currentTarget).addClass('is-active');

			$('.dashboard__sidebar-circle').removeClass('is-open');

			$(ev.currentTarget).closest('.dashboard__sidebar-collapse-cover').find('.dashboard__sidebar-circle').addClass('is-open');

			$('[hamburger-js]').trigger('click');
		});
	};

	var dropdownCB = function dropdownCB() {
		$('.dashboard__header-dropdown-toggle').on('click', function (ev) {
			$(ev.currentTarget).toggleClass('is-active');
			$('.dashboard__header-dropdown-container').toggleClass('is-open');
		});

		$('.dashboard__header-dropdown-container a').on('click', function (ev) {
			$('.dashboard__header-dropdown-toggle').removeClass('is-active');
			$('.dashboard__header-dropdown-container').removeClass('is-open');

			$('.dashboard__header-dropdown-toggle span').text($(ev.currentTarget).attr('data-val'));
		});
	};
	/*
 * CALLBACK :: end
 * ============================================= */

	/**
  * @name initNative
  *
  * @description Init all method
  */
	var initNative = function initNative() {
		// default
		initPreventBehavior();
		// ==========================================

		// lib
		initHamburger();
		// ==========================================

		// callback
		sidebarCB();
		dropdownCB();
		// ==========================================

		$('body').on('click', function (e) {
			var className = ".dashboard__header-dropdown, .dashboard__sidebar, .dashboard__subheader .hamburger";

			if (!$(e.target).closest(className).length) {
				$('.dashboard__header-dropdown-toggle').removeClass('is-active');
				$('.dashboard__header-dropdown-container').removeClass('is-open');

				// SIDEBAR
				$('[hamburger-js]').removeClass("is-active");
				$('[menu-js]').removeClass("is-open");
				$('.dashboard__sidebar-btn').hide();
				$('.dashboard__sidebar .dashboard__logo').hide();
				$('.dashboard__sidebar-btn').removeClass('is-active');
				$('.dashboard__sidebar-collapse-body').slideUp(350);

				$('#overlay').fadeOut(500);

				$('html, body').removeClass('is-hideScroll');
			}
		});
	};
	initNative();

	//The passed argument has to be at least a empty object or a object with your desired options
	if ($(window).width() >= 768) {
		$(".dashboard__wrapper, .dashboard__sidebar-bottom, .dashboard__header-dropdown-container").overlayScrollbars({
			className: "os-theme-dark",
			overflowBehavior: {
				x: "hidden",
				y: "scroll"
			}
		});
	}
})();

$(window).on('load', function () {
	if ($(window).width() < 768) {
		$('html, body').removeClass('is-hideScroll');
	}
});