/**
 * Configuration for a single user preference option.
 *
 * @property id - The option identifier and localStorage key
 * @property default - The default boolean value
 */
type Option = {
	id: string;
	default: boolean;
};

/**
 * A record mapping option names to their configurations.
 */
type OptionMap = Record<string, Option>;

/**
 * The complete options configuration structure.
 *
 * @property id - The section identifier for options
 * @property map - Map of all available options
 */
type OptionConfig = {
	id: string;
	map: OptionMap;
};

const optionMap = {
	warnOnLargeInputText: {
		id: 'warnOnLargeInputText',
		default: true,
	},
	rememberInputText: {
		id: 'rememberInputText',
		default: false,
	},
	enableDebugLogging: {
		id: 'enableDebugLogging',
		default: false,
	},
} as const satisfies OptionMap;

/**
 * Global options configuration for the application.
 */
export const OPTION = {
	id: 'options',
	map: optionMap,
} as const satisfies OptionConfig;

/**
 * Union type of all valid option IDs.
 */
export type OptionId = (typeof optionMap)[keyof typeof optionMap]['id'];
