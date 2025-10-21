import { runTests } from './utils.ts';

const locale = 'de-DE' as const;
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
		input: 'Glückwunsch!',
		expectedGraphemes: {
			total: 12,
			by: {
				spaces: {
					total: 0,
				},
				letters: {
					total: 11,
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
		input: 'Ich vermisse dich.',
		expectedGraphemes: {
			total: 18,
			by: {
				spaces: {
					total: 2,
				},
				letters: {
					total: 15,
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
			total: 3,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '1 sentence w/ punctuation',
		// https://tatoeba.org/en/sentences/show/1360
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		input: 'Damals im Gymnasium bin ich jeden Morgen um 6 Uhr aufgestanden.',
		expectedGraphemes: {
			total: 63,
			by: {
				spaces: {
					total: 10,
				},
				letters: {
					// DamalsimGymnasiumbinichjedenMorgenumUhraufgestanden
					total: 51,
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
			total: 10,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '2 sentences',
		// https://tatoeba.org/en/sentences/show/1370
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		input: 'Ich kann es ihr jetzt nicht sagen. Das ist nicht mehr so einfach.',
		expectedGraphemes: {
			total: 65,
			by: {
				spaces: {
					total: 12,
				},
				letters: {
					// IchkannesihrjetztnichtsagenDasistnichtmehrsoeinfach
					total: 51,
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
			total: 13,
		},
		expectedSentences: {
			total: 2,
		},
	},
	{
		label: '2 paragraphs',
		// https://www.ohchr.org/en/human-rights/universal-declaration/translations/german-deutsch: Articles 3 & 4
		input:
			'Jeder hat das Recht auf Leben, Freiheit und Sicherheit der Person.\n\nNiemand darf in Sklaverei oder Leibeigenschaft gehalten werden; Sklaverei und Sklavenhandel sind in allen ihren Formen verboten.',
		expectedGraphemes: {
			total: 196,
			by: {
				spaces: {
					total: 26,
				},
				letters: {
					// JederhatdasRechtaufLebenFreiheitundSicherheitderPersonNiemanddarfinSklavereioderLeibeigenschaftgehaltenwerdenSklavereiundSklavenhandelsindinallenihrenFormenverboten
					total: 164,
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
			total: 28,
		},
		expectedSentences: {
			total: 2,
		},
	},
];

runTests(locale, testCases);
