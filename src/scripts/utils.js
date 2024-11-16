export function debounce(fn, delay = 50) {
	let timeoutId;

	return (...args) => {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
