import { SITE } from '@config/site';
import type { LocaleMessages } from '../types.ts';

const TAGLINE = 'Penghitung kata' as const;
const DESCRIPTION =
	'Penghitung kata favorit Anda dalam mode gelap — kini dengan lebih banyak tema!' as const;

const ID: LocaleMessages = {
	site: {
		title: `${SITE.title} - ${TAGLINE}`,
		description: DESCRIPTION,
		longDescription: `${DESCRIPTION} Hitung secara instan jumlah karakter, kata, kalimat, paragraf, dan baris dalam teks Anda dengan ${SITE.title}.`,
		features: [
			'Penghitungan kata',
			'Penghitungan karakter',
			'Statistik karakter',
		],
		requirements: 'Memerlukan browser web modern',
		keywords: [
			'penghitung karakter',
			'penghitung kata',
			'penghitung kalimat',
			'penghitung paragraf',
			'penghitung baris',
			'analisis teks',
			'penganalisis teks',
			'statistik teks',
			'alat daring',
		],
	},
	loader: {
		label: 'Memuat...',
	},
	alert: {
		note: {
			title: 'Catatan',
		},
	},
	header: {
		label: `Beranda ${SITE.title}`,
	},
	input: {
		label: 'Masukan teks',
		placeholder: 'Kucing coklat cepat melompat di atas anjing malas...',
		largeInputWarning: {
			message:
				'Anda telah memasukkan sejumlah besar teks. Ini dapat menyebabkan masalah kinerja. Ingin melanjutkan?\n\n(Anda dapat menonaktifkan peringatan ini di opsi.)',
		},
	},
	output: {
		placeholder: '-',
		map: {
			characters: {
				label: 'Karakter',
			},
			words: {
				label: 'Kata',
			},
			sentences: {
				label: 'Kalimat',
			},
			paragraphs: {
				label: 'Paragraf',
			},
			lines: {
				label: 'Baris',
			},
			spaces: {
				label: 'Spasi',
			},
			letters: {
				label: 'Huruf',
			},
			digits: {
				label: 'Angka',
			},
			punctuation: {
				label: 'Tanda baca',
			},
			symbols: {
				label: 'Simbol',
			},
		},
	},
	nav: {
		viewSource: {
			label: 'Lihat sumber',
			tooltip: 'Lihat kode sumber di GitHub',
		},
		reportIssue: {
			label: 'Laporkan masalah',
			tooltip: 'Laporkan masalah',
		},
		sponsor: {
			label: 'Dukung saya',
			tooltip: 'Dukung proyek ini',
		},
		moreProjects: {
			label: 'Proyek lainnya',
			tooltip: 'Lihat proyek lain dari saya',
		},
	},
	locales: {
		title: 'Bahasa',
	},
	options: {
		title: 'Opsi',
		map: {
			warnOnLargeInputText: {
				label: 'Peringatkan saat input berukuran besar',
			},
			rememberInputText: {
				label: 'Simpan teks masukan',
			},
			enableDebugLogging: {
				label: 'Aktifkan logging debug',
			},
		},
	},
	themes: {
		title: 'Tema',
		map: {
			auto: {
				label: 'Otomatis',
			},
			amoled: {
				label: 'AMOLED',
			},
			light: {
				label: 'Terang',
			},
			dark: {
				label: 'Gelap',
			},
			teal: {
				label: 'Teal',
			},
			dusk: {
				label: 'Senja',
			},
			solarizedLight: {
				label: 'Solarized Terang',
			},
			solarizedDark: {
				label: 'Solarized Gelap',
			},
			gruvboxLight: {
				label: 'Gruvbox Terang',
			},
			gruvboxDark: {
				label: 'Gruvbox Gelap',
			},
			catppuccinLatte: {
				label: 'Catppuccin Latte',
			},
			catppuccinMocha: {
				label: 'Catppuccin Mocha',
			},
			nord: {
				label: 'Nord',
			},
			dracula: {
				label: 'Dracula',
			},
		},
	},
} as const satisfies LocaleMessages;

export default ID;
