import {
	getOnboarding,
	allPrograms,
	allExercises,
	getRecentExerciseEntriesAll,
	getRecentBodyStats
} from '$lib/db';
import { isCurrentDay, isCurrentWeek } from '$lib/utils/date';

export async function load({ depends }) {
	const [latestEntry, latestBodyStat] = await Promise.all([
		(await getRecentExerciseEntriesAll(1))[0],
		(await getRecentBodyStats(1))[0]
	]);

	depends('app:bodystats');
	depends('app:exercise-entries');

	return {
		onboarding: await getOnboarding(),
		programs: await allPrograms(),
		exercises: await allExercises(),
		hasExerciseToday: isCurrentDay(latestEntry?.createdAt),
		hasMeasurements: isCurrentWeek(latestBodyStat?.createdAt)
	};
}
