import type { HttpsUrl } from '../../types.ts';

/**
 * The complete site configuration structure.
 *
 * @property title - The application name
 * @property sitemapPrefix - Prefix for sitemap files
 * @property url - URLs for the site, repository, and related resources
 * @property author - Author information including name and social links
 */
type SiteConfig = {
	title: Capitalize<string>;
	sitemapPrefix: string;
	url: {
		base: HttpsUrl;
		github: HttpsUrl;
		issues: HttpsUrl;
		funding: HttpsUrl;
		specification: HttpsUrl;
		mergist: HttpsUrl;
	};
	author: {
		name: {
			first: Capitalize<string>;
			last: Capitalize<string>;
			full: Capitalize<string>;
		};
		url: {
			homepage: HttpsUrl;
			github: HttpsUrl;
			linkedin: HttpsUrl;
		};
	};
};

const AUTHOR_FIRST_NAME = 'John' as const;
const AUTHOR_LAST_NAME = 'Goodliff' as const;
const AUTHOR_HOMEPAGE_URL = 'https://johng.io' as const;
const AUTHOR_GITHUB_URL = 'https://github.com/jerboa88' as const;
const REPO_URL = `${AUTHOR_GITHUB_URL}/Tally`;

/**
 * Global site configuration.
 *
 * Contains the site title, URLs for external resources, and author information.
 */
export const SITE = {
	title: 'Tally',
	sitemapPrefix: 'sitemap',
	url: {
		base: 'https://tally.johng.io',
		github: REPO_URL,
		issues: `${REPO_URL}/issues`,
		funding: `${AUTHOR_HOMEPAGE_URL}/funding`,
		specification: `${REPO_URL}/blob/main/README.md#specification`,
		mergist: 'https://mergist.johng.io',
	},
	author: {
		name: {
			first: AUTHOR_FIRST_NAME,
			last: AUTHOR_LAST_NAME,
			full: `${AUTHOR_FIRST_NAME} ${AUTHOR_LAST_NAME}`,
		},
		url: {
			homepage: AUTHOR_HOMEPAGE_URL,
			github: AUTHOR_GITHUB_URL,
			linkedin: 'https://www.linkedin.com/in/johngoodliff/',
		},
	},
} as const satisfies SiteConfig;
