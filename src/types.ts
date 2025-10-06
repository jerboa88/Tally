/**
 * A string representing an external HTTPS URL.
 */
export type HttpsUrl = `https://${string}`;

/**
 * Utility type for controlling child content in Astro components.
 * @typeParam Required - Whether children are required (true) or prohibited (false). Default: false
 * @typeParam T - The base type to extend (default: empty object)
 */
export type WithChildren<
	Required extends boolean = true,
	T extends Record<string, unknown> = {},
> = T &
	(Required extends true
		? { children: astroHTML.JSX.Element }
		: { children?: never });
