import { runTests } from './utils.ts';

const locale = 'en' as const;
const testCases = [
	{
		label: 'empty string',
		input: '',
		expectedGraphemes: {
			total: 0,
			by: {
				spaces: {
					total: 0,
				},
				letters: {
					total: 0,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 0,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 0,
				},
				lines: {
					total: 0,
				},
			},
		},
		expectedWords: {
			total: 0,
		},
		expectedSentences: {
			total: 0,
		},
	},
	{
		label: '1 word',
		// https://tatoeba.org/en/sentences/show/1437
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		input: 'Поздравляю!',
		expectedGraphemes: {
			total: 11,
			by: {
				spaces: {
					total: 0,
				},
				letters: {
					total: 10,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 1,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 1,
				},
				lines: {
					total: 1,
				},
			},
		},
		expectedWords: {
			total: 1,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '1 sentence',
		// https://tatoeba.org/en/sentences/show/1308
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		input: 'Я скучаю по тебе.',
		expectedGraphemes: {
			total: 17,
			by: {
				spaces: {
					total: 3,
				},
				letters: {
					total: 13,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 1,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 1,
				},
				lines: {
					total: 1,
				},
			},
		},
		expectedWords: {
			total: 4,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '1 sentence w/ punctuation',
		// https://tatoeba.org/en/sentences/show/1360
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		input: 'В старших классах я вставал каждое утро в 6 утра.',
		expectedGraphemes: {
			total: 49,
			by: {
				spaces: {
					total: 9,
				},
				letters: {
					total: 38,
				},
				digits: {
					total: 1,
				},
				punctuation: {
					total: 1,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 1,
				},
				lines: {
					total: 1,
				},
			},
		},
		expectedWords: {
			total: 9,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '2 sentences',
		// https://tatoeba.org/en/sentences/show/1370
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		input: "Я не могу ей сейчас рассказать. Всё уже не так просто.",
		expectedGraphemes: {
			total: 54,
			by: {
				spaces: {
					total: 10,
				},
				letters: {
					total: 42,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 2,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 1,
				},
				lines: {
					total: 1,
				},
			},
		},
		expectedWords: {
			total: 11,
		},
		expectedSentences: {
			total: 2,
		},
	},
	{
		label: '2 paragraphs',
		// https://www.un.org/en/about-us/universal-declaration-of-human-rights: Articles 3 & 4
		input:
			'Каждый человек имеет право на жизнь, свободу и личную неприкосновенность.\n\nНикто не должен содержаться в рабстве или подневольном состоянии; рабство и работорговля должны быть запрещены во всех их формах.',
		expectedGraphemes: {
			total: 204,
			by: {
				spaces: {
					total: 27,
				},
				letters: {
					total: 142,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 4,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 2,
				},
				lines: {
					total: 3,
				},
			},
		},
		expectedWords: {
			total: 29,
		},
		expectedSentences: {
			total: 2,
		},
	},
];

runTests(locale, testCases);
