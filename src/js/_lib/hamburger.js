

/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
const initHamburger = () => {

  const btn = document.querySelectorAll("[hamburger-js]"),
    mobileContainer = document.querySelector("[menu-js]");

	/**
   * @description
	 */
	if(btn) {
		for(let i = 0; i < btn.length; i++) {
			const b = btn[i];
			
			b.addEventListener("click", (ev) => {
				const elem = ev.currentTarget;
				
				if($(elem).closest('.dashboard__subheader').length > 0) {
					$('.leftHandMenu__sidebar .hamburger').addClass('is-active');
					
					if($(window).width() < 1279) {
						$('#overlay').fadeIn(500);
					}
				}
				
				if(elem.classList.contains('is-active')) {
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

					setTimeout(() => {
						$('.leftHandMenu__sidebar-btn').fadeIn(500);
						$('.leftHandMenu__sidebar .dashboard__logo').fadeIn(500);
					}, 250);
				}
				
			});
		}
	}

};
