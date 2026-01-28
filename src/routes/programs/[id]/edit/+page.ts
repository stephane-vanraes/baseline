import { allExercises, getProgram } from '$lib/db';
import { getProgramExercises } from '$lib/utils/programs';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const program = await getProgram(params.id);
	if (!program) {
		error(404);
	}

	const exercises = await allExercises();
	const programExercises = getProgramExercises(program, exercises);

	return { program, exercises, programExercises };
}
