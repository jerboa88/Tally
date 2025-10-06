import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import { defineConfig, fontProviders } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import { SITE } from './src/lib/config/site.ts';
import { FONTS } from './src/lib/config/fonts.ts';
import { LOCALE } from './src/lib/config/locale.ts';
import { keysOf } from './src/utils/index.ts';

const BASE_PATH = '/';
const LOCALE_IDS = keysOf(LOCALE.map);
const I18N_CONFIG = {
	defaultLocale: LOCALE.default,
	locales: Object.fromEntries(LOCALE_IDS.map((id) => [id, id])),
};

// https://astro.build/config
export default defineConfig({
	site: SITE.url.base,
	base: BASE_PATH,
	output: 'static',
	trailingSlash: 'never',
	server: {
		host: true,
	},
	build: {
		assets: 'assets',
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'hover',
	},
	image: {
		remotePatterns: [{ protocol: 'https' }],
		responsiveStyles: true,
		layout: 'constrained',
	},
	i18n: {
		...I18N_CONFIG,
		locales: LOCALE_IDS,
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	experimental: {
		fonts: FONTS.map((props) => ({
			...props,
			provider: fontProviders.fontsource(),
		})),
	},
	integrations: [
		markdoc(),
		robotsTxt({
			sitemapBaseFileName: `${SITE.sitemapPrefix}-index`,
		}),
		sitemap({
			filenameBase: SITE.sitemapPrefix,
			changefreq: 'monthly',
			priority: 1,
			lastmod: new Date(),
			i18n: I18N_CONFIG,

			serialize(item) {
				const path = new URL(item.url).pathname;

				// Don't include social preview pages in the sitemap
				// TODO: Move preview path to constants
				if (path.includes('/preview/')) {
					return undefined;
				}

				// The homepage automatically redirects to the default locale, add the x-default hreflang tag
				if (item.links) {
					for (const link of item?.links) {
						if (link.url === `${SITE.url.base}${BASE_PATH}`) {
							link.lang = 'x-default';
						}
					}
				}

				return item;
			},
		}),
	],
});
