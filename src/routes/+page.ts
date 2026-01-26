import {
	getOnboarding,
	allPrograms,
	allExercises,
	getRecentExerciseEntriesAll,
	getRecentBodyStats
} from '$lib/db';
import { isCurrentDay } from '$lib/utils/date';

export async function load() {
	const [latestEntry] = await getRecentExerciseEntriesAll(1);
	const hasExerciseToday = latestEntry ? isCurrentDay(latestEntry.createdAt) : false;
	const [latestBodyStat] = await getRecentBodyStats(1);
	const hasMeasurementsToday = latestBodyStat ? isCurrentDay(latestBodyStat.createdAt) : false;

	return {
		onboarding: await getOnboarding(),
		programs: await allPrograms(),
		exercises: await allExercises(),
		hasExerciseToday,
		hasMeasurementsToday
	};
}
