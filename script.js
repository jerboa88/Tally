;(function(){
	let input = document.getElementById('input'),
			sidebar = document.getElementsByClassName('sidebar')[0],
			// icon = document.getElementsByClassName('fa-gear')[0],
			savesettingsinput = document.getElementById('savesettings'),
			savetextinput = document.getElementById('savetext'),
			maxcharsinput = document.getElementById('maxchars'),
			// deg = 0,
			timesused = 0,

			safariicon = document.querySelector('link[rel=mask-icon]'),
			msnavbutton = document.querySelector('meta[name=msapplication-navbutton-color]'),
			mstile = document.querySelector('meta[name=msapplication-TileColor]'),
			androidtheme = document.querySelector('meta[name=theme-color]'),
			appletheme = document.querySelector('meta[name=apple-mobile-web-app-status-bar-style]'),

			themes = {
				auto: {
					checkbox: document.getElementById('autotheme')
				},
				black: {
					checkbox: document.getElementById('blacktheme'),
					colors: ['#151515', '#222', '#202020', '#fff', 'rgba(0,0,0,.5)', 'rgba(255,255,255,.5)', 'black']
				},
				white: {
					checkbox: document.getElementById('whitetheme'),
					colors: ['#fff', '#eee', '#f4f4f4', '#000', 'none', 'rgba(0,0,0,.5)', 'default']
				},
				teal: {
					checkbox: document.getElementById('tealtheme'),
					colors: ['#317b71', '#44877e', '#3D837a', '#fff', 'rgba(0,0,0,.5)', 'rgba(194,67,63,.75)', 'default']
				},
				dusk: {
					checkbox: document.getElementById('dusktheme'),
					colors: ['#080b12', '#291427', '#291427', '#F4CAE0', 'none', 'rgba(8,11,18,.75)', 'black']
				}
			}

	const system_color = {
		dark: matchMedia('(prefers-color-scheme: dark)'),
		light: matchMedia('(prefers-color-scheme: light)'),
		none: matchMedia('(prefers-color-scheme: no-preference)')
	}


	savesettingsinput.addEventListener('change', SaveSettings)
	savetextinput.addEventListener('change', SaveSettings)
	maxcharsinput.addEventListener('change', SaveSettings)
	system_color.dark.addEventListener('change', GetTheme)
	system_color.light.addEventListener('change', GetTheme)
	system_color.none.addEventListener('change', GetTheme)

	for (let i in themes) {
		themes[i].checkbox.addEventListener('change', SaveSettings)
	}


	function SaveSettings() {
		SetMaxChars()
		theme = GetTheme()

		if (savesettingsinput.checked) {
			SetCookie('savesettings', 1)
			SetCookie('savetext', savetextinput.checked ? 1 : 0)
			SetCookie('maxchars', maxcharsinput.checked ? 1 : 0)
			SetCookie('theme', theme)
		}

		else {
			ClearCookies()
		}
	}


	function LoadSettings() {
		savesettings = GetCookie('savesettings')

		if (savesettings) {
			savesettingsinput.checked = savesettings
			savetextinput.checked = GetCookie('savetext')
			maxcharsinput.checked = GetCookie('maxchars')
			SetTheme(GetCookie('theme'))
		}

		SetMaxChars()
		GetTheme()
	}

	LoadSettings()


	function SetCookie(name, value) {
		let d = new Date()
		d.setTime(d.getTime() + 5184000) // 60 days
		document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/'
	}


	function GetCookie(name) {
		let patt = new RegExp(name + '=(\\w+)\;?')

		if (document.cookie) {
			let result = patt.exec(document.cookie),
					newresult = false

			if (result) {
				newresult = (result[1] == '1') ? true : (result[1] == '0') ? false : result[1]
			}

			return newresult
		}
	}


	function ClearCookies() {
		let keys = ['savesettings', 'savetext', 'maxchars', 'theme']

		for (let i = 0; i < keys.length; i++) {
			document.cookie = keys[i] + '=;expires=Tue, 01 Jan 2019 00:00:00 UTC'
		}
	}


	function GetTheme() {
		for (i in themes) {
			if (themes[i].checkbox.checked) {
				if (i == 'auto') {
					if (system_color.dark.matches) {
						ApplyTheme(themes.black.colors)

						return 'auto'
					}

					else if (system_color.light.matches) {
						ApplyTheme(themes.white.colors)

						return 'auto'
					}

					else if (system_color.none.matches) {
						const date = new Date(),
									hour = d.getHours()

						ApplyTheme((hour < 8 || hour > 20) ? themes.black.colors : themes.white.colors)

						return 'auto'
					}

					else {
						ApplyTheme(themes.white.colors)

						return 'white'
					}
				}

				else {
					ApplyTheme(themes[i].colors)

					return i
				}
			}
		}
	}


	// Input: bg, primary, focus, text, shadow, selection, ios
	function ApplyTheme(colors) {
		let color_types = ['--bg', '--primary', '--focus', '--text', '--shadow', '--selection']

		for (let i = 0; i < color_types.length; i++) {
			document.documentElement.style.setProperty(color_types[i], colors[i])
		}

		safariicon.setAttribute('content', colors[0])
		msnavbutton.setAttribute('content', colors[0])
		mstile.setAttribute('content', colors[0])
		androidtheme.setAttribute('content', colors[0])
		appletheme.setAttribute('content', colors[6])
	}


	function SetTheme(theme) {
		for (i in themes) {
			if (theme == i) {
				themes[i].checkbox.checked = true
				break
			}
		}
	}


	function SetMaxChars() {
		(maxcharsinput.checked) ? input.removeAttribute('maxlength') : input.maxLength = 1000000
	}



	input.addEventListener('input', Count)
	document.getElementById('settings').addEventListener('click', OpenSidebar)
	document.getElementsByClassName('container')[0].addEventListener('click', CloseSidebar)


	function OpenSidebar() {
		sidebar.classList.toggle('open')
		document.body.classList.toggle('freezebody')
		// deg += 180
		// icon.style.transform = 'rotate(' + deg + 'deg)'
	}


	function CloseSidebar() {
		sidebar.classList.remove('open')
		document.body.classList.remove('freezebody')
	}


	function Count() {
		const text = input.value,
					len = text.length

		let	wordflag = false,
				sentflag = false,
				paraflag = false
				count = {
					characters: 0,
					words: 0,
					sentences: 0,
					paragraphs: 0,
					spaces: 0,
					letters: 0,
					digits: 0,
					specialcharacters: 0
				}

		for (let i = 0; i < len; i++) {
			current = text[i]
			count.characters++

			if (/\d/.test(current)) {
				wordflag = true
				sentflag = true
				paraflag = true
				count.digits++
			}

			else if (/\w/.test(current)) {
				wordflag = true
				sentflag = true
				paraflag = true
				count.letters++
			}

			else {
				if (/ /.test(current)) {
					count.spaces++

					if (wordflag) {
						wordflag = false
						count.words++
					}
				}
				else if (/[\.\?\!]/.test(current)) {
					if (wordflag) {
						wordflag = false
						count.words++
					}

					if (sentflag) {
						sentflag = false
						count.sentences++
					}
				}
				else if (/\n/.test(current)) {
					if (wordflag) {
						wordflag = false
						count.words++
					}

					if (sentflag) {
						sentflag = false
						count.sentences++
					}

					if (paraflag) {
						paraflag = false
						count.paragraphs++
					}
				}
				else {
					count.specialcharacters++
				}
			}
		}

		if (wordflag) {
			count.words++
		}

		if (sentflag) {
			count.sentences++
		}

		if (paraflag) {
			count.paragraphs++
		}

		for (let key in count) {
			document.getElementById(key).innerHTML = count[key] || '-'
		}

		if (timesused == 1) {
			gtag_report_conversion()
		}

		timesused++
	}

	Count()
})();
