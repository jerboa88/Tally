const WAS_BLANK = 0;
const WAS_IN_PARAGRAPH = 1;
const WAS_IN_SENTENCE = 2;
const WAS_END_MARK = 3;
const WAS_IN_WORD = 4;

let lastCharacterState = WAS_BLANK;

// Counts
let characters = 0;
let words = 0;
let sentences = 0;
let paragraphs = 0;
let lines = 0;

// Character counts
let spaces = 0;
let letters = 0;
let digits = 0;
let symbols = 0;


function resetCounts() {
	lastCharacterState = WAS_BLANK;
	characters = 0;
	words = 0;
	sentences = 0;
	paragraphs = 0;
	lines = 0;
	spaces = 0;
	letters = 0;
	digits = 0;
	symbols = 0;
}

function isDigit(character) {
	const charCode = character.charCodeAt();

	// digits 0-9
	return charCode >= 48 && charCode <= 57;
}

function isLetter(character) {
	const charCode = character.charCodeAt();

	return (
		// lowercase a-z || uppercase A-Z
		(charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90)
	);
}

function isSpace(character) {
	return character === ' ';
}

function isNewline(character) {
	return character === '\n';
}

function isEndMark(character) {
	// This is slightly faster than using `includes()` on a string, presumably because we don't need to perform case-sensitive comparisons
	return ['.', '?', '!'].includes(character);
}

export async function getCounts(text, locales = 'en') {
	const startTime = performance.timeOrigin + performance.now();
	const graphemeSegmenter = new Intl.Segmenter(locales, {
		granularity: 'grapheme',
	});
	const segmentIterator = graphemeSegmenter.segment(text)[Symbol.iterator]();

	resetCounts();

	for (const { segment: currentCharacter } of segmentIterator) {
		characters++;

		if (isLetter(currentCharacter)) {
			letters++;

			lastCharacterState = WAS_IN_WORD;
		} else if (isDigit(currentCharacter)) {
			digits++;

			lastCharacterState = WAS_IN_WORD;
		} else if (isSpace(currentCharacter)) {
			spaces++;

			if (lastCharacterState >= WAS_IN_WORD) {
				words++;

				lastCharacterState = WAS_IN_SENTENCE;
			} else if (lastCharacterState >= WAS_END_MARK) {
				words++;
				sentences++;

				lastCharacterState = WAS_IN_PARAGRAPH;
			}
		} else if (
			lastCharacterState >= WAS_IN_WORD &&
			isEndMark(currentCharacter)
		) {
			symbols++;

			// Delay recording a word/sentence until we know if this is a decimal point or an end of sentence punctuation mark
			lastCharacterState = WAS_END_MARK;
		} else if (isNewline(currentCharacter)) {
			if (lastCharacterState >= WAS_IN_PARAGRAPH) {
				words++;
				sentences++;
				paragraphs++;

				lastCharacterState = WAS_BLANK;
			}

			lines++;
		} else {
			symbols++;
		}
	}

	if (lastCharacterState >= WAS_END_MARK) {
		words++;
	}

	if (lastCharacterState >= WAS_IN_SENTENCE) {
		sentences++;
	}

	if (lastCharacterState >= WAS_IN_PARAGRAPH) {
		paragraphs++;
	}

	// Count the last line if it doesn't end with a newline
	// Skip if the input is an empty string
	if (characters > 0) {
		lines++;
	}

	console.debug(
		`Processed text in ${(performance.timeOrigin + performance.now() - startTime).toFixed(0)}ms`,
	);

	return {
		characters,
		words,
		sentences,
		paragraphs,
		lines,
		spaces,
		letters,
		digits,
		symbols,
	};
}
