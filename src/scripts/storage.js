/**
 * Check if local storage is available. Based on a function from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API.
 */
function storageAvailable() {
	let doesStorageExist = false;
	let storage;

	try {
		storage = window.localStorage;

		const key = '__storage_test__';

		storage.setItem(key, key);
		storage.removeItem(key);

		doesStorageExist = true;
	} catch (e) {
		doesStorageExist =
			e instanceof DOMException &&
			e.name === 'QuotaExceededError' &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage &&
			storage.length !== 0;
	}

	if (!doesStorageExist) {
		console.warn('Local storage is not available.');
	}

	return doesStorageExist;
}

/**
 * Get a value from local storage. If local storage is not available, return null.
 *
 * @param {string} key - The key to get the value for.
 * @returns {string | null} The value for the key, or null if local storage is not available.
 */
export function get(key) {
	if (storageAvailable()) {
		return window.localStorage.getItem(key);
	}

	return null;
}

/**
 * Set a value in local storage. If local storage is not available, do nothing.
 *
 * @param {string} key - The key to set the value for.
 * @param {string} value - The value to set.
 */
export function set(key, value) {
	if (storageAvailable()) {
		window.localStorage.setItem(key, value);
	}
}

/**
 * Remove a value from local storage. If local storage is not available, do nothing.
 *
 * @param {string} key - The key to remove the value for.
 */
export function remove(key) {
	if (storageAvailable()) {
		window.localStorage.removeItem(key);
	}
}

/**
 * Remove all values from local storage. If local storage is not available, do nothing.
 */
export function removeAll() {
	const keys = ['savesettings', 'savetext', 'maxchars', 'theme'];

	for (const key of keys) {
		remove(key);
	}
}
