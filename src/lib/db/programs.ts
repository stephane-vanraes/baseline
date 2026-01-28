import type * as DB from './types';
import { db } from './client';
import type { Inserter, ProgramUpdater } from './helpers';
import { getExercise } from './exercises';

export function allPrograms() {
	return db.programs?.filter((program) => !program.deletedAt).toArray() ?? [];
}

export function getProgram(id: string) {
	return db.programs.where('id').equals(id).first();
}

export async function getExercisesForProgram(id: string) {
	const program = await getProgram(id);
	if (!program) return [];
	const exercises = await Promise.all(program.exerciseIds.map(getExercise));

	return exercises.filter(Boolean) as DB.Exercise[];
}

export function addProgram(program: Inserter<DB.Program>) {
	return db.programs.add({
		...program,
		id: crypto.randomUUID(),
		createdAt: Date.now(),
		updatedAt: Date.now()
	});
}

export function updateProgram(id: string, program: ProgramUpdater) {
	return db.programs
		.update(id, {
			...program,
			updatedAt: Date.now()
		})
		.then(Boolean);
}
