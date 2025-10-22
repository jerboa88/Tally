import { SITE } from '@config/site';
import type { LocaleMessages } from '../types.ts';

const TAGLINE = 'Wortzähler' as const;
const DESCRIPTION =
	'Dein bevorzugter Wortzähler im Dunkelmodus — jetzt mit noch mehr Themes!' as const;

const DE: LocaleMessages = {
	site: {
		title: `${SITE.title} - ${TAGLINE}`,
		description: DESCRIPTION,
		longDescription: `${DESCRIPTION} Zähle sofort die Anzahl der Zeichen, Wörter, Sätze, Absätze und Zeilen in deinem Text mit ${SITE.title}.`,
		features: ['Wortzählung', 'Zeichenzählung', 'Zeichenstatistiken'],
		requirements: 'Erfordert einen modernen Webbrowser',
		keywords: [
			'zeichenzähler',
			'wortzähler',
			'satzzähler',
			'absatzzähler',
			'zeilenzähler',
			'textanalyse',
			'text-analysewerkzeug',
			'textstatistiken',
			'online-tool',
		],
	},
	loader: {
		label: 'Wird geladen…',
	},
	alert: {
		note: {
			title: 'Hinweis',
		},
	},
	header: {
		label: `${SITE.title} Startseite`,
	},
	input: {
		label: 'Texteingabe',
		placeholder: 'Der flinke braune Kater springt über den faulen Hund...',
		largeInputWarning: {
			message:
				'Sie haben eine große Menge Text eingegeben. Dies kann zu Leistungsproblemen führen. Möchten Sie fortfahren?\n\n(Sie können diese Warnung in den Optionen deaktivieren.)',
		},
	},
	output: {
		placeholder: '-',
		map: {
			characters: {
				label: 'Zeichen',
			},
			words: {
				label: 'Wörter',
			},
			sentences: {
				label: 'Sätze',
			},
			paragraphs: {
				label: 'Absätze',
			},
			lines: {
				label: 'Zeilen',
			},
			spaces: {
				label: 'Leerzeichen',
			},
			letters: {
				label: 'Buchstaben',
			},
			digits: {
				label: 'Ziffern',
			},
			punctuation: {
				label: 'Interpunktion',
			},
			symbols: {
				label: 'Symbole',
			},
		},
	},
	nav: {
		viewSource: {
			label: 'Quellcode anzeigen',
			tooltip: 'Den Quellcode auf GitHub ansehen',
		},
		reportIssue: {
			label: 'Problem melden',
			tooltip: 'Ein Problem melden',
		},
		sponsor: {
			label: 'Sponsoren',
			tooltip: 'Dieses Projekt unterstützen',
		},
		moreProjects: {
			label: 'Weitere Projekte',
			tooltip: 'Weitere Projekte von mir ansehen',
		},
	},
	locales: {
		title: 'Sprache',
	},
	options: {
		title: 'Optionen',
		map: {
			warnOnLargeInputText: {
				label: 'Bei großer Eingabe warnen',
			},
			rememberInputText: {
				label: 'Eingegebenen Text merken',
			},
			enableDebugLogging: {
				label: 'Debug-Logging aktivieren',
			},
		},
	},
	themes: {
		title: 'Theme',
		map: {
			auto: {
				label: 'Automatisch',
			},
			amoled: {
				label: 'AMOLED',
			},
			light: {
				label: 'Hell',
			},
			dark: {
				label: 'Dunkel',
			},
			teal: {
				label: 'Türkis',
			},
			dusk: {
				label: 'Dämmerung',
			},
			solarizedLight: {
				label: 'Solarized Hell',
			},
			solarizedDark: {
				label: 'Solarized Dunkel',
			},
			gruvboxLight: {
				label: 'Gruvbox Hell',
			},
			gruvboxDark: {
				label: 'Gruvbox Dunkel',
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

export default DE;
