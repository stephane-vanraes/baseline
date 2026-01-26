import { allPrograms } from '$lib/db/index';

export async function load() {
	const programs = await allPrograms();
	return { programs };
}
