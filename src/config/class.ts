/**
 * A record mapping semantic names to CSS class names.
 */
type ClassConfig = Record<string, string>;

/**
 * Global CSS class name constants used throughout the application.
 *
 * Provides a centralized reference for frequently reused class names.
 */
export const CLASS = {
	enableTransitions: 'enable-transitions',
	outputUpdateAnimation: 'pulse',
	visuallyHidden: 'visually-hidden',
} as const satisfies ClassConfig;
