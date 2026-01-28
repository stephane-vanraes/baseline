import type * as DB from './types';
import { db } from './client';
import { withCreatedAt } from './helpers';
import type { Inserter } from './helpers';

export async function addBodyStatEntry(entry: Inserter<DB.BodyStatsEntry>) {
	await db.bodystats.add(withCreatedAt<DB.BodyStatsEntry>(entry));
}

export async function getRecentBodyStats(limit = 10) {
	return db.bodystats.orderBy('createdAt').reverse().limit(limit).toArray();
}
