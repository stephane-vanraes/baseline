import type { ExerciseType } from '$lib/db/types';

export function formatExercise(value: number, type: ExerciseType) {
	const suffix = {
		weight: 'kg',
		time: 's',
		distance: 'm'
	}[type];

	return `${value} ${suffix}`;
}
