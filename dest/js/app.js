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

	var btn = document.querySelector("[hamburger-js]"),
	    mobileContainer = document.querySelector("[menu-js]");

	/**
   * @description
  */
	if (btn) {
		btn.addEventListener("click", function (ev) {
			var elem = ev.currentTarget;

			if (elem.classList.contains('is-active')) {
				elem.classList.remove("is-active");
				mobileContainer.classList.remove("is-open");

				$('.dashboard__sidebar-btn').hide();
				$('.dashboard__sidebar .dashboard__logo').hide();
			} else {
				elem.classList.add("is-active");
				mobileContainer.classList.add("is-open");

				setTimeout(function () {
					$('.dashboard__sidebar-btn').fadeIn(500);
					$('.dashboard__sidebar .dashboard__logo').fadeIn(500);
				}, 250);
			}
		});
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
			$('[hamburger-js]').trigger('click');
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
		// ==========================================
	};
	initNative();
})();