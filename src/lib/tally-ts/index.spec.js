import test from 'ava';
import { getCounts } from './index.ts';

const getCountsResultIs = test.macro(async (t, input, expected) => {
	const actual = await getCounts(input);

	t.deepEqual(actual, expected);
});

test('Empty string', getCountsResultIs, '', {
	characters: 0,
	words: 0,
	sentences: 0,
	paragraphs: 0,
	lines: 0,
	spaces: 0,
	letters: 0,
	digits: 0,
	symbols: 0,
});

test('Single word', getCountsResultIs, 'Hello', {
	characters: 5,
	words: 1,
	sentences: 1,
	paragraphs: 1,
	lines: 1,
	spaces: 0, // ''
	letters: 5, // 'Hello'
	digits: 0, // ''
	symbols: 0, // ''
});

test('Sentence with punctuation', getCountsResultIs, 'Hello, world!', {
	characters: 13,
	words: 2,
	sentences: 1,
	paragraphs: 1,
	lines: 1,
	spaces: 1, // ' '
	letters: 10, // 'Helloworld'
	digits: 0, // ''
	symbols: 2, // ',!'
});

test(
	'Multiple sentences',
	getCountsResultIs,
	'This is the first sentence. This is the second!',
	{
		characters: 47,
		words: 9,
		sentences: 2,
		paragraphs: 1,
		spaces: 8, // '        '
		letters: 37, // 'ThisisthefirstsentenceThisisthesecond'
		digits: 0, // ''
		symbols: 2, // '.!'
		lines: 1,
	},
);

test(
	'Numbers and special characters',
	getCountsResultIs,
	'User123 logged in at 10:45am on 12/12/2023.',
	{
		characters: 43,
		words: 7,
		sentences: 1,
		paragraphs: 1,
		lines: 1,
		spaces: 6, // '      '
		letters: 18, // 'Userloggedinatamon'
		digits: 15, // '123104512122023'
		symbols: 4, // '://.'
	},
);

test(
	'Newlines and paragraphs',
	getCountsResultIs,
	'Line one.\nLine two.\n\nNew paragraph here.',
	{
		characters: 40,
		words: 7,
		sentences: 3,
		paragraphs: 3,
		lines: 4,
		spaces: 4, // '    '
		letters: 30, // 'LineoneLinetwoNewparagraphhere'
		digits: 0, // ''
		symbols: 3, // '...'
	},
);

test('Whitespace only', getCountsResultIs, '   \n\t  ', {
	characters: 7,
	words: 0,
	sentences: 0,
	paragraphs: 0,
	lines: 2,
	spaces: 5, // '     '
	letters: 0, // ''
	digits: 0, // ''
	symbols: 1, // '\t'
});

test('Unicode and emoji', getCountsResultIs, 'Hello 🌍! 123 💡', {
	characters: 14,
	words: 2,
	sentences: 2,
	paragraphs: 1,
	lines: 1,
	spaces: 3, // '   '
	letters: 5, // 'Hello'
	digits: 3, // '123'
	symbols: 3, // '🌍!💡'
});

test('Only digits', getCountsResultIs, '123 456 7890', {
	characters: 12,
	words: 3,
	sentences: 1,
	paragraphs: 1,
	lines: 1,
	spaces: 2, // '  '
	letters: 0, // ''
	digits: 10, // '1234567890'
	symbols: 0, // ''
});

// TODO: Fix this test. The simplified test case '1 .' should have one word, but the trailing period causes it to have two words.
test(
	'Complex multiline text',
	getCountsResultIs,
	'Hello world! This is line one.\nThis is line two, with digits: 42 and symbols #, $, %.\n\nFinal line here.',
	{
		characters: 103,
		words: 21,
		sentences: 4,
		paragraphs: 3,
		lines: 4,
		spaces: 18, // '                  '
		letters: 69, // 'HelloworldThisislineoneThisislinetwowithdigitsandsymbolsFinallinehere'
		digits: 2, // '42'
		symbols: 11, // '!.,:#,$,%..'
	},
);
