import { db } from './client';
import seed from './seed';

export async function clearDatabase() {
	await Promise.all([
		db.exercises.clear(),
		db.exerciseEntries.clear(),
		db.programs.clear(),
		db.bodystats.clear()
	]);
}

export async function seedDatabase() {
	return seed();
}
