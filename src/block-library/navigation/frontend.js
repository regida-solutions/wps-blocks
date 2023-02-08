/**
 * Internal dependencies
 */
import createMenuToggle from './components/menu-toggle';
window.addEventListener('load', function () {
	const body = document.body;
	const menuToggle = document.querySelector('.wps-navigation-menu-toggle');
	const desktopNavigationWrapper = document.querySelector('.wps-navigation');
	const mainNavigation = document.querySelector('.wps-navigation-menu');
	const siteNavigation = mainNavigation.cloneNode(true);
	const siteHeader = document.querySelector('.wp-site-blocks > header');
	const siteFooter = document.querySelector('.wp-site-blocks > footer');

	/*
	 * Check if wps-navigation has  data-toggle-location attribute
	 * This will be used to determine where the toggle button will be placed
	 * If no data-toggle-location attribute is found, the toggle button will remain in initial position
	 */
	const toggleLocation = desktopNavigationWrapper.dataset.toggleLocation;

	if (toggleLocation) {
		const toggleLocationElement = document.querySelector(
			`.${toggleLocation}`,
		);
		if (toggleLocationElement) {
			toggleLocationElement.prepend(menuToggle);
		}
	}

	menuToggle.addEventListener('click', () => {
		ToggleMenu();
	});

	function ToggleMenu() {
		const isOpened = menuToggle.getAttribute('aria-expanded') === 'true';
		if (isOpened ? closeMenu() : openMenu());
	}

	function openMenu() {
		body.classList.add('wps-navigation-is-open');
		menuToggle.setAttribute('aria-expanded', 'true');
		siteNavigation.setAttribute('data-state', 'opened');
	}
	function closeMenu() {
		body.classList.remove('wps-navigation-is-open');
		menuToggle.setAttribute('aria-expanded', 'false');
		siteNavigation.setAttribute('data-state', 'closing');

		siteNavigation.addEventListener(
			'animationend',
			() => {
				siteNavigation.setAttribute('data-state', 'closed');
			},
			{ once: true },
		);
	}

	/**
	 * Check screen size and if smaller than 1024px
	 * Create a new node <nav> with class .wps-navigation-menu-mobile after the first header tag in class .wp-site-blocks
	 * Find the menu with class .wps-navigation .wps-navigation-menu and move the menu into the newly created node.
	 */
	function runMobileMenu() {
		const siteNavigationMobile = document.querySelector(
			'.wps-navigation-mobile',
		);
		const siteNavigationMobileOverlay = document.querySelector(
			'.wps-navigation-overlay',
		);

		if (window.innerWidth < 1024) {
			if (!siteNavigationMobile) {
				const newNav = document.createElement('nav');
				const navOverlay = document.createElement('div');
				const newToggle = menuToggle.cloneNode(true);
				navOverlay.classList.add('wps-navigation-overlay');
				newNav.classList.add('wps-navigation-mobile');

				mainNavigation.remove();
				siteHeader.after(newNav);
				siteFooter.after(navOverlay);
				newNav.append(newToggle);
				newNav.append(siteNavigation);

				newToggle.addEventListener('click', () => {
					ToggleMenu();
				});
				navOverlay.addEventListener('click', () => {
					closeMenu();
				});
			}
		} else if (siteNavigationMobile) {
			closeMenu();
			desktopNavigationWrapper.prepend(mainNavigation);
			siteNavigationMobile.remove();
			siteNavigationMobileOverlay.remove();
		}
	}

	runMobileMenu();
	createMenuToggle(siteNavigation);

	let timeout;
	window.addEventListener('resize', function () {
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			runMobileMenu();
		}, 150);
	});
});
