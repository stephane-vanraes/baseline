import { getExercise, getRecentExerciseEntries } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const exercise = await getExercise(params.id);
	if (!exercise) {
		error(404);
	}
	const entries = await getRecentExerciseEntries(params.id);
	return { entries, exercise };
}
