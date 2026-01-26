import type { Dexie } from 'dexie';

export function applySchema(db: Dexie) {
	db.version(1).stores({
		exercises: 'id',
		exerciseEntries: 'id, exerciseId, createdAt, [exerciseId+createdAt]',
		programs: 'id',
		bodystats: 'id, createdAt',
		profile: 'id'
	});
}
