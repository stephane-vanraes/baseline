import { allExercises } from '$lib/db';

export async function load() {
	const exercises = await allExercises();
	return { exercises };
}
