let isInWord = false;
let isInSentence = false;
let isInParagraph = false;
let isPendingSentenceStart = false;

let characters = 0;
let words = 0;
let sentences = 0;
let paragraphs = 0;
let spaces = 0;
let letters = 0;
let digits = 0;
let symbols = 0;

// TODO: Add line counting

function resetCounts() {
	isInWord = false;
	isInSentence = false;
	isInParagraph = false;
	isPendingSentenceStart = false;

	characters = 0;
	words = 0;
	sentences = 0;
	paragraphs = 0;
	spaces = 0;
	letters = 0;
	digits = 0;
	symbols = 0;
}

function startParagraph() {
	isInWord = true;
	isInSentence = true;
	isInParagraph = true;
	isPendingSentenceStart = false;
}

function endWord() {
	if (isInWord) {
		isInWord = false;

		words++;
	}
}

function endSentence() {
	endWord();

	if (isInSentence) {
		isInSentence = false;

		sentences++;
	}
}

function endParagraph() {
	endSentence();

	if (isInParagraph) {
		isInParagraph = false;

		paragraphs++;
	}
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
	return character === " ";
}

function isNewline(character) {
	return character === "\n";
}

function isPeriod(character) {
	return character === ".";
}

function isSentenceEnd(character) {
	// This is slightly faster than using `includes()` on a string, presumably because we don't need to perform case-sensitive comparisons
	return ["?", "!"].includes(character);
}

export async function getCounts(text) {
	const startTime = performance.timeOrigin + performance.now();

	resetCounts();

	for (let i = 0; i < text.length; i++) {
		const currentCharacter = text[i];

		characters++;

		if (isLetter(currentCharacter)) {
			startParagraph();

			letters++;
		} else if (isDigit(currentCharacter)) {
			startParagraph();

			digits++;
		} else if (isSpace(currentCharacter)) {
			spaces++;

			if (isPendingSentenceStart) {
				endSentence();
			} else {
				endWord();
			}
		} else if (isPeriod(currentCharacter)) {
			// Delay recording 1 sentence until we know if this is a decimal point or an end of sentence punctuation mark
			isPendingSentenceStart = true;
		} else if (isSentenceEnd(currentCharacter)) {
			endSentence();
		} else if (isNewline(currentCharacter)) {
			endParagraph();
		} else {
			symbols++;
		}
	}

	endParagraph();

	console.debug(
		`Processed text in ${performance.timeOrigin + performance.now() - startTime}ms`,
	);

	return {
		characters,
		words,
		sentences,
		paragraphs,
		spaces,
		letters,
		digits,
		symbols,
	};
}
