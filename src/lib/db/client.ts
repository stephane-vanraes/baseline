import { Dexie, type EntityTable } from 'dexie';
import * as DB from './types';
import { applySchema } from './schema';

const DATABASE = 'db:baseline';

export const db = new Dexie(DATABASE) as Dexie & {
	exercises: EntityTable<DB.Exercise, 'id'>;
	exerciseEntries: EntityTable<DB.ExerciseEntry, 'id'>;
	programs: EntityTable<DB.Program, 'id'>;
	bodystats: EntityTable<DB.BodyStatsEntry, 'id'>;
	profile: EntityTable<DB.Profile, 'id'>;
};

applySchema(db);
