import { getExercise, getRecentExerciseEntries } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params, depends }) {
	const exercise = await getExercise(params.id);
	if (!exercise) {
		error(404);
	}
	depends(`app:exercise:${params.id}`);
	depends(`app:exercise-entries:${params.id}`);
	const entries = await getRecentExerciseEntries(params.id);
	return { entries, exercise };
}
