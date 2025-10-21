import { runTests } from './utils.ts';

const locale = 'id' as const;
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
		input: 'Selamat!',
		expectedGraphemes: {
			total: 8,
			by: {
				spaces: {
					total: 0,
				},
				letters: {
					total: 7,
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
		input: 'Aku merindukanmu.',
		expectedGraphemes: {
			total: 17,
			by: {
				spaces: {
					total: 1,
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
		input: 'Saat masih pelajar, saya bangun jam 6 setiap pagi.',
		expectedGraphemes: {
			total: 50,
			by: {
				spaces: {
					total: 8,
				},
				letters: {
					// Saatmasihpelajarsayabangunjamsetiappagi
					total: 39,
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
			total: 8,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '2 sentences',
		// Google Translate
		input:
			'Aku tidak bisa memberitahunya sekarang. Tidak sesederhana itu lagi.',
		expectedGraphemes: {
			total: 67,
			by: {
				spaces: {
					total: 8,
				},
				letters: {
					// AkutidakbisamemberitahunyasekarangTidaksesederhanaitulagi
					total: 57,
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
		// https://www.ohchr.org/en/human-rights/universal-declaration/translations/indonesian: Articles 3 & 4
		input:
			'Setiap orang berhak atas penghidupan, kebebasan dan keselamatan individu.\n\nTidak seorang pun boleh diperbudak atau diperhambakan, perbudakan dan perdagangan budak dalam bentuk apapun mesti dilarang.',
		expectedGraphemes: {
			total: 198,
			by: {
				spaces: {
					total: 23,
				},
				letters: {
					// SetiaporangberhakataspenghidupankebebasandankeselamatanindividuTidakseorangpunbolehdiperbudakataudiperhambakanperbudakandanperdaganganbudakdalambentukapapunmestidilarang
					total: 169,
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
			total: 25,
		},
		expectedSentences: {
			total: 2,
		},
	},
];

runTests(locale, testCases);
