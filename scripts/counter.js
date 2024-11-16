export async function getCounts(text) {
	const startTime = performance.timeOrigin + performance.now();

	let isWordFound = false;
	let isSentenceFound = false;
	let isParagraphFound = false;

	const countObj = {
		characters: 0,
		words: 0,
		sentences: 0,
		paragraphs: 0,
		spaces: 0,
		letters: 0,
		digits: 0,
		specialCharacters: 0,
	};

	for (let i = 0; i < text.length; i++) {
		const currentCharacter = text[i];

		countObj.characters++;

		if (/\d/.test(currentCharacter)) {
			isWordFound = true;
			isSentenceFound = true;
			isParagraphFound = true;

			countObj.digits++;
		} else if (/\w/.test(currentCharacter)) {
			isWordFound = true;
			isSentenceFound = true;
			isParagraphFound = true;

			countObj.letters++;
		} else {
			if (/ /.test(currentCharacter)) {
				countObj.spaces++;

				if (isWordFound) {
					isWordFound = false;

					countObj.words++;
				}
			} else if (/[\.\?\!]/.test(currentCharacter)) {
				if (isWordFound) {
					isWordFound = false;

					countObj.words++;
				}

				if (isSentenceFound) {
					isSentenceFound = false;

					countObj.sentences++;
				}
			} else if (/\n/.test(currentCharacter)) {
				if (isWordFound) {
					isWordFound = false;

					countObj.words++;
				}

				if (isSentenceFound) {
					isSentenceFound = false;

					countObj.sentences++;
				}

				if (isParagraphFound) {
					isParagraphFound = false;

					countObj.paragraphs++;
				}
			} else {
				countObj.specialCharacters++;
			}
		}
	}

	if (isWordFound) {
		countObj.words++;
	}

	if (isSentenceFound) {
		countObj.sentences++;
	}

	if (isParagraphFound) {
		countObj.paragraphs++;
	}

	console.debug(
		`Processed text in ${performance.timeOrigin + performance.now() - startTime}ms`,
	);

	return countObj;
}
