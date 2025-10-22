import { SITE } from '@config/site';
import type { LocaleMessages } from '../types.ts';

const TAGLINE = 'Contatore di parole' as const;
const DESCRIPTION =
	'Il tuo contatore di parole preferito in modalità scura, ora con ancora più temi!' as const;

const IT: LocaleMessages = {
	site: {
		title: `${SITE.title} - ${TAGLINE}`,
		description: DESCRIPTION,
		longDescription: `${DESCRIPTION} Conta istantaneamente il numero di caratteri, parole, frasi, paragrafi e righe nel tuo testo con ${SITE.title}.`,
		features: [
			'Conteggio parole',
			'Conteggio caratteri',
			'Statistiche dei caratteri',
		],
		requirements: 'Richiede un browser web moderno',
		keywords: [
			'contatore di caratteri',
			'contatore di parole',
			'contatore di frasi',
			'contatore di paragrafi',
			'contatore di righe',
			'analisi del testo',
			'analizzatore di testo',
			'statistiche del testo',
			'strumento online',
		],
	},
	loader: {
		label: 'Caricamento...',
	},
	alert: {
		note: {
			title: 'Nota',
		},
	},
	header: {
		label: `Homepage di ${SITE.title}`,
	},
	input: {
		label: 'Area di testo',
		placeholder: 'Il rapido gatto marrone salta sopra il cane pigro...',
		largeInputWarning: {
			message:
				'Hai inserito una grande quantità di testo. Questo potrebbe causare problemi di prestazioni. Vuoi continuare?\n\n(Puoi disattivare questo avviso nelle opzioni.)',
		},
	},
	output: {
		placeholder: '-',
		map: {
			characters: {
				label: 'Caratteri',
			},
			words: {
				label: 'Parole',
			},
			sentences: {
				label: 'Frasi',
			},
			paragraphs: {
				label: 'Paragrafi',
			},
			lines: {
				label: 'Righe',
			},
			spaces: {
				label: 'Spazi',
			},
			letters: {
				label: 'Lettere',
			},
			digits: {
				label: 'Cifre',
			},
			punctuation: {
				label: 'Punteggiatura',
			},
			symbols: {
				label: 'Simboli',
			},
		},
	},
	nav: {
		viewSource: {
			label: 'Visualizza sorgente',
			tooltip: 'Visualizza il codice sorgente su GitHub',
		},
		reportIssue: {
			label: 'Segnala un problema',
			tooltip: 'Segnala un problema',
		},
		sponsor: {
			label: 'Sostienimi',
			tooltip: 'Sostieni questo progetto',
		},
		moreProjects: {
			label: 'Altri progetti',
			tooltip: 'Vedi altri miei progetti',
		},
	},
	locales: {
		title: 'Lingua',
	},
	options: {
		title: 'Opzioni',
		map: {
			warnOnLargeInputText: {
				label: 'Avvisa per input di grandi dimensioni',
			},
			rememberInputText: {
				label: 'Ricorda il testo inserito',
			},
			enableDebugLogging: {
				label: 'Abilita log di debug',
			},
		},
	},
	themes: {
		title: 'Tema',
		map: {
			auto: {
				label: 'Automatico',
			},
			amoled: {
				label: 'AMOLED',
			},
			light: {
				label: 'Chiaro',
			},
			dark: {
				label: 'Scuro',
			},
			teal: {
				label: 'Turchese',
			},
			dusk: {
				label: 'Crepuscolo',
			},
			solarizedLight: {
				label: 'Solarized Chiaro',
			},
			solarizedDark: {
				label: 'Solarized Scuro',
			},
			gruvboxLight: {
				label: 'Gruvbox Chiaro',
			},
			gruvboxDark: {
				label: 'Gruvbox Scuro',
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

export default IT;
