import type * as DB from './types';
import { db } from './client';
import type { Inserter } from './helpers';

export function allPrograms() {
	return db.programs?.toArray() ?? [];
}

export function getProgram(id: string) {
	return db.programs.where('id').equals(id).first();
}

export function addProgram(program: Inserter<DB.Program>) {
	return db.programs.add({
		...program,
		id: crypto.randomUUID(),
		createdAt: Date.now().toString(),
		updatedAt: Date.now().toString()
	});
}
