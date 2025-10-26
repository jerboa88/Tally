import { INPUT } from '@config/input.ts';
import {
	$enableDebugLogging,
	$inputText,
	$persistedInputText,
	$persistedTheme,
	$rememberInputText,
	$theme,
} from '@stores/index.ts';
import { updateCounts } from '../actions/counter.ts';
import { toggleDebugLogging } from '../actions/logger.ts';
import { THEME } from '@config/theme.ts';

/**
 * Persists theme changes to localStorage, skipping sponsor-only themes.
 */
$theme.subscribe((themeId) => {
	const { sponsor } = THEME.map[themeId];

	if (sponsor) {
		console.debug(
			`Switched to sponsor-only theme: '${themeId}'. Skipped save to local storage`,
		);

		return;
	}

	$persistedTheme.set(themeId);
});

/**
 * Updates counts and optionally persists input text whenever it changes.
 *
 * If `$rememberInputText` is enabled, saves the current input to `$persistedInputText`.
 */
$inputText.subscribe((inputText) => {
	updateCounts();

	if ($rememberInputText.get()) {
		$persistedInputText.set(inputText);
	}
});

/**
 * Clears persisted input text when the remember option is disabled.
 *
 * Sets `$persistedInputText` to either the current input (if remembering) or the default empty value.
 */
$rememberInputText.subscribe((rememberInputText) => {
	const value = rememberInputText ? $inputText.get() : INPUT.default;

	$persistedInputText.set(value);
});

/**
 * Toggles debug logging on or off whenever the option changes.
 */
$enableDebugLogging.subscribe(toggleDebugLogging);
