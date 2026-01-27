import { getExercise, getRecentExerciseEntries } from '$lib/db';
import type { Exercise, ExerciseEntry } from '$lib/db/types';

export type Analysis = {
	suggestions: {
		none: boolean;
		increase?: number;
		decrease?: number;
	};
	exercise: Exercise;
	entry: ExerciseEntry;
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
		exercise,
		entry,
		suggestions: {
			none: !suggestDecrease && !suggestIncrease,
			increase: exercise.currentValue + exercise.increment,
			decrease: exercise.currentValue
		}
	};
}
