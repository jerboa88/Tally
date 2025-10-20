import { SITE } from '@lib/config/site';
import type { LocaleMessages } from '../types.ts';

const TAGLINE = 'Contador de palabras' as const;
const DESCRIPTION =
	'Tu contador de palabras favorito en modo oscuro, ¡ahora con aún más temas!' as const;

const ES: LocaleMessages = {
	site: {
		title: `${SITE.title} - ${TAGLINE}`,
		description: DESCRIPTION,
		longDescription: `${DESCRIPTION} Cuenta al instante el número de caracteres, palabras, oraciones, párrafos y líneas en tu texto con ${SITE.title}.`,
		features: [
			'Contador de palabras',
			'Contador de caracteres',
			'Estadísticas de caracteres',
		],
		requirements: 'Requiere un navegador web moderno',
		keywords: [
			'contador de caracteres',
			'contador de palabras',
			'contador de oraciones',
			'contador de párrafos',
			'contador de líneas',
			'análisis de texto',
			'analizador de texto',
			'estadísticas de texto',
			'herramienta en línea',
		],
	},
	loader: {
		label: 'Cargando...',
	},
	alert: {
		note: {
			title: 'Nota',
		},
	},
	header: {
		label: `Página principal de ${SITE.title}`,
	},
	input: {
		label: 'Entrada de texto',
		placeholder: 'El rápido gato marrón salta sobre el perro perezoso...',
		largeInputWarning: {
			message:
				'Has introducido una gran cantidad de texto. Esto puede causar problemas de rendimiento. ¿Deseas continuar?\n\n(Puedes desactivar esta advertencia en las opciones.)',
		},
	},
	output: {
		placeholder: '-',
		map: {
			characters: {
				label: 'Caracteres',
			},
			words: {
				label: 'Palabras',
			},
			sentences: {
				label: 'Oraciones',
			},
			paragraphs: {
				label: 'Párrafos',
			},
			lines: {
				label: 'Líneas',
			},
			spaces: {
				label: 'Espacios',
			},
			letters: {
				label: 'Letras',
			},
			digits: {
				label: 'Dígitos',
			},
			punctuation: {
				label: 'Signos de puntuación',
			},
			symbols: {
				label: 'Símbolos',
			},
		},
	},
	nav: {
		viewSource: {
			label: 'Ver código',
			tooltip: 'Ver el código fuente en GitHub',
		},
		reportIssue: {
			label: 'Reportar un problema',
			tooltip: 'Reportar un problema',
		},
		sponsor: {
			label: 'Patrocinarme',
			tooltip: 'Patrocinar este proyecto',
		},
		moreProjects: {
			label: 'Más proyectos',
			tooltip: 'Ver más proyectos míos',
		},
	},
	locales: {
		title: 'Idioma',
	},
	options: {
		title: 'Opciones',
		map: {
			warnOnLargeInputText: {
				label: 'Advertir sobre entradas de gran tamaño',
			},
			rememberInputText: {
				label: 'Recordar texto de entrada',
			},
			enableDebugLogging: {
				label: 'Habilitar registros de depuración',
			},
		},
	},
	themes: {
		title: 'Tema',
		map: {
			auto: {
				label: 'Automático',
			},
			amoled: {
				label: 'AMOLED',
			},
			light: {
				label: 'Claro',
			},
			dark: {
				label: 'Oscuro',
			},
			teal: {
				label: 'Turquesa',
			},
			dusk: {
				label: 'Crepúsculo',
			},
			solarizedLight: {
				label: 'Solarized Claro',
			},
			solarizedDark: {
				label: 'Solarized Oscuro',
			},
			gruvboxLight: {
				label: 'Gruvbox Claro',
			},
			gruvboxDark: {
				label: 'Gruvbox Oscuro',
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
				label: 'Drácula',
			},
		},
	},
} as const satisfies LocaleMessages;

export default ES;
