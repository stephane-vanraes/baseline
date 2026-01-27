import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export async function load({ route, parent }) {
	const data = await parent();

	if (!data?.profile && route.id == '/profile') {
		redirect(302, resolve('/profile/edit'));
	}

	return {};
}
