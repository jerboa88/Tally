/**
 * A simple count object containing only a total.
 *
 * @property total - The total count value
 */
type TotalCount = {
	total: number;
};

/**
 * A count object with a total and subcategory breakdown.
 *
 * @typeParam T - Record type defining the subcategory counts
 * @property total - The total count value
 * @property by - Breakdown of counts by subcategory
 */
type Count<
	T extends Record<string, TotalCount | Count> = Record<string, TotalCount>,
> = TotalCount & {
	by: T;
};

/**
 * Grapheme count object returned by countGraphemes.
 *
 * @property total - Total grapheme count
 * @property by - Breakdown by grapheme type (spaces, letters, digits, punctuation, symbols)
 * @property related - Related counts (lines, paragraphs)
 */
interface GraphemeCount
	extends Count<{
		spaces: TotalCount;
		letters: TotalCount;
		digits: TotalCount;
		punctuation: TotalCount;
		symbols: TotalCount;
	}> {
	related: {
		paragraphs: TotalCount;
		lines: TotalCount;
	};
}

/**
 * Word count object returned by countWords.
 */
type WordCount = TotalCount;

/**
 * Sentence count object returned by countSentences.
 */
type SentenceCount = TotalCount;

/**
 * Combined results from all counting methods.
 *
 * Includes grapheme counts (excluding related), word counts, sentence counts,
 * and related counts (lines, paragraphs) at the top level.
 */
type AllCounts = GraphemeCount['related'] & {
	graphemes: Omit<GraphemeCount, 'related'>;
	words: WordCount;
	sentences: SentenceCount;
};

/**
 * Checks if a grapheme is a digit as per Unicode General Category Nd (Number, Decimal Digit).
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is a digit
 */
const isDigit = (grapheme: string) => /\p{Nd}/u.test(grapheme);

/**
 * Checks if a grapheme is a letter as per Unicode General Category L (Letter).
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is a letter
 */
const isLetter = (grapheme: string) => /\p{L}/u.test(grapheme);

/**
 * Checks if a grapheme is a space as per Unicode General Category Zs (Space Separator).
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is a space
 */
const isSpace = (grapheme: string) => /\p{Zs}/u.test(grapheme);

/**
 * Checks if a grapheme is a symbol a symbol as per Unicode General Category P (Punctuation)
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is punctuation
 */
const isPunctuation = (grapheme: string) => /\p{P}/u.test(grapheme);

/**
 * Checks if a grapheme is a symbol a symbol as per Unicode General Category S (Symbol)
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is a space
 */
const isSymbol = (grapheme: string) => /\p{S}/u.test(grapheme);

/**
 * Checks if a grapheme is a newline.
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is a newline
 */
function isNewline(grapheme: string): boolean {
	return grapheme === '\n';
}

/**
 * Text counter that uses Intl.Segmenter for locale-aware text analysis.
 * Creates segmenters once for efficient reuse across multiple counting operations.
 */
export class Tally {
	private graphemeSegmenter: Intl.Segmenter;
	private wordSegmenter: Intl.Segmenter;
	private sentenceSegmenter: Intl.Segmenter;
	private resolvedLocale: string;

	/**
	 * Creates a new TextCounter instance
	 *
	 * @param locale - The locale to use for segmentation (default: 'en')
	 */
	constructor(locale: Intl.LocalesArgument = 'en') {
		this.graphemeSegmenter = new Intl.Segmenter(locale, {
			granularity: 'grapheme',
		});
		this.wordSegmenter = new Intl.Segmenter(locale, { granularity: 'word' });
		this.sentenceSegmenter = new Intl.Segmenter(locale, {
			granularity: 'sentence',
		});
		this.resolvedLocale = this.graphemeSegmenter.resolvedOptions().locale;
	}

	/**
	 * Gets the resolved locale used by this counter
	 */
	getResolvedLocale(): string {
		return this.resolvedLocale;
	}

	/**
	 * Counts graphemes in text with a breakdown by grapheme type.
	 * Also counts lines and paragraphs in a single pass for efficiency.
	 *
	 * @param text - The text to analyze
	 * @returns Object containing grapheme counts, lines, paragraphs
	 */
	countGraphemes(text: string): GraphemeCount {
		let wasLastGraphemeNewline = false;

		// Total
		let total = 0;

		// By
		let spaces = 0;
		let letters = 0;
		let digits = 0;
		let punctuation = 0;
		let symbols = 0;

		// Related
		let paragraphs = 0;
		let lines = 0;

		for (const { segment: currentGrapheme } of this.graphemeSegmenter.segment(
			text,
		)) {
			total++;

			if (isNewline(currentGrapheme)) {
				lines++;

				if (wasLastGraphemeNewline) {
					paragraphs++;

					wasLastGraphemeNewline = false;
				}

				continue;
			}

			wasLastGraphemeNewline = true;

			if (isLetter(currentGrapheme)) {
				letters++;
			} else if (isDigit(currentGrapheme)) {
				digits++;
			} else if (isSpace(currentGrapheme)) {
				spaces++;
			} else if (isPunctuation(currentGrapheme)) {
				punctuation++;
			} else if (isSymbol(currentGrapheme)) {
				symbols++;
			}
		}

		if (wasLastGraphemeNewline) {
			paragraphs++;
		}

		// Count the last line if it doesn't end with a newline
		if (total > 0) {
			lines++;
		}

		return {
			total,
			by: {
				spaces: {
					total: spaces,
				},
				letters: {
					total: letters,
				},
				digits: {
					total: digits,
				},
				punctuation: {
					total: punctuation,
				},
				symbols: {
					total: symbols,
				},
			},
			related: {
				paragraphs: {
					total: paragraphs,
				},
				lines: {
					total: lines,
				},
			},
		};
	}

	/**
	 * Counts words in text using locale-aware segmentation
	 *
	 * @param text - The text to analyze
	 * @returns Object containing total word count
	 */
	countWords(text: string): WordCount {
		let total = 0;

		for (const { isWordLike } of this.wordSegmenter.segment(text)) {
			if (isWordLike) {
				total++;
			}
		}

		return {
			total,
		};
	}

	/**
	 * Counts sentences in text using locale-aware segmentation
	 *
	 * @param text - The text to analyze
	 * @returns Object containing total sentence count
	 */
	countSentences(text: string): SentenceCount {
		let total = 0;

		for (const { segment: currentSentence } of this.sentenceSegmenter.segment(
			text,
		)) {
			// Don't count empty lines as sentences
			if (currentSentence.trim() === '') {
				continue;
			}

			total++;
		}

		return {
			total,
		};
	}

	/**
	 * Performs all text analysis operations and returns combined counts.
	 *
	 * @param text - The text to analyze
	 * @returns An object containing all count types (graphemes, words, sentences, paragraphs, lines)
	 */
	countAll(text: string): AllCounts {
		const graphemesResult = this.countGraphemes(text);
		const wordsResult = this.countWords(text);
		const sentencesResult = this.countSentences(text);

		return {
			graphemes: graphemesResult,
			words: wordsResult,
			sentences: sentencesResult,
			paragraphs: graphemesResult.related.paragraphs,
			lines: graphemesResult.related.lines,
		};
	}
}
