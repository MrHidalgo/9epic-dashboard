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

				if ($(elem).closest('.dashboard__subheader').length > 0) {
					$('.leftHandMenu__sidebar .hamburger').addClass('is-active');

					if ($(window).width() < 1279) {
						$('#overlay').fadeIn(500);
					}
				}

				if (elem.classList.contains('is-active')) {
					elem.classList.remove("is-active");
					mobileContainer.classList.remove("is-open");

					$('.leftHandMenu__sidebar-btn').hide();
					$('.leftHandMenu__sidebar .dashboard__logo').hide();

					$('.leftHandMenu__sidebar-btn').removeClass('is-active');
					$('.leftHandMenu__sidebar-collapse-body').slideUp(350);

					$('.dashboard__subheader .hamburger').removeClass('is-active');

					$('#overlay').fadeOut(500);
				} else {
					elem.classList.add("is-active");
					mobileContainer.classList.add("is-open");

					setTimeout(function () {
						$('.leftHandMenu__sidebar-btn').fadeIn(500);
						$('.leftHandMenu__sidebar .dashboard__logo').fadeIn(500);
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
		$('.leftHandMenu__sidebar-circle').on('click', function (ev) {
			if (!$('[hamburger-js]').hasClass('is-active')) {
				$('[hamburger-js]').trigger('click');
				$(ev.currentTarget).closest('.leftHandMenu__sidebar-collapse-cover').find('.leftHandMenu__sidebar-btn').trigger('click');
			} else {
				$(ev.currentTarget).closest('.leftHandMenu__sidebar-collapse-cover').find('.leftHandMenu__sidebar-btn').trigger('click');
			}
		});

		$('.leftHandMenu__sidebar-btn').on('click', function (ev) {
			if ($(ev.currentTarget).hasClass('is-active')) {
				$(ev.currentTarget).removeClass('is-active');

				$(ev.currentTarget).closest('.leftHandMenu__sidebar-collapse-head').siblings('.leftHandMenu__sidebar-collapse-body').slideUp(350);
			} else {
				$('.leftHandMenu__sidebar-btn').removeClass('is-active');
				$(ev.currentTarget).addClass('is-active');

				$('.leftHandMenu__sidebar-collapse-body').slideUp(350);
				$(ev.currentTarget).closest('.leftHandMenu__sidebar-collapse-head').siblings('.leftHandMenu__sidebar-collapse-body').slideDown(350);
			}
		});

		$('.leftHandMenu__sidebar-collapse-body a').on('click', function (ev) {
			$('.leftHandMenu__sidebar-collapse-body a').removeClass('is-active');
			$(ev.currentTarget).addClass('is-active');

			$('.leftHandMenu__sidebar-circle').removeClass('is-open');

			$(ev.currentTarget).closest('.leftHandMenu__sidebar-collapse-cover').find('.leftHandMenu__sidebar-circle').addClass('is-open');

			$('.leftHandMenu__sidebar [hamburger-js]').trigger('click');
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
			var className = ".dashboard__header-dropdown, .leftHandMenu__sidebar, .dashboard__subheader .hamburger";

			if (!$(e.target).closest(className).length) {
				$('.dashboard__header-dropdown-toggle').removeClass('is-active');
				$('.dashboard__header-dropdown-container').removeClass('is-open');

				// SIDEBAR
				$('[hamburger-js]').removeClass("is-active");
				$('[menu-js]').removeClass("is-open");

				$('.leftHandMenu__sidebar-btn').hide().removeClass('is-active');
				$('.leftHandMenu__sidebar .dashboard__logo').hide();
				$('.leftHandMenu__sidebar-collapse-body').slideUp(350);

				$('#overlay').fadeOut(500);
			}
		});
	};

	initNative();
})();

function helperCalcScrollNodeHeight() {
	$('.dashboard__wrapper').css({
		'height': 'calc(' + window.innerHeight + 'px - ' + Number($('.dashboard__header').outerHeight(true)) + 'px)',
		'minHeight': 'calc(' + window.innerHeight + 'px - ' + Number($('.dashboard__header').outerHeight(true)) + 'px)',
		'maxHeight': 'calc(' + window.innerHeight + 'px - ' + Number($('.dashboard__header').outerHeight(true)) + 'px)',
		'marginTop': Number($('.dashboard__header').outerHeight(true))
	});

	$('html, body').css({
		'height': window.innerHeight,
		'minHeight': window.innerHeight,
		'maxHeight': window.innerHeight
	});
}

$(window).on('load', function () {
	setTimeout(function () {
		helperCalcScrollNodeHeight();
	}, 150);

	setTimeout(function () {
		OverlayScrollbars($(".dashboard__wrapper, .leftHandMenu__sidebar-bottom, .dashboard__header-dropdown-container"), {
			className: "os-theme-dark",
			autoUpdate: true,
			overflowBehavior: {
				x: "hidden",
				y: "scroll"
			}
		});
	}, 300);
});

$(window).on('resize', function () {
	helperCalcScrollNodeHeight();
});