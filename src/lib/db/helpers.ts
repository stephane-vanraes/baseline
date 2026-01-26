import type * as DB from './types';

export type Inserter<T extends DB.Base> = Omit<T, 'id' | 'updatedAt'>;
export type ExerciseUpdater = { name?: string; currentValue?: number };
