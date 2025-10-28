/**
 * Configuration for a single social preview.
 *
 * @property includeInHead - Whether to include this preview in the HTML head section
 * @property width - The width of the preview image in pixels
 * @property height - The height of the preview image in pixels
 */
type SocialPreview = {
	includeInHead: boolean;
	width: number;
	height: number;
};

/**
 * A record mapping social preview IDs to their configuration objects.
 */
type SocialPreviewMap = Record<string, SocialPreview>;

/**
 * Configuration for social media preview images.
 *
 * @property id - The identifier for preview routes. This must match the subdirectory name in the `src/pages` folder.
 */
type SocialPreviewConfig = {
	id: string;
	map: SocialPreviewMap;
};

const socialPreviewMap = {
	og: {
		includeInHead: true,
		width: 1200,
		height: 630,
	},
	twitter: {
		includeInHead: true,
		width: 1200,
		height: 675,
	},
	story: {
		includeInHead: false,
		width: 1080,
		height: 1920,
	},
} as const satisfies SocialPreviewMap;

/**
 * Global configuration for social media preview images.
 */
export const SOCIAL_PREVIEW = {
	id: 'preview',
	map: socialPreviewMap,
} as const satisfies SocialPreviewConfig;

/**
 * Union type of all valid social preview IDs ('og' | 'twitter').
 */
export type SocialPreviewId = keyof typeof socialPreviewMap;
