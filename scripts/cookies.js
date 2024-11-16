export function setCookie(name, value) {
	const currentDate = new Date();

	currentDate.setTime(currentDate.getTime() + 5184000); // 60 days

	document.cookie = `${name}=${value};expires=${currentDate.toUTCString()};path=/`;
}

export function getCookie(name) {
	const pattern = new RegExp(`${name}=(\\w+);?`);

	if (document.cookie) {
		const result = pattern.exec(document.cookie);

		let newResult = false;

		if (result) {
			if (result[1] === "1") {
				newResult = true;
			} else if (result[1] === "0") {
				newResult = false;
			} else {
				newResult = result[1];
			}
		}

		return newResult;
	}
}

export function clearCookies() {
	const keys = ["savesettings", "savetext", "maxchars", "theme"];

	for (let i = 0; i < keys.length; i++) {
		document.cookie = `${keys[i]}=;expires=Tue, 01 Jan 2024 00:00:00 UTC`;
	}
}
