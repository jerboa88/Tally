import type { AstroGlobal } from 'astro';
import { LOCALE, type LocaleId } from '@lib/config/locale.ts';
import { assertDefined, keysOf } from '@utils/index.ts';
import type { LocaleMessages } from './types.ts';
import { objectify } from 'radashi';

const localeIds = keysOf(LOCALE.map);

const modules = import.meta.glob<LocaleMessages>('./locales/*.ts', {
	eager: true,
	import: 'default',
});

const localeMessageMap = objectify(
	localeIds,
	(localeId) => localeId,
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
 * Gets the translation strings for the current or specified locale.
 *
 * @param arg - Optional Astro context or locale ID
 * @returns The locale strings object
 */
export function getLocaleStrings(astro?: AstroGlobal): LocaleMessages;
export function getLocaleStrings(localeId?: LocaleId): LocaleMessages;
export function getLocaleStrings(arg?: AstroGlobal | LocaleId): LocaleMessages {
	const localeId = typeof arg === 'string' ? arg : getLocale(arg);

	return (
		localeMessageMap[localeId as LocaleId] ?? localeMessageMap[LOCALE.default]
	);
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

	const languageName = assertDefined(
		languageDisplay.of(language),
		`language name for ${language}`,
	);

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
