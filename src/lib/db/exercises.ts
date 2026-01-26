import { Dexie } from 'dexie';
import type * as DB from './types';
import { db } from './client';
import type { ExerciseUpdater, Inserter } from './helpers';

export function allExercises() {
	return db.exercises?.toArray() ?? [];
}

export function getExercise(id: string) {
	return db.exercises.where('id').equals(id).first();
}

export function addExercise(exercise: Inserter<DB.Exercise>) {
	return db.exercises.add({
		...exercise,
		id: crypto.randomUUID(),
		createdAt: Date.now().toString(),
		updatedAt: Date.now().toString()
	});
}

export function updateExercise(id: string, exercise: ExerciseUpdater) {
	return db.exercises
		.update(id, {
			...exercise,
			updatedAt: Date.now().toString()
		})
		.then(Boolean);
}

export function getExerciseEntries(id: string) {
	return db.exerciseEntries.where('exerciseId').equals(id).toArray();
}

export function getRecentExerciseEntries(exerciseId: string, limit = 10) {
	return db.exerciseEntries
		.where('[exerciseId+createdAt]')
		.between([exerciseId, Dexie.minKey], [exerciseId, Dexie.maxKey])
		.reverse()
		.limit(limit)
		.toArray();
}

export function getRecentExerciseEntriesAll(limit = 10) {
	return db.exerciseEntries.orderBy('createdAt').reverse().limit(limit).toArray();
}

export async function addExerciseEntry(entry: Inserter<DB.ExerciseEntry>) {
	const ex = await getExercise(entry.exerciseId);
	if (!ex?.id) throw 'Exercise not found';

	if (entry.value > ex.currentValue) {
		await updateExercise(ex.id, { currentValue: entry.value });
	}

	await db.exerciseEntries.add({
		...entry,
		id: crypto.randomUUID(),
		createdAt: Date.now().toString(),
		updatedAt: Date.now().toString()
	});
}
