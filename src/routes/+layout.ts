import { resolve } from '$app/paths';
import { getProfile } from '$lib/db';
import type { Profile } from '$lib/db/types.js';
import { redirect } from '@sveltejs/kit';
import type { LayoutRouteId } from './$types.js';

export const ssr = false;

export async function load({ route }) {
	const profile = await getProfile();
	const noProfileRoutes: LayoutRouteId[] = ['/profile/edit', '/settings'];

	if (!profile && !noProfileRoutes.includes(route.id ?? '/')) {
		redirect(302, resolve('/profile/edit'));
	}

	return {
		profile: profile as Profile
	};
}
