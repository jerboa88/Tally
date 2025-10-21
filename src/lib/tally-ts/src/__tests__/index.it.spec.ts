import { runTests } from './utils.ts';

const locale = 'it' as const;
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
		input: 'Congratulazioni!',
		expectedGraphemes: {
			total: 16,
			by: {
				spaces: {
					total: 0,
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
		input: 'Mi manchi.',
		expectedGraphemes: {
			total: 10,
			by: {
				spaces: {
					total: 1,
				},
				letters: {
					total: 8,
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
			total: 2,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '1 sentence w/ punctuation',
		// https://tatoeba.org/en/sentences/show/1360
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		input: 'Alle superiori mi alzavo alle 6 ogni mattina.',
		expectedGraphemes: {
			total: 45,
			by: {
				spaces: {
					total: 7,
				},
				letters: {
					// Allesuperiorimialzavoalleognimattina
					total: 36,
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
			total: 7,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '2 sentences',
		// https://tatoeba.org/en/sentences/show/1370
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		input: 'Non posso dirglielo adesso. Non è più così semplice.',
		expectedGraphemes: {
			total: 52,
			by: {
				spaces: {
					total: 8,
				},
				letters: {
					// NonpossodirglieloadessoNonèpiùcosìsemplice
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
			total: 9,
		},
		expectedSentences: {
			total: 2,
		},
	},
	{
		label: '2 paragraphs',
		// https://www.ohchr.org/en/human-rights/universal-declaration/translations/italian: Articles 3 & 4
		input:
			'Ogni individuo ha diritto alla vita, alla libertà ed alla sicurezza della propria persona.\n\nNessun individuo potrà essere tenuto in stato di schiavitù o di servitù; la schiavitù e la tratta degli schiavi saranno proibite sotto qualsiasi forma.',
		expectedGraphemes: {
			total: 243,
			by: {
				spaces: {
					total: 36,
				},
				letters: {
					// OgniindividuohadirittoallavitaallalibertàedallasicurezzadellapropriapersonaNessunindividuopotràesseretenutoinstatodischiavitùodiservitùlaschiavitùelatrattadeglischiavisarannoproibitesottoqualsiasiforma
					total: 201,
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
			total: 38,
		},
		expectedSentences: {
			total: 2,
		},
	},
];

runTests(locale, testCases);
