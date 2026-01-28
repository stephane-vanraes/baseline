import { error } from '@sveltejs/kit';
import { allExercises, getProgram } from '$lib/db';
import { getProgramExercises } from '$lib/utils/programs';

export async function load({ params }) {
	const program = await getProgram(params.id);
	if (!program) {
		error(404);
	}
	const exercises = await allExercises(true);
	const programExercises = getProgramExercises(program, exercises);
	return { program, programExercises };
}
