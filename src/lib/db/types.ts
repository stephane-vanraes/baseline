export interface Base {
	id: string;
	createdAt?: number;
	deletedAt?: number;
	updatedAt?: number;
}

export type ExerciseType = 'weight' | 'time' | 'distance';

export interface Exercise extends Base {
	currentValue: number;
	description?: string;
	increment: number;
	initialValue: number;
	link?: string;
	name: string;
	type: ExerciseType;
}

export interface ExerciseEntry extends Base {
	exerciseId: string;
	value: number;
	rpe: number;
}

export interface Program extends Base {
	name: string;
	exerciseIds: string[];
	description?: string;
}

export interface Profile extends Base {
	name: string;
	height: number;
	dob: string;
	sex: 'male' | 'female';
	initialWeight: number;
	initialWaist: number;
	currentWeight: number;
	currentWaist: number;
}

export interface BodyStatsEntry extends Base {
	weight: number;
	waist: number;
}

export type Onboarding = {
	hasExercises: boolean;
	hasProfile: boolean;
	hasPrograms: boolean;
	required: boolean;
};
