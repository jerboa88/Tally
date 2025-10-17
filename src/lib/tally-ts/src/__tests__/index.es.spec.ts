import { runTests } from './utils.ts';

const locale = 'es' as const;
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
		input: '¡Felicidades!',
		expectedGraphemes: {
			total: 13,
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
		input: 'Te extraño.',
		expectedGraphemes: {
			total: 11,
			by: {
				spaces: {
					total: 1,
				},
				letters: {
					total: 9,
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
		input:
			'Cuando yo estaba en el instituto, me levantaba a las 6 todas las mañanas.',
		expectedGraphemes: {
			total: 73,
			by: {
				spaces: {
					total: 13,
				},
				letters: {
					// Cuandoyoestabaenelinstitutomelevantabaalastodaslasmañanas
					total: 57,
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
			total: 13,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '2 sentences',
		// https://tatoeba.org/en/sentences/show/1370
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		input: 'No puedo decírselo ahora. Ya no es tan simple.',
		expectedGraphemes: {
			total: 46,
			by: {
				spaces: {
					total: 8,
				},
				letters: {
					// NopuedodecírseloahoraYanoestansimple
					total: 36,
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
		// https://www.un.org/es/about-us/universal-declaration-of-human-rights
		input:
			'Todo individuo tiene derecho a la vida, a la libertad y a la seguridad de su persona.\n\nNadie estará sometido a esclavitud ni a servidumbre, la esclavitud y la trata de esclavos están prohibidas en todas sus formas.',
		expectedGraphemes: {
			total: 214,
			by: {
				spaces: {
					total: 36,
				},
				letters: {
					// TodoindividuotienederechoalavidaalalibertadyalaseguridaddesupersonaNadieestarásometidoaesclavitudniaservidumbrelaesclavitudylatratadeesclavosestánprohibidasentodassusformas
					total: 172,
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
