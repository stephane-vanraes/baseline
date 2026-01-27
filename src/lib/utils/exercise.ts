import type { ExerciseType } from '$lib/db/types';

export function formatExercise(value: number, type: ExerciseType) {
	const suffix = getSuffix(type);
	return `${value} ${suffix}`;
}

export function getSuffix(type: ExerciseType) {
	return {
		weight: 'kg',
		time: 's',
		distance: 'm'
	}[type];
}
