/**
 * Configuration for a single theme.
 *
 * @property wip - Whether the theme is still a work in progress
 * @property sponsor - Whether the theme requires sponsorship to access
 */
export type Theme = {
	wip: boolean;
	sponsor: boolean;
};

/**
 * A record mapping theme IDs to their configuration objects.
 */
type ThemeMap = Record<string, Theme>;

/**
 * The complete theme configuration structure.
 *
 * @property id - The localStorage key for theme persistence
 * @property default - The default theme ID and color
 * @property map - Map of all available themes
 */
type ThemeConfig = {
	id: string;
	default: {
		id: ThemeId;
		color: string;
	};
	map: ThemeMap;
};

const freeTheme = {
	wip: false,
	sponsor: false,
} as const satisfies Theme;

const wipTheme = {
	wip: true,
	sponsor: false,
} as const satisfies Theme;

const themeMap = {
	auto: freeTheme,
	amoled: freeTheme,
	light: freeTheme,
	dark: freeTheme,
	teal: wipTheme,
	dusk: wipTheme,
	solarizedLight: wipTheme,
	solarizedDark: wipTheme,
	gruvboxLight: wipTheme,
	gruvboxDark: wipTheme,
	catppuccinLatte: wipTheme,
	catppuccinMocha: wipTheme,
	nord: wipTheme,
	dracula: wipTheme,
} as const satisfies ThemeMap;

/**
 * Global theme configuration for the application.
 *
 * Defines the default theme, persistence key, and all available themes.
 */
export const THEME = {
	id: 'theme',
	default: {
		id: 'auto',
		color: '#151515',
	},
	map: themeMap,
} as const satisfies ThemeConfig;

/**
 * Union type of all valid theme IDs.
 */
export type ThemeId = keyof typeof themeMap;
