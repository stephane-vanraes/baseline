export interface Base {
	id: string;
	createdAt?: string;
	updatedAt?: string;
}

export type ExerciseType = 'weight' | 'time' | 'distance';

export interface Exercise extends Base {
	name: string;
	type: ExerciseType;
	initialValue: number;
	currentValue: number;
}

export interface ExerciseEntry extends Base {
	exerciseId: string;
	value: number;
	rpe: number;
}

export interface Program extends Base {
	name: string;
	exerciseIds: string[];
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
