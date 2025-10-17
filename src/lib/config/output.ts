/**
 * Configuration for a group of related output fields.
 *
 * @property id - The group identifier
 * @property fields - Array of output field IDs in this section
 */
type OutputGroup = {
	id: string;
	fields: string[];
};

/**
 * A record mapping section names to their output field configurations.
 */
type OutputConfig = Record<string, OutputGroup>;

/**
 * Global output configuration.
 *
 * Defines the sections and fields to display in the counter output.
 */
export const OUTPUT = {
	general: {
		id: 'general',
		fields: ['characters', 'words', 'sentences', 'paragraphs', 'lines'],
	},
	character: {
		id: 'character',
		fields: ['spaces', 'letters', 'digits', 'punctuation', 'symbols'],
	},
} as const satisfies OutputConfig;

/**
 * Union type of all valid output field IDs.
 */
export type OutputId = (typeof OUTPUT)[keyof typeof OUTPUT]['fields'][number];
