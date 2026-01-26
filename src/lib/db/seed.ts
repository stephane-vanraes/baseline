import { addBodyStatEntry } from './bodystats';
import { addExercise } from './exercises';
import { addProgram } from './programs';

export default async function () {
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
		})
	]);

	await Promise.all([
		addBodyStatEntry({ waist: 105, weight: 95 }),
		addBodyStatEntry({ waist: 104, weight: 93 }),
		addBodyStatEntry({ waist: 103, weight: 91 }),
		addBodyStatEntry({ waist: 102, weight: 87 }),
		addBodyStatEntry({ waist: 101, weight: 85 })
	]);

	await addProgram({
		name: 'Default Program',
		exerciseIds: [ex1!, ex2!, ex3!]
	});
}
