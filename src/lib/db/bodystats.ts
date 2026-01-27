import type * as DB from './types';
import { db } from './client';
import type { Inserter } from './helpers';

export async function addBodyStatEntry(entry: Inserter<DB.BodyStatsEntry>) {
	await db.bodystats.add({
		id: crypto.randomUUID(),
		createdAt: Date.now(),
		updatedAt: Date.now(),
		...entry
	});
}

export async function getRecentBodyStats(limit = 10) {
	return db.bodystats.orderBy('createdAt').reverse().limit(limit).toArray();
}
