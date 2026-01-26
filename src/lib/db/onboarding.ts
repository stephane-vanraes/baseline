import type * as DB from './types';
import { db } from './client';

export async function getOnboarding(): Promise<DB.Onboarding> {
	const [hasExercises, hasPrograms, hasProfile] = await Promise.all([
		db.exercises.count().then((res) => res > 0),
		db.programs.count().then((res) => res > 0),
		db.profile.count().then((res) => res > 0)
	]);

	return {
		hasExercises,
		hasProfile,
		hasPrograms,
		required: !hasExercises || !hasProfile || !hasPrograms
	};
}
