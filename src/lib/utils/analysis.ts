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
	history: {
		rpe_decrease?: number;
		rpe_increase?: number;
	};
};

const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;

function median(values: number[]) {
	if (!values.length) return undefined;
	const sorted = [...values].sort((a, b) => a - b);
	return sorted[Math.floor(sorted.length / 2)];
}

type Last3Mode = 'atOrAbove' | 'atOrBelow';

function getLast3(
	history: ExerciseEntry[],
	currentValue: number,
	mode: Last3Mode
): { entries: ExerciseEntry[]; medianRpe?: number } {
	const now = Date.now();
	const last3 = history
		.filter((item) => item.createdAt && now - item.createdAt <= ninetyDaysMs)
		.filter((item) =>
			mode === 'atOrAbove' ? item.value >= currentValue : item.value <= currentValue
		)
		.slice(0, 3);

	const medianRpe = last3.length === 3 ? median(last3.map((i) => i.rpe)) : undefined;

	return { entries: last3, medianRpe };
}

export function getSuggestedIncrease(
	exercise: Exercise,
	entry: ExerciseEntry,
	last3: ExerciseEntry[],
	medianRpe?: number
): number | undefined {
	const c = exercise.currentValue;
	const inc = exercise.increment;
	const s = entry.value;
	const r = entry.rpe;

	if (s < c) return undefined;
	if (r > 8) return undefined;

	if (s >= c + 2 * inc && r <= 7) {
		return c + inc;
	}

	if (last3.length < 3) return undefined;

	if (medianRpe !== undefined && medianRpe <= 7) {
		return c + inc;
	}

	return undefined;
}

export function getSuggestedDecrease(
	exercise: Exercise,
	entry: ExerciseEntry,
	last3: ExerciseEntry[],
	medianRpe?: number
): number | undefined {
	const c = exercise.currentValue;
	const inc = exercise.increment;
	const s = entry.value;
	const r = entry.rpe;

	console.log(c, inc, s, r);

	if (s <= c && r >= 9) {
		console.log(c - inc);
		return c - inc;
	}

	if (last3.length < 3) return undefined;

	if (medianRpe !== undefined && medianRpe >= 8) {
		return c - inc;
	}

	return undefined;
}

export async function analyse(entry: ExerciseEntry): Promise<Analysis> {
	const [exercise, _previous] = await Promise.all([
		getExercise(entry.exerciseId),
		getRecentExerciseEntries(entry.exerciseId, 10)
	]);

	if (!exercise) {
		throw 'Exercise Not Found';
	}

	const previous = _previous.filter((e) => e.id !== entry.id);

	const { entries: last3Increase, medianRpe: medianRpeIncrease } = getLast3(
		previous,
		exercise.currentValue,
		'atOrAbove'
	);
	const { entries: last3Decrease, medianRpe: medianRpeDecrease } = getLast3(
		previous,
		exercise.currentValue,
		'atOrBelow'
	);
	const suggestIncrease = getSuggestedIncrease(exercise, entry, last3Increase, medianRpeIncrease);
	const suggestDecrease = getSuggestedDecrease(exercise, entry, last3Decrease, medianRpeDecrease);

	return {
		exercise,
		entry,
		history: {
			rpe_decrease: medianRpeDecrease,
			rpe_increase: medianRpeIncrease
		},
		suggestions: {
			none: !suggestDecrease && !suggestIncrease,
			increase: suggestIncrease,
			decrease: suggestDecrease
		}
	};
}
