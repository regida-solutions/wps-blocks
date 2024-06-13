function checkLoaded() {
	return (
		document.readyState === 'complete' ||
		document.readyState === 'interactive'
	);
}

if (checkLoaded()) {
	const body = document.querySelector('body');
	const content = document.querySelector('.wp-site-blocks');
	const trigger = document.querySelectorAll('.wps-mega-menu-trigger');

	trigger.forEach((item) => {
		item.addEventListener('click', () => {
			content.classList.toggle('wps-mega-menu-is-open');
			body.classList.toggle('wps-mega-menu-is-visible');
		});
	});
}
