import type { ToastItem } from './toastList.svelte';
import { addToast } from './toastList.svelte';

type ToastPayload = Omit<ToastItem, 'id'>;

export const toastMessages = {
	exerciseAdded: {
		title: 'Exercise added',
		body: 'Your new exercise is ready to use.',
		type: 'success'
	},
	exerciseUpdated: {
		title: 'Exercise updated',
		body: 'Your changes have been saved.',
		type: 'success'
	},
	exerciseDeleted: {
		title: 'Exercise deleted',
		body: 'This exercise was moved to the archive.',
		type: 'warning'
	},
	programCreated: {
		title: 'Program created',
		body: 'Your new program is ready to use.',
		type: 'success'
	},
	programUpdated: {
		title: 'Program updated',
		body: 'Your changes have been saved.',
		type: 'success'
	},
	programDeleted: {
		title: 'Program deleted',
		body: 'This program was moved to the archive.',
		type: 'warning'
	},
	profileCreated: {
		title: 'Profile created',
		body: 'Your profile is ready to use.',
		type: 'success'
	},
	profileUpdated: {
		title: 'Profile updated',
		body: 'Your changes have been saved.',
		type: 'success'
	},
	measurementsAdded: {
		title: 'Measurements added',
		body: 'Your daily measurements have been logged.',
		type: 'success'
	},
	sessionCompleted: {
		title: 'Session completed',
		body: 'Nice work — your session has been saved.',
		type: 'success'
	},
	exportReady: {
		title: 'Export ready',
		body: 'Your data export has downloaded.',
		type: 'success'
	},
	importComplete: {
		title: 'Import complete',
		body: 'Your data has been restored.',
		type: 'success'
	},
	exerciseValueUpdated: {
		title: 'Current value updated',
		body: 'Your exercise value has been saved.',
		type: 'success'
	},
	exerciseValueSetLatest: {
		title: 'Current value updated',
		body: 'Switched to the latest entry value.',
		type: 'success'
	},
	analysisValueUpdated: {
		title: 'Value updated',
		body: 'Current value adjusted based on your session.',
		type: 'success'
	}
} as const satisfies Record<string, ToastPayload>;

export type ToastKey = keyof typeof toastMessages;

export const showToast = (key: ToastKey, overrides?: Partial<ToastPayload>) => {
	addToast({
		...toastMessages[key],
		...overrides
	});
};
