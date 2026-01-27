import { addBodyStatEntry } from './bodystats';
import { addExercise, addExerciseEntry } from './exercises';
import { updateProfile } from './profile';
import { addProgram } from './programs';

export default async function () {
	// PROFILE
	await updateProfile({
		name: 'Stephane',
		height: 172,
		dob: '1982-03-06',
		sex: 'male',
		initialWeight: 96,
		initialWaist: 107,
		currentWeight: 96,
		currentWaist: 107
	});

	await Promise.all([
		addBodyStatEntry({ waist: 107, weight: 97, createdAt: new Date('2026-01-05').getTime() }),
		addBodyStatEntry({ waist: 107, weight: 96, createdAt: new Date('2026-01-12').getTime() }),
		addBodyStatEntry({ waist: 107, weight: 95, createdAt: new Date('2026-01-19').getTime() })
	]);

	const [ex1, ex2, ex3] = await Promise.all([
		addExercise({
			name: 'Incline DB Press',
			type: 'weight',
			currentValue: 30,
			initialValue: 30
		}),
		addExercise({
			name: 'Overhead Carry (15sec)',
			type: 'weight',
			currentValue: 30,
			initialValue: 30
		}),
		addExercise({
			name: 'Zercher Carry (60sec)',
			type: 'weight',
			currentValue: 65,
			initialValue: 60
		}),
		addExercise({
			name: 'Dead Hang',
			type: 'time',
			currentValue: 10,
			initialValue: 10
		})
	]);

	await Promise.all([
		addExerciseEntry({
			exerciseId: ex1,
			value: 30,
			rpe: 7,
			createdAt: new Date('2026-01-06').getTime()
		}),
		addExerciseEntry({
			exerciseId: ex1,
			value: 35,
			rpe: 7,
			createdAt: new Date('2026-01-08').getTime()
		})
	]);

	await addProgram({
		name: 'Default Program',
		exerciseIds: [ex1!, ex2!, ex3!]
	});
}
