export type ToastItem = {
	body: string;
	id: string;
	title: string;
	type: 'success' | 'warning' | 'error';
};

export const toastList = $state<ToastItem[]>([]);

export const addToast = (item: Omit<ToastItem, 'id'>) => {
	toastList.push({
		...item,
		id: crypto.randomUUID()
	});
};
