import type { AstroGlobal } from 'astro';
import { LOCALE, type LocaleId } from '@config/locale.ts';
import { keysOf } from '@utils/index.ts';
import type { LocaleMessages } from './types.ts';
import { assert, identity, objectify } from 'radashi';

const localeIds = keysOf(LOCALE.map);

const modules = import.meta.glob<LocaleMessages>('./locales/*.ts', {
	eager: true,
	import: 'default',
});

const localeMessageMap = objectify(
	localeIds,
	identity<LocaleId>,
	loadModuleById,
);

/**
 * Loads a locale translation module by its ID.
 *
 * @param localeId - The locale ID to load
 * @returns The loaded locale translation module
 * @throws {Error} If the locale file doesn't exist
 */
function loadModuleById(localeId: LocaleId) {
	const fileName = `./locales/${localeId}.ts`;
	const module = modules[fileName];

	if (!module) {
		throw new Error(`Missing locale file: ${fileName}`);
	}

	return module;
}

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
 * Gets translation strings for the current or specified locale.
 *
 * @param arg - Optional Astro context or locale ID
 * @returns The locale messages object
 */
export function getLocaleMessages(astro?: AstroGlobal): LocaleMessages;
export function getLocaleMessages(localeId?: LocaleId): LocaleMessages;
export function getLocaleMessages(
	arg?: AstroGlobal | LocaleId,
): LocaleMessages {
	const localeId = typeof arg === 'string' ? arg : getLocale(arg);

	return localeMessageMap[localeId] ?? localeMessageMap[LOCALE.default];
}

/**
 * Converts a region code to its corresponding flag emoji.
 *
 * @param region - The two-letter region code (e.g., 'US', 'ES')
 * @returns The flag emoji for the region, or undefined if no region provided
 */
function getFlagForRegion(region: string | undefined) {
	if (!region) {
		return undefined;
	}

	return [...region]
		.map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
		.join('');
}

/**
 * Extracts display information for a locale including flag, language, and region names.
 *
 * Infers the region if not explicitly specified in the locale ID. The region name
 * is only included if it was explicitly provided in the input locale.
 *
 * @param localeId - The locale ID to extract information from
 * @returns An object containing the flag emoji, language name, and optional region name
 */
export function getLocaleInfo(localeId: LocaleId) {
	const locale = new Intl.Locale(localeId);
	// Infer region if missing
	const maximizedLocale = locale.maximize();
	const region = maximizedLocale.region;
	const language = maximizedLocale.language;

	const languageDisplay = new Intl.DisplayNames([localeId], {
		type: 'language',
	});
	const regionDisplay = new Intl.DisplayNames([localeId], { type: 'region' });
	const languageName = languageDisplay.of(language);

	assert(languageName, `language name for ${language} does not exist`);

	// Only include regionName if explicitly specified in input
	const regionName = locale.region
		? regionDisplay.of(locale.region)
		: undefined;

	// Always compute flag (using inferred region)
	const flag = getFlagForRegion(region);

	return {
		flag,
		languageName,
		regionName,
	};
}

/**
 * Determines the best matching locale based on the user's browser language preferences.
 *
 * Iterates through the user's language preferences and returns the first supported
 * locale. Falls back to the default locale if no match is found.
 *
 * @returns The best matching locale ID, or the default locale
 */
export function getBestMatchingLocale() {
	const userLocaleIds = navigator.languages || [navigator.language];

	// Check each user language preference
	for (const localeId of userLocaleIds) {
		const langCode = new Intl.Locale(localeId).minimize().language;

		// See if we have a direct match
		if (LOCALE.map[localeId as LocaleId]) {
			return localeId;
		}

		// See if we have a match for just the language code
		if (LOCALE.map[langCode as LocaleId]) {
			return langCode;
		}
	}

	return LOCALE.default;
}
