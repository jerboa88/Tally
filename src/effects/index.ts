import { INPUT } from '@config/input.ts';
import {
	$enableDebugLogging,
	$inputText,
	$persistedInputText,
	$rememberInputText,
} from '@stores/index.ts';
import { updateCounts } from '../actions/counter.ts';
import { toggleDebugLogging } from '../actions/logger.ts';

/**
 * Updates counts and optionally persists input text whenever it changes.
 *
 * If `$rememberInputText` is enabled, saves the current input to `$persistedInputText`.
 */
$inputText.subscribe((value) => {
	updateCounts();

	if ($rememberInputText.get()) {
		$persistedInputText.set(value);
	}
});

/**
 * Clears persisted input text when the remember option is disabled.
 *
 * Sets `$persistedInputText` to either the current input (if remembering) or the default empty value.
 */
$rememberInputText.subscribe((remember) => {
	const value = remember ? $inputText.get() : INPUT.default;

	$persistedInputText.set(value);
});

/**
 * Toggles debug logging on or off whenever the option changes.
 */
$enableDebugLogging.subscribe(toggleDebugLogging);
