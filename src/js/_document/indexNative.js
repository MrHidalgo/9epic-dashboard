/**
 * @description Document DOM ready.
 */
(function () {
	/*
	* CALLBACK :: start
	* ============================================= */
	const sidebarCB = () => {
		$('.leftHandMenu__sidebar-circle').on('click', (ev) => {
			if(!$('[hamburger-js]').hasClass('is-active')) {
				$('[hamburger-js]').trigger('click');
				$(ev.currentTarget)
					.closest('.leftHandMenu__sidebar-collapse-cover')
					.find('.leftHandMenu__sidebar-btn')
					.trigger('click');
			} else {
				$(ev.currentTarget)
					.closest('.leftHandMenu__sidebar-collapse-cover')
					.find('.leftHandMenu__sidebar-btn')
					.trigger('click');
			}
		});
		
		$('.leftHandMenu__sidebar-btn').on('click', (ev) => {
			if($(ev.currentTarget).hasClass('is-active')) {
				$(ev.currentTarget).removeClass('is-active');
				
				$(ev.currentTarget)
					.closest('.leftHandMenu__sidebar-collapse-head')
					.siblings('.leftHandMenu__sidebar-collapse-body').slideUp(350);
			} else {
				$('.leftHandMenu__sidebar-btn').removeClass('is-active');
				$(ev.currentTarget).addClass('is-active');
				
				$('.leftHandMenu__sidebar-collapse-body').slideUp(350);
				$(ev.currentTarget)
					.closest('.leftHandMenu__sidebar-collapse-head')
					.siblings('.leftHandMenu__sidebar-collapse-body').slideDown(350);
			}
		});
		
		$('.leftHandMenu__sidebar-collapse-body a').on('click', (ev) => {
			$('.leftHandMenu__sidebar-collapse-body a').removeClass('is-active');
			$(ev.currentTarget).addClass('is-active');
			
			$('.leftHandMenu__sidebar-circle').removeClass('is-open');
			
			$(ev.currentTarget)
				.closest('.leftHandMenu__sidebar-collapse-cover')
				.find('.leftHandMenu__sidebar-circle')
				.addClass('is-open');
			
			$('.leftHandMenu__sidebar [hamburger-js]').trigger('click');
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
			const className = ".dashboard__header-dropdown, .leftHandMenu__sidebar, .dashboard__subheader .hamburger";
			
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
		'marginTop': Number($('.dashboard__header').outerHeight(true)),
	});
	
	$('html, body').css({
		'height': window.innerHeight,
		'minHeight': window.innerHeight,
		'maxHeight': window.innerHeight
	});
}

$(window).on('load', () => {
	setTimeout(() => {
		helperCalcScrollNodeHeight();
	}, 150);
	
	setTimeout(() => {
		OverlayScrollbars($(".dashboard__wrapper, .leftHandMenu__sidebar-bottom, .dashboard__header-dropdown-container"), {
			className : "os-theme-dark",
			autoUpdate: true,
			overflowBehavior: {
				x : "hidden",
				y : "scroll"
			}
		});
	}, 300);
});

$(window).on('resize', () => {
	helperCalcScrollNodeHeight();
});
