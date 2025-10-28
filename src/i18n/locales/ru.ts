import { SITE } from '@config/site';
import type { LocaleMessages } from '../types.ts';

// A short tagline shown beside the app name in some cases for additional context
const TAGLINE = 'Счётчик слов' as const;
// A short description of the site
const DESCRIPTION =
	'Ваш любимый счётчик слов в темном режиме, теперь с ещё большим количеством тем!' as const;

/**
 * English locale strings for the entire application.
 *
 * Contains translations for site metadata, UI labels, messages, and all user-facing text.
 */
const RU: LocaleMessages = {
	site: {
		// Full site title shown in browser tabs
		title: `${SITE.title} - ${TAGLINE}`,
		// Short description shown below the page title
		description: DESCRIPTION,
		// Extended description for SEO and social sharing
		longDescription: `${DESCRIPTION} Подсчитайте количество символов, слов, предложений, абзацев и строк в тексте мгновенно с помощью ${SITE.title}.`,
		// SEO list of key features. Used in structured data markup
		features: ['Подсчет слов', 'Подсчет символов', 'Статистика символов'],
		// SEO browser requirements. Used in structured data markup
		requirements: 'Требуется современный веб-браузер',
		// SEO keywords. Used in structured data markup
		keywords: [
			'счётчик символов',
			'счётчик слов',
			'счётчик предложений',
			'счётчик параграфов',
			'счётчик строк',
			'text analysis',
			'text analyzer',
			'text statistics',
			'онлайн инструмент',
		],
	},
	loader: {
		label: 'Загрузка...',
	},
	alert: {
		note: {
			title: 'Примечание',
		},
	},
	header: {
		label: `Домашняя страница ${SITE.title}`,
	},
	input: {
		label: 'Ввод текста',
		// Placeholder text shown in empty input area
		placeholder: 'Шустрая бурая лисица прыгает через ленивого пса...',
		largeInputWarning: {
			// Warning message shown when input exceeds character limit
			message:
				"Вы ввели огромное количество текста. Это может вызвать проблемы с производительностью. Do you want to continue?\n\n(Вы можете отключить это предупреждение в настройках)",
		},
	},
	output: {
		// Placeholder text shown when no counts are available
		placeholder: '0',
		map: {
			// Character count label
			characters: {
				label: 'Символы',
			},
			// Word count label
			words: {
				label: 'Слова',
			},
			// Sentence count label
			sentences: {
				label: 'Предложения',
			},
			// Paragraph count label
			paragraphs: {
				label: 'Абзацы',
			},
			// Line count label
			lines: {
				label: 'Строки',
			},
			// Space count label
			spaces: {
				label: 'Пробелы',
			},
			// Letter count label
			letters: {
				label: 'Буквы',
			},
			// Digit count label
			digits: {
				label: 'Цифры',
			},
			// Punctuation count label
			punctuation: {
				label: 'Знаки препинания',
			},
			// Symbol/special count label
			symbols: {
				label: 'Специальные символы',
			},
		},
	},
	nav: {
		viewSource: {
			label: 'Исходный код',
			tooltip: 'Посмотреть исходный код на GitHub',
		},
		reportIssue: {
			label: 'Сообщить о проблеме',
			tooltip: 'Сообщить о проблеме',
		},
		sponsor: {
			label: 'Спонсировать меня',
			tooltip: 'Поддержать этот проект',
		},
		moreProjects: {
			label: 'Больше проектов',
			tooltip: 'Посмотреть больше моих проектов',
		},
	},
	locales: {
		title: 'Язык',
	},
	options: {
		// Section title for user preferences
		title: 'Настройки',
		// Option names
		map: {
			warnOnLargeInputText: {
				label: 'Warn on large input input',
			},
			rememberInputText: {
				label: 'Remember input text',
			},
			enableDebugLogging: {
				label: 'Enable debug logging',
			},
		},
	},
	themes: {
		// Section title for theme selector
		title: 'Тема',
		// Theme names
		map: {
			// Automatic theme based on system preference
			auto: {
				label: 'Авто',
			},
			// Pure black theme for OLED displays
			amoled: {
				label: 'AMOLED',
			},
			light: {
				label: 'Светлая',
			},
			dark: {
				label: 'Тёмная',
			},
			teal: {
				label: 'Teal',
			},
			dusk: {
				label: 'Dusk',
			},
			solarizedLight: {
				label: 'Solarized Light',
			},
			solarizedDark: {
				label: 'Solarized Dark',
			},
			gruvboxLight: {
				label: 'Gruvbox Light',
			},
			gruvboxDark: {
				label: 'Gruvbox Dark',
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

export default RU;
