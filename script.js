;(function(){
	let input = document.getElementById('input'),
			sidebar = document.getElementsByClassName('sidebar')[0],
			icon = document.getElementsByClassName('fa-gear')[0],
			savesettingsinput = document.getElementById('savesettings'),
			savetextinput = document.getElementById('savetext'),
			maxcharsinput = document.getElementById('maxchars'),
			autotheme = document.getElementById('autotheme'),
			blacktheme = document.getElementById('blacktheme'),
			whitetheme = document.getElementById('whitetheme'),
			tealtheme = document.getElementById('tealtheme'),
			dusktheme = document.getElementById('dusktheme'),
			deg = 0,
			timesused = 0

	const systemdarkscheme = matchMedia('(prefers-color-scheme: dark)'),
				systemlightscheme = matchMedia('(prefers-color-scheme: light)'),
				systemnundefinedscheme = matchMedia('(prefers-color-scheme: no-preference)')


	savesettingsinput.addEventListener('change', savesettings)
	savetextinput.addEventListener('change', savesettings)
	maxcharsinput.addEventListener('change', savesettings)

	autotheme.addEventListener('change', savesettings)
	whitetheme.addEventListener('change', savesettings)
	blacktheme.addEventListener('change', savesettings)
	tealtheme.addEventListener('change', savesettings)
	dusktheme.addEventListener('change', savesettings)

	systemdarkscheme.addEventListener('change', gettheme)
	systemlightscheme.addEventListener('change', gettheme)


	function savesettings() {
		setmaxchars()
		theme = gettheme()

		if (savesettingsinput.checked) {
			setcookie('savesettings', 1)
			setcookie('savetext', savetextinput.checked ? 1 : 0)
			setcookie('maxchars', maxcharsinput.checked ? 1 : 0)
			setcookie('theme', theme)
		}

		else {
			clearcookies()
		}
	}


	function loadsettings() {
		savesettings = getcookie('savesettings')

		if (savesettings) {
			savesettingsinput.checked = savesettings
			savetextinput.checked = getcookie('savetext')
			maxcharsinput.checked = getcookie('maxchars')
			settheme(getcookie('theme'))
		}

		setmaxchars()
		gettheme()
	}

	loadsettings()


	function setcookie(name, value) {
		let d = new Date()
		d.setTime(d.getTime() + 5184000) // 60 days
		document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/'
	}


	function getcookie(name) {
		let patt = new RegExp(name + '=(\\w+)\;?')

		if (document.cookie) {
			let result = patt.exec(document.cookie),
					newresult = false

			if (result) {
				if (result[1] == '1') {
					newresult = true
				}

				else if (result[1] == '0') {
					newresult = false
				}

				else {
					newresult = result[1]
				}
			}

			return newresult
		}
	}


	function clearcookies() {
		let keys = ['savesettings', 'savetext', 'maxchars', 'theme']

		for (let i = 0; i < keys.length; i++) {
			document.cookie = keys[i] + '=;expires=Tue, 01 Jan 2019 00:00:00 UTC'
		}
	}


	function applyblacktheme() {
		applytheme('#151515', '#222', '#202020', '#fff', 'rgba(0,0,0,.5)', 'rgba(255,255,255,.5)', 'black')
	}

	function applywhitetheme() {
		applytheme('#fff', '#eee', '#f4f4f4', '#000', 'none', 'rgba(0,0,0,.5)', 'default')
	}


	function gettheme() {
		if (autotheme.checked) {
			if (systemdarkscheme.matches) {
				applyblacktheme()

				return 'auto'
			}

			else if (systemlightscheme.matches) {
				applywhitetheme()

				return 'auto'
			}

			else if (systemnundefinedscheme.matches) {
				const date = new Date(),
						hour = d.getHours()

				if (hour < 8 || hour > 20) {
					applyblacktheme()
				}

				else {
					applywhitetheme()
				}

				return 'auto'
			}

			else {
				applywhitetheme()

				return 'white'
			}
		}

		else if (blacktheme.checked) {
			applyblacktheme()

			return 'black'
		}

		else if (whitetheme.checked) {
			applywhitetheme()

			return 'white'
		}

		else if (tealtheme.checked) {
			applytheme('#317b71', '#44877e', '#3D837a', '#fff', 'rgba(0,0,0,.5)', 'rgba(194,67,63,.75)', 'default')

			return 'teal'
		}

		else if (dusktheme.checked) {
			applytheme('#080b12', '#291427', '#291427', '#F4CAE0', 'none', 'rgba(8,11,18,.75)', 'black')

			return 'dusk'
		}
	}


	function applytheme(bg, primary, focus, text, shadow, selection, ios) {
		let root = document.documentElement.style,
				safariicon = document.querySelector('link[rel=mask-icon]'),
				msnavbutton = document.querySelector('meta[name=msapplication-navbutton-color]'),
				mstile = document.querySelector('meta[name=msapplication-TileColor]'),
				androidtheme = document.querySelector('meta[name=theme-color]'),
				appletheme = document.querySelector('meta[name=apple-mobile-web-app-status-bar-style]')

		root.setProperty('--bg', bg)
		root.setProperty('--primary', primary)
		root.setProperty('--focus', focus)
		root.setProperty('--text', text)
		root.setProperty('--shadow', shadow)
		root.setProperty('--selection', selection)

		safariicon.setAttribute('content', bg)
		msnavbutton.setAttribute('content', bg)
		mstile.setAttribute('content', bg)
		androidtheme.setAttribute('content', bg)
		appletheme.setAttribute('content', ios)
	}


	function settheme(theme) {
		if (theme == 'auto') {
			autotheme.checked = true
		}

		else if (theme == 'black') {
			blacktheme.checked = true
		}

		else if (theme == 'white') {
			whitetheme.checked = true
		}

		else if (theme == 'teal') {
			tealtheme.checked = true
		}

		else if (theme == 'dusk') {
			dusktheme.checked = true
		}
	}


	function setmaxchars() {
		if (maxcharsinput.checked) {
			input.removeAttribute('maxlength')
		}

		else {
			input.maxLength = 1000000
		}
	}



	input.addEventListener('input', count)
	document.getElementById('settings').addEventListener('click', opensidebar)
	document.getElementsByClassName('container')[0].addEventListener('click', closesidebar)


	function opensidebar() {
		sidebar.classList.toggle('open')
		document.body.classList.toggle('freezebody')
		deg += 180
		icon.style.transform = 'rotate(' + deg + 'deg)'
	}


	function closesidebar() {
		sidebar.classList.remove('open')
		document.body.classList.remove('freezebody')
	}


	function count() {
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

		for (var i = 0; i < len; i++) {
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

		for (var key in count) {
			document.getElementById(key).innerHTML = count[key] || '-'
		}

		if (timesused == 1) {
			gtag_report_conversion()
		}

		timesused++
	}

	count()
})();
