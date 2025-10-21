import { runTests } from './utils.ts';

const locale = 'fr' as const;
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
		input: 'Félicitations !',
		expectedGraphemes: {
			total: 15,
			by: {
				spaces: {
					total: 1,
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
		input: 'Tu me manques.',
		expectedGraphemes: {
			total: 14,
			by: {
				spaces: {
					total: 2,
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
		input: "À l'époque du lycée je me levais à 6h tous les matins.",
		expectedGraphemes: {
			total: 54,
			by: {
				spaces: {
					total: 11,
				},
				letters: {
					// Àlépoquedulycéejemelevaisàhtouslesmatins
					total: 40,
				},
				digits: {
					total: 1,
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
			total: 12,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '2 sentences',
		// https://tatoeba.org/en/sentences/show/1370
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		input: "Je ne peux pas lui dire maintenant. Ce n'est plus aussi simple.",
		expectedGraphemes: {
			total: 63,
			by: {
				spaces: {
					total: 11,
				},
				letters: {
					// JenepeuxpasluidiremaintenantCenestplusaussisimple
					total: 49,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 3,
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
			total: 12,
		},
		expectedSentences: {
			total: 2,
		},
	},
	{
		label: '2 paragraphs',
		// https://www.un.org/fr/about-us/universal-declaration-of-human-rights: Articles 3 & 4
		input:
			"Tout individu a droit à la vie, à la liberté et à la sûreté de sa personne.\n\nNul ne sera tenu en esclavage ni en servitude; l'esclavage et la traite des esclaves sont interdits sous toutes leurs formes.",
		expectedGraphemes: {
			total: 202,
			by: {
				spaces: {
					total: 36,
				},
				letters: {
					// ToutindividuadroitàlavieàlalibertéetàlasûretédesapersonneNulneseratenuenesclavagenienservitudelesclavageetlatraitedesesclavessontinterditssoustoutesleursformes
					total: 159,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 5,
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
