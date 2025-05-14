/**
 * Log a debug message to the console.
 *
 * @param {string} msg - The message to log.
 */
export function debug(msg) {
	console.debug(
		'%c[Tally]',
		'color:var(--color-primary);background:var(--color-base-1);font-family:var(--font-family-header);font-weight:var(--font-weight-bold);',
		msg,
	);
}

/**
 * Debounce a function to limit how often it can be called.
 *
 * @param {(...args: any[]) => void} fn - The function to debounce. Must be a function that takes any number of arguments and returns void.
 * @param {number} [delay=50] - The delay in milliseconds.
 * @returns {(...args: any[]) => void} - The debounced function.
 */
export function debounce(fn, delay = 50) {
	let timeoutId;

	return (...args) => {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}

/**
 * Parse a boolean value from a string.
 *
 * @param {string} value - The string to parse.
 * @returns {boolean} - The parsed boolean value.
 */
export function parseBoolean(value) {
	return value === 'true';
}
