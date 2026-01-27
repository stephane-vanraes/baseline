import { db } from './client';
import type * as DB from './types';
import seed from './seed';

export type DatabaseExport = {
	version: number;
	exportedAt: number;
	data: {
		exercises: DB.Exercise[];
		exerciseEntries: DB.ExerciseEntry[];
		programs: DB.Program[];
		bodystats: DB.BodyStatsEntry[];
		profile: DB.Profile[];
	};
};

export async function clearDatabase() {
	await Promise.all([
		db.exercises.clear(),
		db.exerciseEntries.clear(),
		db.programs.clear(),
		db.bodystats.clear(),
		db.profile.clear()
	]);
}

export async function seedDatabase() {
	return seed();
}

export async function exportDatabase() {
	const [exercises, exerciseEntries, programs, bodystats, profile] = await Promise.all([
		db.exercises.toArray(),
		db.exerciseEntries.toArray(),
		db.programs.toArray(),
		db.bodystats.toArray(),
		db.profile.toArray()
	]);

	return {
		version: 1,
		exportedAt: Date.now(),
		data: { exercises, exerciseEntries, programs, bodystats, profile }
	};
}

export async function importDatabase(payload: DatabaseExport) {
	if (!payload?.data) {
		throw new Error('Invalid import payload');
	}

	await db.transaction(
		'rw',
		db.exercises,
		db.exerciseEntries,
		db.programs,
		db.bodystats,
		db.profile,
		async () => {
			await clearDatabase();
			await Promise.all([
				db.exercises.bulkAdd(payload.data.exercises ?? []),
				db.exerciseEntries.bulkAdd(payload.data.exerciseEntries ?? []),
				db.programs.bulkAdd(payload.data.programs ?? []),
				db.bodystats.bulkAdd(payload.data.bodystats ?? []),
				db.profile.bulkAdd(payload.data.profile ?? [])
			]);
		}
	);
}
