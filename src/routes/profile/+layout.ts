import { resolve } from '$app/paths';
import { getProfile } from '$lib/db/index.js';
import { redirect } from '@sveltejs/kit';

export async function load({ route }) {
	const profile = await getProfile();

	if (!profile && route.id == '/profile') {
		redirect(302, resolve('/profile/edit'));
	}
	return {
		profile
	};
}
