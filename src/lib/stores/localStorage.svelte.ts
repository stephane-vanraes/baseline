import { browser } from '$app/environment';

const parseStoredValue = <T>(value: string, fallback: T) => {
	try {
		return JSON.parse(value) as T;
	} catch {
		return fallback;
	}
};

export const localStorage = <T = boolean>(key: string, initialValue?: T) => {
	const initial = (initialValue ?? (false as T)) as T;
	let internal = $state(initial);

	if (browser) {
		const stored = window.localStorage.getItem(key);
		if (stored !== null) {
			internal = parseStoredValue(stored, initial);
		}
	}

	return {
		get current() {
			return internal;
		},
		set current(value: T) {
			internal = value;
			if (browser) {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		}
	};
};
