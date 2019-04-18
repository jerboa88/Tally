;(function(){
	let input = document.getElementById('input'),
			sidebar = document.getElementsByClassName('sidebar')[0],
			icon = document.getElementsByClassName('fa-gear')[0],
			savesettingsinput = document.getElementById('savesettings'),
			savetextinput = document.getElementById('savetext'),
			maxcharsinput = document.getElementById('maxchars'),
			blacktheme = document.getElementById('blacktheme'),
			whitetheme = document.getElementById('whitetheme'),
			tealtheme = document.getElementById('tealtheme'),
			dusktheme = document.getElementById('dusktheme'),
			deg = 0,
			timesused = 0


	savesettingsinput.addEventListener('change', savesettings)
	savetextinput.addEventListener('change', savesettings)
	maxcharsinput.addEventListener('change', savesettings)
	whitetheme.addEventListener('change', savesettings)
	blacktheme.addEventListener('change', savesettings)
	tealtheme.addEventListener('change', savesettings)
	dusktheme.addEventListener('change', savesettings)


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
		d.setTime(d.getTime() + 3600000)
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
		let cookies = document.cookie.split(';')

		for (let i = 0; i < cookies.length; i++) {
			document.cookie = cookies[i].split('=')[0] + '=;expires=Tue, 01 Jan 2019 00:00:00 UTC'
		}
	}


	function gettheme() {
		let root = document.documentElement.style

		if (blacktheme.checked) {
			root.setProperty('--bg', '#151515')
			root.setProperty('--primary', '#222')
			root.setProperty('--focus', '#202020')
			root.setProperty('--text', '#fff')
			root.setProperty('--shadow', 'rgba(0,0,0,.5)')
			root.setProperty('--selection', 'rgba(255,255,255,.5)')

			return 'black'
		}

		else if (whitetheme.checked) {
			root.setProperty('--bg', '#fff')
			root.setProperty('--primary', '#eee')
			root.setProperty('--focus', '#f4f4f4')
			root.setProperty('--text', '#000')
			root.setProperty('--shadow', 'none')
			root.setProperty('--selection', 'rgba(0,0,0,.5)')

			return 'white'
		}

		else if (tealtheme.checked) {
			root.setProperty('--bg', '#317b71')
			root.setProperty('--primary', '#44877e')
			root.setProperty('--focus', '#3D837a')
			root.setProperty('--text', '#fff')
			root.setProperty('--shadow', 'rgba(0,0,0,.5)')
			root.setProperty('--selection', 'rgba(194,67,63,.75)')

			return 'teal'
		}

		else if (dusktheme.checked) {
			root.setProperty('--bg', '#080b12')
			root.setProperty('--primary', '#291427')
			root.setProperty('--focus', '#291427')
			root.setProperty('--text', '#F4CAE0')
			root.setProperty('--shadow', 'none')
			root.setProperty('--selection', 'rgba(8,11,18,.75)')

			return 'dusk'
		}
	}


	function settheme(theme) {
		if (theme == 'black') {
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
		deg += 180
		icon.style.transform = 'rotate(' + deg + 'deg)'
	}


	function closesidebar() {
		sidebar.classList.remove('open')
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
