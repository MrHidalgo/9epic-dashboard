/**
 * @description Document DOM ready.
 */
(function () {
	/*
	* CALLBACK :: start
	* ============================================= */
	const sidebarCB = () => {
		$('.dashboard__sidebar-circle').on('click', (ev) => {
			if(!$('[hamburger-js]').hasClass('is-active')) {
				$('[hamburger-js]').trigger('click');
				$(ev.currentTarget)
					.closest('.dashboard__sidebar-collapse-cover')
					.find('.dashboard__sidebar-btn')
					.trigger('click');
			} else {
				$(ev.currentTarget)
					.closest('.dashboard__sidebar-collapse-cover')
					.find('.dashboard__sidebar-btn')
					.trigger('click');
			}
		});
		
		$('.dashboard__sidebar-btn').on('click', (ev) => {
			if($(ev.currentTarget).hasClass('is-active')) {
				$(ev.currentTarget).removeClass('is-active');
				
				$(ev.currentTarget)
					.closest('.dashboard__sidebar-collapse-head')
					.siblings('.dashboard__sidebar-collapse-body').slideUp(350);
			} else {
				$('.dashboard__sidebar-btn').removeClass('is-active');
				$(ev.currentTarget).addClass('is-active');
				
				$('.dashboard__sidebar-collapse-body').slideUp(350);
				$(ev.currentTarget)
					.closest('.dashboard__sidebar-collapse-head')
					.siblings('.dashboard__sidebar-collapse-body').slideDown(350);
			}
		});
		
		$('.dashboard__sidebar-collapse-body a').on('click', (ev) => {
			$('.dashboard__sidebar-collapse-body a').removeClass('is-active');
			$(ev.currentTarget).addClass('is-active');
			
			$('.dashboard__sidebar-circle').removeClass('is-open');
			
			$(ev.currentTarget)
				.closest('.dashboard__sidebar-collapse-cover')
				.find('.dashboard__sidebar-circle')
				.addClass('is-open');
			
			$('[hamburger-js]').trigger('click');
		});
	};
	
	
	const dropdownCB = () => {
		$('.dashboard__header-dropdown-toggle').on('click', (ev) => {
			$(ev.currentTarget).toggleClass('is-active');
			$('.dashboard__header-dropdown-container').toggleClass('is-open');
		});
		
		$('.dashboard__header-dropdown-container a').on('click', (ev) => {
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
	const initNative = () => {
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
			const className = ".dashboard__header-dropdown, .dashboard__sidebar, .dashboard__subheader .hamburger";
			
			if (!$(e.target).closest(className).length) {
				$('.dashboard__header-dropdown-toggle').removeClass('is-active');
				$('.dashboard__header-dropdown-container').removeClass('is-open');
				
				// SIDEBAR
				$('[hamburger-js]').removeClass("is-active");
				$('[menu-js]').removeClass("is-open");
				
				$('.dashboard__sidebar-btn').hide().removeClass('is-active');
				$('.dashboard__sidebar .dashboard__logo').hide();
				$('.dashboard__sidebar-collapse-body').slideUp(350);
				
				$('#overlay').fadeOut(500);
			}
		});
	};
	
	initNative();
})();

function helperCalcScrollNodeHeight() {
	$('.dashboard__wrapper').css({
		'minHeight': 'calc(100vh - ' + Number($('.dashboard__header').outerHeight(true)) + 'px)',
		'maxHeight': 'calc(100vh - ' + Number($('.dashboard__header').outerHeight(true)) + 'px)',
		'marginTop': Number($('.dashboard__header').outerHeight(true)),
	});
}

$(window).on('load', () => {
	helperCalcScrollNodeHeight();
	
	OverlayScrollbars($(".dashboard__wrapper, .dashboard__sidebar-bottom, .dashboard__header-dropdown-container"), {
		className : "os-theme-dark",
		autoUpdate: true,
		overflowBehavior: {
			x : "hidden",
			y : "scroll"
		}
	});
});

$(window).on('resize', () => {
	helperCalcScrollNodeHeight();
});
