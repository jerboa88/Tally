import '@fontsource-variable/roboto-slab';
import '@fontsource-variable/roboto-flex';
import { debug, debounce } from './utils.js';
import { get, set, remove } from './storage.js';
import { getCounts } from './counter.js';

// Constants / config
// ------------------
const CLASS_OUTPUT_UPDATE_ANIMATION = 'pulse';
const CLASS_ENABLE_TRANSITIONS = 'enable-transitions';
const BASE_COLOR_VARIABLE_NAME = '--color-base-1';
const THEME_INPUT_NAME = 'theme';
const STORAGE_KEY_MAP = {
	theme: 'theme',
};
const THEME_NAME_MAP = {
	auto: 'Auto',
	dark: 'Dark',
	light: 'Light',
};
const DEFAULT_THEME = 'auto';
const META_TAG_SELECTOR_ATTRIBUTE_MATRIX = [
	['link[rel=mask-icon]', 'color'],
	['meta[name=msapplication-navbutton-color]', 'content'],
	['meta[name=msapplication-TileColor]', 'content'],
	['meta[name=theme-color]', 'content'],
	['meta[name=apple-mobile-web-app-status-bar-style]', 'content'],
];
const OUTPUT_IDS = [
	'characters',
	'words',
	'sentences',
	'paragraphs',
	'lines',
	'spaces',
	'letters',
	'digits',
	'symbols',
];

// Runtime variables
// -----------------
const textInput = document.getElementById('input');
const themeSelectorContainer = document.getElementById('theme-container');
const outputMap = getOutputMap();
const metaTagMatrix = getMetaTagMatrix();
const themeSelectorMap = buildThemeSelectors();

// Functions
// ---------

/**
 * Apply a theme to the page given its key.
 *
 * @param {string} themeKey - The key of the theme to apply.
 */
function applyTheme(themeKey) {
	debug(`Applying theme '${themeKey}'`);

	// Update colors in meta tags
	const styleMap = window.getComputedStyle(document.body);
	const baseColor = styleMap.getPropertyValue(BASE_COLOR_VARIABLE_NAME);

	for (const [metaTag, metaTagAttribute] of metaTagMatrix) {
		metaTag.setAttribute(metaTagAttribute, baseColor);
	}

	// Set theme attribute on body
	document.body.setAttribute(`data-${STORAGE_KEY_MAP.theme}`, themeKey);
}

/**
 * Handle the theme selector change event. This will update the theme in local storage and apply the theme to the page.
 *
 * @param {Event} event - The event object.
 */
function changeTheme({ target }) {
	const themeName = target.value;

	debug(`Changing theme to '${themeName}'`);

	set(STORAGE_KEY_MAP.theme, themeName);
	applyTheme(themeName);
}

/**
 * Restore the theme from local storage. If no theme is found, the default theme will be applied.
 */
function restoreTheme() {
	let theme = get(STORAGE_KEY_MAP.theme);

	debug(`Restoring theme: '${theme}'...`);

	if (theme in themeSelectorMap) {
		themeSelectorMap[theme].checked = true;
	} else {
		themeSelectorMap[DEFAULT_THEME].checked = true;
		theme = DEFAULT_THEME;
	}

	applyTheme(theme);
}

/**
 * Compute the counts for the input text and update the output elements accordingly.
 */
async function updateCounts() {
	debug('Updating counts...');

	const countObj = await getCounts(textInput.value);

	for (const key in countObj) {
		const output = outputMap[key];
		const count = (countObj[key] || '-').toString();

		// Only update the output if the value has changed
		if (output.value !== count) {
			output.value = count;

			output.classList.remove(CLASS_OUTPUT_UPDATE_ANIMATION);

			// Force a reflow to restart the animation
			void output.offsetWidth;

			output.classList.add(CLASS_OUTPUT_UPDATE_ANIMATION);
		}
	}
}

/**
 * Given a matrix of meta tag selectors and attributes, returns a matrix of meta tag elements and attributes.
 *
 * @returns {Array.<[HTMLElement, string]>} A matrix of meta tag elements and attribute names.
 */
function getMetaTagMatrix() {
	debug('Getting meta tag matrix...');

	const metaTagMatrix = [];

	for (const [
		metaTagSelector,
		metaTagAttribute,
	] of META_TAG_SELECTOR_ATTRIBUTE_MATRIX) {
		metaTagMatrix.push([
			document.querySelector(metaTagSelector),
			metaTagAttribute,
		]);
	}

	return metaTagMatrix;
}

/**
 * Given a list of output IDs, returns a map of output IDs to their corresponding output elements.
 *
 * @returns {Object.<string, HTMLOutputElement>} A map of output IDs to their corresponding output elements.
 */
function getOutputMap() {
	debug('Getting output map...');

	const outputMap = {};

	for (const outputId of OUTPUT_IDS) {
		outputMap[outputId] = document.getElementById(outputId);
	}

	return outputMap;
}

/**
 * Builds radio buttons to change the theme and returns a map of theme keys to input elements.
 *
 * @returns {Object.<string, HTMLInputElement>} A map of theme keys to input elements.
 */
function buildThemeSelectors() {
	debug('Building theme selectors...');

	const themeSelectorMap = {};

	for (const [themeKey, themeName] of Object.entries(THEME_NAME_MAP)) {
		const div = document.createElement('div');
		const input = document.createElement('input');
		const label = document.createElement('label');
		const text = document.createTextNode(themeName);

		input.type = 'radio';
		input.name = THEME_INPUT_NAME;
		input.id = themeKey;
		input.value = themeKey;
		label.htmlFor = themeKey;

		label.appendChild(text);
		div.appendChild(input);
		div.appendChild(label);

		themeSelectorContainer.appendChild(div);

		themeSelectorMap[themeKey] = input;
	}

	return themeSelectorMap;
}

/**
 * Register event listeners and load settings from cookies.
 */
function init() {
	debug('Initializing...');

	const throttledUpdateCounts = debounce(updateCounts);

	// Enable transitions after page load
	window.addEventListener('load', () => {
		document.body.classList.add(CLASS_ENABLE_TRANSITIONS);
	});

	textInput.addEventListener('input', throttledUpdateCounts);

	for (const themeSelector of Object.values(themeSelectorMap)) {
		themeSelector.addEventListener('change', changeTheme);
	}

	restoreTheme();
	updateCounts();
}

// Entry point
init();
