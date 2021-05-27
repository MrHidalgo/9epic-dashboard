/**
 * @description Document DOM ready.
 */
(function () {
	/*
	* CALLBACK :: start
	* ============================================= */
	const sidebarCB = () => {
		$('.dashboard__sidebar-circle').on('click', (ev) => {
			$('[hamburger-js]').trigger('click');
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
	};
	
	
	const dropdownCB = () => {
		$('.dashboard__header-dropdown-toggle').on('click', (ev) => {
			$('.dashboard__header-dropdown-container').toggleClass('is-open');
		});
		
		$('.dashboard__header-dropdown-container a').on('click', (ev) => {
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
	};
	initNative();
})();
