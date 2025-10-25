// This file is imported by astro.config.ts which doesn't support aliases, so we can't use them here either
import { tryit, type Result } from 'radashi';
import { SITE } from '../config/site.ts';
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
 * Gets a DOM element by ID and asserts it exists.
 *
 * @typeParam T - The expected HTML element type (default: HTMLElement)
 * @param id - The element ID to search for
 * @returns The DOM element
 * @throws {Error} If no element with the given ID exists
 */
export function getDefinedElementById<T extends HTMLElement = HTMLElement>(
	id: string,
): T {
	return assertDefined(
		document.getElementById(id) as T | null,
		`element with id '${id}'`,
	);
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

/**
 * Converts a relative path to an absolute URL using the site's base URL.
 *
 * @param path - The relative path to convert
 * @returns The absolute URL as a string
 */
export function pathToAbsoluteUrl(path: string) {
	return new URL(path, SITE.url.base).href;
}

/**
 * Parses a string into a boolean value.
 *
 * Accepts the following formats:
 * - Number strings: '1' (true) or '0' (false)
 * - Boolean strings: 'true' (true) or 'false' (false) - case insensitive
 *
 * @param value - The string value to parse into a boolean
 * @returns A tuple of [error, result] where error is null on success,
 *          or an Error object if the value cannot be parsed
 *
 * @example
 * ```ts
 * const [err1, result1] = parseBoolean('true');  // [null, true]
 * const [err2, result2] = parseBoolean('1');     // [null, true]
 * const [err3, result3] = parseBoolean('false'); // [null, false]
 * const [err4, result4] = parseBoolean('0');     // [null, false]
 * const [err5, result5] = parseBoolean('yes');   // [Error, undefined]
 * ```
 */
export function parseBoolean(value: string): Result<boolean, Error> {
	const truthyValues = ['true', '1'];
	const falsyValues = ['false', '0'];

	return tryit(() => {
		const normalizedValue = value.trim().toLowerCase();

		if (truthyValues.includes(normalizedValue)) return true;
		if (falsyValues.includes(normalizedValue)) return false;

		throw new Error(
			`Cannot parse '${value}' into a boolean. Expected one of: ${[...truthyValues, ...falsyValues].join(', ')}.`,
		);
	})();
}

/**
 * Decodes a URL query parameter, handling both URI encoding and plus-encoded spaces.
 *
 * @param param - The encoded query parameter string
 * @returns The decoded string with spaces properly restored
 */
export function decodeQueryParam(param: string) {
	return decodeURIComponent(param.replaceAll('+', ' '));
}
