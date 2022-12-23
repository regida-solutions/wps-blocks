document.addEventListener('DOMContentLoaded', function () {
	const effects = () => {
		return {
			cube: {
				effect: 'cube',
				cubeEffect: {
					slideShadows: false,
				},
			},
			flip: {
				effect: 'flip',
				flipEffect: {
					slideShadows: false,
				},
			},
			coverFlow: {
				effect: 'coverflow',
				coverflowEffect: {
					rotate: 30,
					slideShadows: false,
				},
			},
			fade: {
				effect: 'fade',
				fadeEffect: {
					crossFade: true,
				},
			},
			creative: {
				effect: 'creative',
				creativeEffect: {
					prev: {
						// will set `translateZ(-400px)` on previous slides
						translate: [0, 0, -400],
					},
					next: {
						// will set `translateX(100%)` on next slides
						translate: ['100%', 0, 0],
					},
				},
			},
		};
	};
	if (typeof Swiper !== 'undefined') {
		const sliders = [
			...document.getElementsByClassName('wps-slider'),
			...document.getElementsByClassName('wps-image-slider'),
			...document.getElementsByClassName('wps-media-slider'),
		];
		if (sliders.length > 0) {
			sliders.forEach((slider) => {
				const {
					speed = '500',
					delay = '3000',
					loop = '',
					autoplay = '1',
					animationType = '',
					pagination = '',
				} = slider.dataset;

				const autoPlaySettings =
					autoplay === '1' ? { delay: parseInt(delay) } : false;

				// Setup slide config
				let sliderConfig = {
					speed: parseInt(speed),
					loop: loop === '1',
					autoplay: autoPlaySettings,
					navigation: {
						nextEl: '.wps-slider-button-next',
						prevEl: '.wps-slider-button-prev',
					},
				};

				// Add animation
				const effectList = effects();
				if (animationType && effectList.hasOwnProperty(animationType)) {
					sliderConfig = {
						...sliderConfig,
						...effectList[animationType],
					};
				}

				// Pagination
				if (pagination === '1') {
					sliderConfig.pagination = {
						el: '.swiper-pagination',
						type: 'bullets',
						clickable: true,
					};
				}
				/* eslint-disable-next-line */
				const swiper = new Swiper(slider, sliderConfig);
			});
		}
	}
});
