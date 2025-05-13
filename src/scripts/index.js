import '@fontsource-variable/roboto-slab';
import '@fontsource-variable/roboto-flex';
import { get, set, removeAll } from './storage.js';
import { debounce } from './utils.js';
import { getCounts } from './counter.js';

(() => {
	const elementInput = document.getElementById('input');
	const elementSidebar = document.getElementsByClassName('sidebar')[0];
	// icon = document.getElementsByClassName('fa-gear')[0],
	const elementSaveSettingsInput = document.getElementById('savesettings');
	const elementSaveTextInput = document.getElementById('savetext');
	const elementMaxCharsInput = document.getElementById('maxchars');
	const elementOutputs = {
		characters: document.getElementById('characters'),
		words: document.getElementById('words'),
		sentences: document.getElementById('sentences'),
		paragraphs: document.getElementById('paragraphs'),
		lines: document.getElementById('lines'),
		spaces: document.getElementById('spaces'),
		letters: document.getElementById('letters'),
		digits: document.getElementById('digits'),
		symbols: document.getElementById('symbols'),
	};
	// deg = 0,
	const metaTagSafariIconColor = document.querySelector('link[rel=mask-icon]');
	const metaTagMsNavButtonColor = document.querySelector(
		'meta[name=msapplication-navbutton-color]',
	);
	const metaTagMsTileColor = document.querySelector(
		'meta[name=msapplication-TileColor]',
	);
	const metaTagAndroidThemeColor = document.querySelector(
		'meta[name=theme-color]',
	);
	const metaTagAppleThemeColor = document.querySelector(
		'meta[name=apple-mobile-web-app-status-bar-style]',
	);
	const themes = {
		auto: {
			checkbox: document.getElementById('autotheme'),
		},
		black: {
			checkbox: document.getElementById('blacktheme'),
			colors: [
				'#151515',
				'#222',
				'#202020',
				'#fff',
				'rgba(0,0,0,.5)',
				'rgba(255,255,255,.5)',
				'black',
			],
		},
		white: {
			checkbox: document.getElementById('whitetheme'),
			colors: [
				'#fff',
				'#eee',
				'#f4f4f4',
				'#000',
				'none',
				'rgba(0,0,0,.5)',
				'default',
			],
		},
		teal: {
			checkbox: document.getElementById('tealtheme'),
			colors: [
				'#317b71',
				'#44877e',
				'#3D837a',
				'#fff',
				'rgba(0,0,0,.5)',
				'rgba(194,67,63,.75)',
				'default',
			],
		},
		dusk: {
			checkbox: document.getElementById('dusktheme'),
			colors: [
				'#080b12',
				'#291427',
				'#291427',
				'#F4CAE0',
				'none',
				'rgba(8,11,18,.75)',
				'black',
			],
		},
	};

	const systemThemeColor = {
		dark: matchMedia('(prefers-color-scheme: dark)'),
		light: matchMedia('(prefers-color-scheme: light)'),
		none: matchMedia('(prefers-color-scheme: no-preference)'),
	};

	elementSaveSettingsInput.addEventListener('change', saveSettings);
	elementSaveTextInput.addEventListener('change', saveSettings);
	elementMaxCharsInput.addEventListener('change', saveSettings);
	systemThemeColor.dark.addEventListener('change', getTheme);
	systemThemeColor.light.addEventListener('change', getTheme);
	systemThemeColor.none.addEventListener('change', getTheme);

	for (const theme in themes) {
		themes[theme].checkbox.addEventListener('change', saveSettings);
	}

	function saveSettings() {
		setMaxChars();

		const theme = getTheme();

		if (elementSaveSettingsInput.checked) {
			set('savesettings', 1);
			set('savetext', elementSaveTextInput.checked ? 1 : 0);
			set('maxchars', elementMaxCharsInput.checked ? 1 : 0);
			set('theme', theme);
		} else {
			removeAll();
		}
	}

	function loadSettings() {
		const saveSettings = get('savesettings');

		if (saveSettings) {
			elementSaveSettingsInput.checked = saveSettings;
			elementSaveTextInput.checked = get('savetext');
			elementMaxCharsInput.checked = get('maxchars');

			setTheme(get('theme'));
		}

		setMaxChars();
		getTheme();
	}

	loadSettings();

	function getTheme() {
		for (const theme in themes) {
			if (themes[theme].checkbox.checked) {
				if (theme === 'auto') {
					if (systemThemeColor.dark.matches) {
						applyTheme(themes.black.colors);

						return 'auto';
					}

					if (systemThemeColor.light.matches) {
						applyTheme(themes.white.colors);

						return 'auto';
					}

					if (systemThemeColor.none.matches) {
						const currentHour = new Date().getHours();

						applyTheme(
							currentHour < 8 || currentHour > 20
								? themes.black.colors
								: themes.white.colors,
						);

						return 'auto';
					}

					applyTheme(themes.white.colors);

					return 'white';
				}

				applyTheme(themes[theme].colors);

				return theme;
			}
		}
	}

	// Input: bg, primary, focus, text, shadow, selection, ios
	function applyTheme(colors) {
		const color_types = [
			'--bg',
			'--primary',
			'--focus',
			'--text',
			'--shadow',
			'--selection',
		];

		for (let i = 0; i < color_types.length; i++) {
			document.documentElement.style.setProperty(color_types[i], colors[i]);
		}

		metaTagSafariIconColor.setAttribute('content', colors[0]);
		metaTagMsNavButtonColor.setAttribute('content', colors[0]);
		metaTagMsTileColor.setAttribute('content', colors[0]);
		metaTagAndroidThemeColor.setAttribute('content', colors[0]);
		metaTagAppleThemeColor.setAttribute('content', colors[6]);
	}

	function setTheme(newTheme) {
		for (const theme in themes) {
			if (newTheme == theme) {
				themes[theme].checkbox.checked = true;
				break;
			}
		}
	}

	function setMaxChars() {
		if (elementMaxCharsInput.checked) {
			elementInput.maxLength = 1000000;
		} else {
			elementInput.removeAttribute('maxlength');
		}
	}

	const throttledUpdateCounts = debounce(updateCounts);

	elementInput.addEventListener('input', throttledUpdateCounts);
	document.getElementById('settings').addEventListener('click', openSidebar);
	document
		.getElementsByClassName('container')[0]
		.addEventListener('click', closeSidebar);

	function openSidebar() {
		elementSidebar.classList.toggle('open');
		document.body.classList.toggle('freezebody');
		// deg += 180
		// icon.style.transform = 'rotate(' + deg + 'deg)'
	}

	function closeSidebar() {
		elementSidebar.classList.remove('open');
		document.body.classList.remove('freezebody');
	}

	async function updateCounts() {
		const countObj = await getCounts(elementInput.value);

		for (const key in countObj) {
			elementOutputs[key].value = countObj[key] || '-';
		}
	}

	updateCounts();
})();
