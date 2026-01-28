import type * as DB from './types';
import { db } from './client';
import { withUpdatedAt } from './helpers';
import type { Inserter } from './helpers';
import { addBodyStatEntry } from './bodystats';

export function getProfile() {
	return db.profile.limit(1).first();
}

export async function updateProfile(profile: Inserter<DB.Profile>) {
	await db.profile.upsert(
		'PROFILE',
		withUpdatedAt({
			...profile,
			dob: new Date(profile.dob).toString(),
			id: 'PROFILE'
		})
	);
	addBodyStatEntry({
		waist: profile.currentWaist,
		weight: profile.currentWeight
	});
}
