import type { ExerciseType } from '$lib/db/types';

export const EXERCISE_TYPE_OPTIONS: { value: ExerciseType; label: string }[] = [
	{ value: 'weight', label: 'Weight' },
	{ value: 'time', label: 'Time' },
	{ value: 'distance', label: 'Distance' }
];
