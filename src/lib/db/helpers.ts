import type * as DB from './types';

export type Inserter<T extends DB.Base> = Omit<T, 'id' | 'updatedAt'>;
export type ExerciseUpdater = { name?: string; currentValue?: number; deletedAt?: number };
export type ProgramUpdater = { name?: string; description?: string; exerciseIds?: string[] };

export const now = () => Date.now();

export const withCreatedAt = <T extends DB.Base>(
	data: Omit<T, 'id' | 'createdAt' | 'updatedAt'> &
		Partial<Pick<T, 'id' | 'createdAt' | 'updatedAt'>>
) => ({
	...data,
	id: data.id ?? crypto.randomUUID(),
	createdAt: data.createdAt ?? now(),
	updatedAt: data.updatedAt ?? now()
});

export const withUpdatedAt = <T extends object>(data: T) => ({
	...data,
	updatedAt: now()
});
