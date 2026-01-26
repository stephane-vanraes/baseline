import type { Exercise, Program } from '$lib/db/types';

export function getProgramExercises(program: Program, exercises: Exercise[]) {
	return (program.exerciseIds ?? [])
		.map((id) => exercises.find((exercise) => exercise.id === id))
		.filter((exercise): exercise is Exercise => Boolean(exercise));
}
