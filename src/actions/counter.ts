import { INPUT } from '@lib/config/input.ts';
import {
	$inputText,
	$warnOnLargeInputText,
	$outputCounts,
} from '@stores/index.ts';
import {} from '@stores/index.ts';
import { getCounts } from '@lib/tally-ts/index.ts';
import { getLocaleStrings } from '@lib/i18n/index.ts';

const msg = getLocaleStrings().input.largeInputWarning.message;

/**
 * Updates the output counts based on the current input text.
 *
 * Warns the user and requests confirmation if the input exceeds the maximum
 * character limit (when warnings are enabled). Clears the output if the user
 * cancels the confirmation.
 *
 * @returns A promise that resolves when the counts have been updated
 */
export async function updateCounts() {
	const text = $inputText.get();

	// Warn the user if the input text is large
	if ($warnOnLargeInputText.get() && text.length > INPUT.maxCharacters) {
		if (!confirm(msg)) {
			$outputCounts.set(null);

			return;
		}
	}

	const counts = await getCounts(text);

	$outputCounts.set(counts);
}
