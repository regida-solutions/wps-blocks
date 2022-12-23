/**
 * External dependencies
 */
import Accordion from 'accordion-js';

document.addEventListener('DOMContentLoaded', function () {
	// eslint-disable-next-line no-undef
	if (wp.editor) {
		return;
	}
	const accordions = Array.from(document.querySelectorAll('.wps-accordion'));

	accordions.forEach((accordion) => {
		const { showMultiple = 0, openFirst = 0 } = accordion.dataset;

		new Accordion(accordion, {
			duration: 300,
			showMultiple,
			openOnInit: openFirst ? [0] : [],
		});
	});
});
