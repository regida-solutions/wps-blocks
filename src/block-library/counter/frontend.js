/**
 * External dependencies
 */
import { intervalToDuration, differenceInDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const counter = document.getElementsByClassName('wps-counter');
const counterDate = counter[0]?.dataset?.date;
const timeZone = counter[0]?.dataset?.timezone;
const countdown = document.querySelector('#countdown');

document.addEventListener('DOMContentLoaded', () => {
	requestAnimationFrame(updateTime);
});

const updateTime = () => {
	const targetDate = counterDate ? new Date(counterDate) : new Date();

	const startDate = new Date();

	const endDate = toZonedTime(targetDate, timeZone);

	// duration -> {
	//     "years": 0,
	//     "months": 2,
	//     "days": 3,
	//     "hours": 23,
	//     "minutes": 21,
	//     "seconds": 1
	// }

	const duration = intervalToDuration({
		start: startDate,
		end: endDate,
	});

	const differenceDays = differenceInDays(endDate, startDate);

	for (let i = 0; i < counter.length; i++) {
		const months = duration?.months ? duration.months : 0;
		const days = duration?.days ? duration.days : 0;
		const hours = duration?.hours ? duration.hours : 0;
		const minutes = duration?.minutes ? duration.minutes : 0;
		const seconds = duration?.seconds ? duration.seconds : 0;

		counter[i].style.setProperty('--timer-months', "'" + months + "'");

		counter[i].style.setProperty('--timer-days', "'" + days + "'");

		counter[i].style.setProperty(
			'--timer-days-difference',
			"'" + differenceDays + "'",
		);

		counter[i].style.setProperty('--timer-hours', "'" + hours + "'");
		counter[i].style.setProperty('--timer-minutes', "'" + minutes + "'");
		counter[i].style.setProperty('--timer-seconds', "'" + seconds + "'");
	}

	requestAnimationFrame(updateTime);
};

/**
 * Create close button absolute styled in the corner with 1rem padding
 * Attach it to #countdown div
 * Create a click event listener to close the countdown
 * To make sure is permanent, save the state in a cookie with expiration 1 day
 */
if (countdown) {
	const closeButton = document.createElement('button');
	closeButton.innerHTML = 'X';
	closeButton.classList.add('wps-counter__close');
	closeButton.addEventListener('click', closeCountdown);
	countdown.appendChild(closeButton);

	function setCookie(name, value, days) {
		let expires = '';
		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = '; expires=' + date.toUTCString();
		}
		document.cookie = name + '=' + (value || '') + expires + '; path=/';
	}

	function getCookie(name) {
		const nameEQ = name + '=';
		const ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
				return c.substring(nameEQ.length, c.length);
			}
		}
		return null;
	}

	function closeCountdown() {
		document.body.classList.remove('is-counter-visible');
		countdown.classList.remove('wps-counter--visible');
		setCookie('wps-counter', 'closed', 1);
	}

	const isClosed = getCookie('wps-counter') === 'closed';

	if (!isClosed) {
		document.body.classList.add('is-counter-visible');
		countdown.classList.add('wps-counter--visible');
	}
}
