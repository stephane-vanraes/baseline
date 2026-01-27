import { getRecentBodyStats } from '$lib/db/index';

export async function load() {
	return { bodyStats: await getRecentBodyStats(10) };
}
