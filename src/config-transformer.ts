import { cartesianProduct, objectify } from 'radashi';
import { LOCALE, type LocaleId } from './config/locale.ts';
import { SITE } from './config/site.ts';
import {
	SOCIAL_PREVIEW,
	type SocialPreviewId,
} from './config/social-preview.ts';
import { keysOf } from './utils/index.ts';

/**
 * Creates a page configuration entry for screenshot generation.
 *
 * @param keys - A tuple containing the locale ID and social preview type
 * @returns A configuration entry with the route path and output settings (path, dimensions)
 */
function keysToPagesConfigEntry([localeId, socialPreviewId]: [
	LocaleId,
	SocialPreviewId,
]) {
	const { width, height } = SOCIAL_PREVIEW.map[socialPreviewId];

	return [
		`/${localeId}/${SOCIAL_PREVIEW.id}/${socialPreviewId}/`,
		{
			outputPath: `${SITE.srcDir}/images/${SOCIAL_PREVIEW.id}/${localeId}/${socialPreviewId}.png`,
			width,
			height,
		},
	] as const;
}

/**
 * Generates the complete configuration map for all social preview screenshots.
 *
 * Creates a Cartesian product of all locales and social preview types, then
 * maps each combination to its screenshot configuration.
 *
 * @returns A record mapping route paths to their screenshot configurations
 */
function generatePageConfigMap() {
	const keyMatrix = cartesianProduct(
		keysOf(LOCALE.map),
		keysOf(SOCIAL_PREVIEW.map),
	);

	return objectify(
		keyMatrix.map(keysToPagesConfigEntry),
		(entry) => entry[0],
		(entry) => [entry[1]],
	);
}

/**
 * Configuration for the Astro Snapshot integration.
 *
 * Defines which pages to screenshot and their output settings for social media previews.
 */
export const ASTRO_SNAPSHOT_CONFIG = {
	pages: generatePageConfigMap(),
} as const;

const localIds = keysOf(LOCALE.map);
const sharedI18nConfig = {
	defaultLocale: LOCALE.default,
	locales: Object.fromEntries(localIds.map((id) => [id, id])),
} as const;

/**
 * Internationalization configuration for Astro and sitemap generation.
 *
 * Configures routing to prefix all locales (including default) and disables
 * automatic redirects to the default locale.
 */
export const I18N_CONFIG = {
	astro: {
		...sharedI18nConfig,
		locales: localIds,
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	sitemap: sharedI18nConfig,
} as const;
