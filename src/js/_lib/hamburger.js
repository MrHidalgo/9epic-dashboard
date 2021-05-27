

/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
const initHamburger = () => {

  const btn = document.querySelector("[hamburger-js]"),
    mobileContainer = document.querySelector("[menu-js]");

	/**
   * @description
	 */
	if(btn) {
		btn.addEventListener("click", (ev) => {
			const elem = ev.currentTarget;
			
			if(elem.classList.contains('is-active')) {
				elem.classList.remove("is-active");
				mobileContainer.classList.remove("is-open");

				$('.dashboard__sidebar-btn').hide();
				$('.dashboard__sidebar .dashboard__logo').hide();
				
				$('.dashboard__sidebar-btn').removeClass('is-active');
				$('.dashboard__sidebar-collapse-body').slideUp(350);
			} else {
				elem.classList.add("is-active");
				mobileContainer.classList.add("is-open");
				
				setTimeout(() => {
					$('.dashboard__sidebar-btn').fadeIn(500);
					$('.dashboard__sidebar .dashboard__logo').fadeIn(500);
				}, 250);
			}
			
		});
	}

};
