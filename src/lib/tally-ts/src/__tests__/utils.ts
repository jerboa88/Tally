import { describe, expect, test } from 'bun:test';
import { Tally } from '../index.ts';

type Locale = ConstructorParameters<typeof Tally>[0];
type GraphemeCount = ReturnType<typeof Tally.prototype.countGraphemes>;
type WordCount = ReturnType<typeof Tally.prototype.countWords>;
type SentenceCount = ReturnType<typeof Tally.prototype.countSentences>;

/**
 * Array of test case definitions for validating Tally counting methods.
 *
 * Each test case includes input text and expected counts for graphemes, words, and sentences.
 */
type TestCases = {
	label: string;
	input: string;
	expectedGraphemes: GraphemeCount;
	expectedWords: WordCount;
	expectedSentences: SentenceCount;
}[];

/**
 * Returns the entries of an object with proper type inference.
 *
 * @param obj - The object to extract entries from
 * @returns An array of key-value pairs, properly typed
 */
function entriesOf<T extends object>(obj: T): [keyof T, T[keyof T]][] {
	return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * Executes a suite of Tally counting tests for a given locale.
 *
 * Validates grapheme, word, and sentence counting against expected values
 * for each test case using Bun's test runner.
 *
 * @param locale - The locale to use for creating the Tally instance
 * @param testCases - Array of test cases with inputs and expected outputs
 */
export function runTests(
	locale: Locale,
	testCases: TestCases,
	skipCountWords = false,
) {
	const tally = new Tally(locale);

	describe.each(testCases)(
		'$label',
		({ input, expectedGraphemes, expectedWords, expectedSentences }) => {
			// countGraphemes()
			describe(`graphemes`, () => {
				const graphemes = tally.countGraphemes(input);

				// Total
				test(`total count is ${expectedGraphemes.total}`, () => {
					expect(graphemes.total).toBe(expectedGraphemes.total);
				});

				// By
				test.each(
					entriesOf(expectedGraphemes.by).map(([key, value]) => [
						key,
						value.total,
					]),
				)(`%s count is %i`, (key, expected) => {
					expect(graphemes.by[key].total).toBe(expected);
				});

				// Related
				test.each(
					entriesOf(expectedGraphemes.related).map(([key, value]) => [
						key,
						value.total,
					]),
				)(`%s count is %i`, (key, expected) => {
					expect(graphemes.related[key].total).toBe(expected);
				});
			});

			// countWords()
			describe.skipIf(skipCountWords)(`words`, () => {
				const words = tally.countWords(input);
				const total = (
					expectedWords as Exclude<typeof expectedWords, undefined>
				).total;

				// Total
				test(`total count is ${total}`, () => {
					expect(words.total).toBe(total);
				});
			});

			// countSentences()
			describe(`sentences`, () => {
				const sentences = tally.countSentences(input);

				// Total
				test(`total count is ${expectedSentences.total}`, () => {
					expect(sentences.total).toBe(expectedSentences.total);
				});
			});
		},
	);
}
