import type { LocaleId } from '@lib/config/locale.ts';
import type { OptionId } from '@lib/config/option.ts';
import type { OutputId } from '@lib/config/output.ts';
import type { ThemeId } from '@lib/config/theme.ts';

/**
 * A map of output IDs to their localized labels.
 */
type OutputMap = {
	[id in OutputId]: {
		label: string;
	};
};

/**
 * A map of option IDs to their localized labels.
 */
type OptionMap = {
	[id in OptionId]: {
		label: string;
	};
};

/**
 * A map of theme IDs to their localized labels.
 */
type ThemeMap = {
	[id in ThemeId]: {
		label: string;
	};
};

/**
 * The complete structure of all locale strings for the application.
 *
 * Defines the shape of translation objects including site metadata, UI labels,
 * navigation items, footer content, and configuration options.
 */
export type LocaleMessages = {
	site: {
		title: Capitalize<string>;
		description: Capitalize<string>;
		longDescription: Capitalize<string>;
		features: Capitalize<string>[];
		requirements: Capitalize<string>;
		keywords: string[];
	};
	header: {
		label: Capitalize<string>;
	};
	input: {
		label: Capitalize<string>;
		placeholder: Capitalize<string>;
		largeInputWarning: {
			message: Capitalize<string>;
		};
	};
	output: {
		placeholder: Capitalize<string>;
		map: OutputMap;
	};
	nav: {
		viewSource: {
			label: Capitalize<string>;
			tooltip: Capitalize<string>;
		};
		reportIssue: {
			label: Capitalize<string>;
			tooltip: Capitalize<string>;
		};
		sponsor: {
			label: Capitalize<string>;
			tooltip: Capitalize<string>;
		};
		moreProjects: {
			label: Capitalize<string>;
			tooltip: Capitalize<string>;
		};
	};
	locales: {
		title: Capitalize<string>;
	};
	options: {
		title: Capitalize<string>;
		map: OptionMap;
	};
	themes: {
		title: Capitalize<string>;
		map: ThemeMap;
	};
};
