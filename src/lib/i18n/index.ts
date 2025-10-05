import type { AstroGlobal } from 'astro';
import { LOCALE, type LocaleId } from '@lib/config/locale.ts';
import { keysOf } from '@utils/index.ts';
import type { LocaleMessages } from './types.ts';

const localeIds = keysOf(LOCALE.map);

const modules = import.meta.glob<LocaleMessages>('./locales/*.ts', {
	eager: true,
	import: 'default',
});

/**
 * Record mapping locale IDs to their complete translation objects.
 *
 * @throws {Error} If a locale file is missing for any configured locale
 */
const localeStrings: Record<LocaleId, LocaleMessages> = Object.fromEntries(
	localeIds.map((localeId) => {
		const fileName = `./locales/${localeId}.ts`;
		const module = modules[fileName];

		if (!module) {
			throw new Error(`Missing locale file: ${fileName}`);
		}

		return [localeId, module];
	}),
) as Record<LocaleId, LocaleMessages>;

/**
 * Gets the current locale ID from the Astro context or document.
 *
 * @param astro - Optional Astro global context (server-side)
 * @returns The current locale ID
 * @throws {Error} If the locale is not supported
 */
export function getLocale(astro?: AstroGlobal): LocaleId {
	if (astro) {
		const localeId = astro.currentLocale;

		if (!localeId || !LOCALE.map[localeId as LocaleId]) {
			throw new Error(
				`Expected locale to be one of ${localeIds}, but got '${localeId}'`,
			);
		}

		return localeId as LocaleId;
	}

	return document.documentElement.lang as LocaleId;
}

/**
 * Gets the translation strings for the current or specified locale.
 *
 * @param arg - Optional Astro context or locale ID
 * @returns The locale strings object
 */
export function getLocaleStrings(astro?: AstroGlobal): LocaleMessages;
export function getLocaleStrings(locale?: LocaleId): LocaleMessages;
export function getLocaleStrings(arg?: AstroGlobal | LocaleId): LocaleMessages {
	const locale = typeof arg === 'string' ? arg : getLocale(arg);

	return localeStrings[locale] ?? localeStrings[LOCALE.default];
}

/**
 * Converts a locale ID to its corresponding flag emoji.
 *
 * Extracts the region code from the locale and converts it to a flag emoji
 * using Unicode regional indicator symbols. If the locale doesn't include
 * a region, attempts to infer it using `Intl.Locale.maximize()`.
 *
 * @param localeId - The locale ID (e.g., 'en', 'es', 'en-US')
 * @returns The flag emoji for the locale's region, or null if no region can be determined
 *
 * @example
 * ```ts
 * flagFromLocale('en-US') // Returns '🇺🇸'
 * flagFromLocale('es') // Returns '🇪🇸' (inferred)
 * ```
 */
export function flagFromLocale(localeId: LocaleId) {
	const locale = new Intl.Locale(localeId);

	// Try to get region directly
	let region = locale.region;

	// If missing, try to infer it
	if (!region) {
		region = locale.maximize().region;
	}

	if (!region) {
		return null;
	}

	// Convert region letters to flag emoji
	return [...region.toUpperCase()]
		.map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
		.join('');
}
