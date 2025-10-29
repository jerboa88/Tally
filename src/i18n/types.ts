import type { OptionId } from '@config/option.ts';
import type { OutputId } from '@config/output.ts';
import type { ThemeId } from '@config/theme.ts';

/**
 * Localized strings for a button link component.
 *
 * @property label - The visible button text
 * @property tooltip - The tooltip text shown on hover
 */
type ButtonLink = {
	label: Capitalize<string>;
	tooltip: Capitalize<string>;
};

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
	alert: {
		note: {
			title: Capitalize<string>;
		};
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
		viewSource: ButtonLink;
		reportIssue: ButtonLink;
		sponsor: ButtonLink;
		moreProjects: ButtonLink;
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
