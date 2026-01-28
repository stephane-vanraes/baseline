<script lang="ts">
	import { addExercise } from '$lib/db';
	import type { ExerciseType } from '$lib/db/types';
	import { addToast } from '$lib/components/Toast/toastList.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ExerciseForm from '../ExerciseForm.svelte';

	async function handleSubmit(values: {
		name: string;
		description: string;
		link: string;
		type: ExerciseType;
		initialValue: number;
		increment: number;
	}) {
		const { name, description, link, type, initialValue, increment } = values;

		const id = await addExercise({
			name,
			description,
			link,
			type,
			initialValue,
			currentValue: initialValue,
			increment
		});

		addToast({
			title: 'Exercise added',
			body: 'Your new exercise is ready to use.',
			type: 'success'
		});
		await goto(resolve('/exercises/[id]', { id }));
	}
</script>

<ExerciseForm
	title="New exercise"
	submitLabel="Create exercise"
	cancelHref={resolve('/exercises')}
	onSubmit={handleSubmit}
/>
