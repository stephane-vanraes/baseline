import { allExercises } from '$lib/db/index';

export async function load() {
	const exercises = await allExercises();
	return { exercises };
}
