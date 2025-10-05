import type { HttpsUrl } from '../types.ts';

/**
 * Returns the keys of an object with proper type inference.
 *
 * @param obj - The object to extract keys from
 * @returns An array of the object's keys, typed as `keyof T`
 */
export function keysOf<T extends object>(obj: T): (keyof T)[] {
	return Object.keys(obj) as (keyof T)[];
}

/**
 * Returns the entries of an object with proper type inference.
 *
 * @param obj - The object to extract entries from
 * @returns An array of key-value pairs, properly typed
 */
export function entriesOf<T extends object>(obj: T): [keyof T, T[keyof T]][] {
	return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * Asserts that a value is defined (not null or undefined) and returns it.
 *
 * @param value - The value to check
 * @param label - A label for the value to use in the error message (default: 'value')
 * @returns The value if defined
 * @throws {Error} If the value is null or undefined
 */
export function assertDefined<T>(
	value: T | null | undefined,
	label = 'value',
): T {
	if (value === null || value === undefined) {
		throw new Error(`Expected ${label} to be defined`);
	}
	return value;
}

/**
 * Debounces a function to limit how often it can be called.
 *
 * @remarks
 * The default delay of 35ms is just above the default keyboard auto-repeat rates of most operating systems.
 *
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds (default: 35)
 * @returns The debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
	fn: T,
	delay = 35,
) {
	let timeoutId: number | undefined;

	return (...args: Parameters<T>) => {
		window.clearTimeout(timeoutId);

		timeoutId = window.setTimeout(() => {
			fn(...args);
		}, delay);
	};
}

/**
 * Generates a view transition name from the provided keys for cross-document view transitions.
 *
 * @param keys - One or more strings to join as the transition name (null/undefined values are filtered out)
 * @returns An object containing the style property with viewTransitionName
 */
export function wKey(...keys: (string | undefined | null)[]) {
	const key = keys.filter((k) => k).join('-');

	return {
		style: {
			viewTransitionName: key,
		},
	};
}

/**
 * Checks if a URL string is an external HTTPS URL.
 *
 * @param urlString - The URL string to check
 * @returns True if the URL starts with "https://"
 * @throws {Error} If urlString is null or undefined
 */
export function isExternalUrl(
	urlString: string | undefined,
): urlString is HttpsUrl {
	const definedUrlString = assertDefined(urlString, 'URL string');

	return definedUrlString.startsWith('https://');
}
