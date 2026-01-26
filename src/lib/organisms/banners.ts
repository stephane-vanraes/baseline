import type Banner from '$lib/components/Banner.svelte';
import type { ComponentProps } from 'svelte';

type BannerType = 'profile' | 'exercise' | 'programs';

const banners: Record<BannerType, ComponentProps<typeof Banner>> = {
	profile: {
		title: 'Complete your profile',
		body: 'Add your name, date of birth, height, and baseline weight/waist to personalize the dashboard.',
		href: '/profile/edit',
		action: 'Complete Profile'
	},
	exercise: {
		title: 'No exercises yet',
		body: 'Add your first exercise to start tracking progress',
		action: 'Add exercise',
		href: '/exercises/new'
	},
	programs: {
		title: 'No programs yet',
		body: 'Create a program to start planning your training weeks.',
		action: 'Create program',
		href: '/programs/new'
	}
} as const;

export default banners;
