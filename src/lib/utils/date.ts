export function formatDateYMD(value?: string | number) {
	if (!value) return '';
	const numericValue = typeof value === 'number' ? value : Number(value);
	let date = new Date(numericValue);
	if (Number.isNaN(date.getTime())) {
		date = new Date(value);
	}
	if (Number.isNaN(date.getTime())) return value;
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}.${month}.${day}`;
}

export function isCurrentDay(value?: string | number) {
	if (!value) return false;
	const numericValue = typeof value === 'number' ? value : Number(value);
	let date = new Date(numericValue);
	if (Number.isNaN(date.getTime())) {
		date = new Date(value);
	}
	if (Number.isNaN(date.getTime())) return false;
	const now = new Date();
	return (
		date.getFullYear() === now.getFullYear() &&
		date.getMonth() === now.getMonth() &&
		date.getDate() === now.getDate()
	);
}

export function isCurrentWeek(value?: string | number) {
	if (!value) return false;
	const numericValue = typeof value === 'number' ? value : Number(value);
	let date = new Date(numericValue);
	if (Number.isNaN(date.getTime())) {
		date = new Date(value);
	}
	if (Number.isNaN(date.getTime())) return false;

	const now = new Date();
	const startOfWeek = new Date(now);
	startOfWeek.setHours(0, 0, 0, 0);
	const dayIndex = startOfWeek.getDay(); // 0 = Sunday
	const daysSinceMonday = (dayIndex + 6) % 7;
	startOfWeek.setDate(startOfWeek.getDate() - daysSinceMonday);

	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(endOfWeek.getDate() + 7);

	return date >= startOfWeek && date < endOfWeek;
}
