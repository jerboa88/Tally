import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import { defineConfig, fontProviders } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import removeWhitespace from 'astro-remove-whitespace';
import { SITE } from './src/lib/config/site.ts';
import { FONTS } from './src/lib/config/fonts.ts';
import { SOCIAL_PREVIEW } from './src/lib/config/social-preview.ts';
import snapshot from './src/lib/astro-snapshot/src/index.ts';
import { ASTRO_SNAPSHOT_CONFIG } from './src/config-transformer.ts';
import { I18N_CONFIG } from './src/config-transformer.ts';

// https://astro.build/config
export default defineConfig({
	site: SITE.url.base,
	base: SITE.basePath,
	srcDir: SITE.srcDir,
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
	i18n: I18N_CONFIG.astro,
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
			i18n: I18N_CONFIG.sitemap,
			serialize(item) {
				const path = new URL(item.url).pathname;

				// Don't include social preview pages in the sitemap
				if (path.includes(`/${SOCIAL_PREVIEW.id}/`)) {
					return undefined;
				}

				// The homepage automatically redirects to the default locale, add the x-default hreflang tag
				if (item.links) {
					for (const link of item?.links) {
						if (link.url === `${SITE.url.base}${SITE.basePath}`) {
							link.lang = 'x-default';
						}
					}
				}

				return item;
			},
		}),
		snapshot(ASTRO_SNAPSHOT_CONFIG),
		// Workaround for https://github.com/withastro/prettier-plugin-astro/issues/308
		removeWhitespace(),
	],
});
