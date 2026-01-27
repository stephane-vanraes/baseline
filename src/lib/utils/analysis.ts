import { getExercise, getRecentExerciseEntries } from '$lib/db';
import type { ExerciseEntry, ExerciseType } from '$lib/db/types';

export type Analysis = {
	name: string;
	suggestIncrease: boolean;
	suggestDecrease: boolean;
	noSuggestions: boolean;
	id: number;
	current: number;
	session: number;
	type: ExerciseType;
};

export async function analyse(entry: ExerciseEntry): Promise<Analysis> {
	const [exercise, previous] = await Promise.all([
		getExercise(entry.exerciseId),
		await getRecentExerciseEntries(entry.exerciseId)
	]);

	if (!exercise) {
		throw 'Exercise Not Found';
	}
	previous.shift();

	const countSub7 = previous.filter((e) => e.rpe <= 7).length;

	const suggestIncrease = entry.value >= exercise.currentValue && entry.rpe <= 8 && countSub7 >= 2;

	const suggestDecrease = entry.rpe >= 9.5;

	console.log({
		name: exercise.name,
		previous,
		countSub7,
		suggestDecrease,
		suggestIncrease
	});

	return {
		name: exercise.name,
		suggestDecrease,
		suggestIncrease,
		noSuggestions: !suggestDecrease && !suggestIncrease,
		id: exercise.id,
		current: exercise.currentValue,
		session: entry.value,
		type: exercise.type
	};
}
