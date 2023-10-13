/**
 * External dependencies
 */
import { intervalToDuration, differenceInDays } from 'date-fns';

const counter = document.getElementsByClassName('wps-counter');
const counterDate = counter[0]?.dataset?.date;

document.addEventListener('DOMContentLoaded', () => {
	requestAnimationFrame(updateTime);
});

const updateTime = () => {
	const startDate = new Date();
	const endDate = counterDate ? new Date(counterDate) : new Date();

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

	document.documentElement.style.setProperty(
		'--timer-months',
		"'" + duration.months + "'",
	);

	document.documentElement.style.setProperty(
		'--timer-days',
		"'" + duration.days + "'",
	);

	document.documentElement.style.setProperty(
		'--timer-days-difference',
		"'" + differenceDays + "'",
	);

	document.documentElement.style.setProperty(
		'--timer-hours',
		"'" + duration.hours + "'",
	);
	document.documentElement.style.setProperty(
		'--timer-minutes',
		"'" + duration.minutes + "'",
	);
	document.documentElement.style.setProperty(
		'--timer-seconds',
		"'" + duration.seconds + "'",
	);

	requestAnimationFrame(updateTime);
};
