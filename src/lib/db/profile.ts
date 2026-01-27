import type * as DB from './types';
import { db } from './client';
import type { Inserter } from './helpers';

export function getProfile() {
	return db.profile.limit(1).first();
}

export async function updateProfile(profile: Inserter<DB.Profile>) {
	await db.profile.upsert('PROFILE', {
		...profile,
		dob: new Date(profile.dob).toString(),
		id: 'PROFILE',
		updatedAt: Date.now().toString()
	});
}
