

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
				
				if($(elem).closest('.dashboard__subheader')) {
					$('.dashboard__sidebar .hamburger').addClass('is-active');
					$('#overlay').fadeIn(500);
				}
				
				if(elem.classList.contains('is-active')) {
					elem.classList.remove("is-active");
					mobileContainer.classList.remove("is-open");
					
					$('.dashboard__sidebar-btn').hide();
					$('.dashboard__sidebar .dashboard__logo').hide();
					
					$('.dashboard__sidebar-btn').removeClass('is-active');
					$('.dashboard__sidebar-collapse-body').slideUp(350);
					
					$('.dashboard__subheader .hamburger').removeClass('is-active');
					$('#overlay').fadeOut(500);
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
	}

};
