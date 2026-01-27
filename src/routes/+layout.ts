import { resolve } from '$app/paths';
import { getProfile } from '$lib/db';
import type { Profile } from '$lib/db/types.js';
import { redirect } from '@sveltejs/kit';

export const ssr = false;

export async function load({ route }) {
	const profile = await getProfile();

	if (!profile && route.id !== '/profile/edit') {
		redirect(302, resolve('/profile/edit'));
	}

	return {
		profile: profile as Profile
	};
}
