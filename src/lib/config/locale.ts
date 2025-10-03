/**
 * A human-readable locale name (e.g., "English", "Español").
 */
type LocaleName = string;

/**
 * A record mapping locale IDs to their display names.
 */
type LocaleMap = Record<string, LocaleName>;

/**
 * The complete locale configuration structure.
 *
 * @property id - The configuration identifier
 * @property default - The default locale ID
 * @property map - Map of all available locales
 */
type LocaleConfig = {
	id: 'locale';
	default: LocaleId;
	map: LocaleMap;
};

const localeMap = {
	en: 'English',
	es: 'Español',
} as const satisfies LocaleMap;

/**
 * Global locale configuration for the application.
 */
export const LOCALE = {
	id: 'locale',
	default: 'en',
	map: localeMap,
} as const satisfies LocaleConfig;

/**
 * Union type of all valid locale IDs.
 */
export type LocaleId = keyof typeof localeMap;
