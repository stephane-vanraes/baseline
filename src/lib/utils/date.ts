export function formatDateYMD(value?: string) {
	if (!value) return '';
	let date = new Date(Number(value));
	if (Number.isNaN(date.getTime())) {
		date = new Date(value);
	}
	if (Number.isNaN(date.getTime())) return value;
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}.${month}.${day}`;
}

export function isCurrentDay(value?: string) {
	if (!value) return false;
	let date = new Date(Number(value));
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
