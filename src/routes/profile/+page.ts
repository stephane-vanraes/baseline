import { getProfile, getRecentBodyStats } from '$lib/db/index';

export async function load() {
	const [profile, bodyStats] = await Promise.all([getProfile(), getRecentBodyStats(10)]);

	console.log(bodyStats);
	return { profile, bodyStats };
}
