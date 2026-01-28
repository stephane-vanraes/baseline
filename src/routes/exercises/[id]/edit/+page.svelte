<script lang="ts">
	import { updateExercise } from '$lib/db';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ExerciseForm from '../../ExerciseForm.svelte';

	let { data } = $props();

	async function handleSubmit(values: {
		name: string;
		description: string;
		link: string;
		type: string;
		initialValue: number;
		increment: number;
		currentValue?: number;
	}) {
		if (!data.exercise?.id) return;
		const { name, description, link, type, initialValue, increment, currentValue } = values;

		await updateExercise(data.exercise.id, {
			name,
			description,
			link,
			type,
			initialValue,
			increment,
			currentValue: currentValue ?? data.exercise.currentValue
		});

		await goto(resolve('/exercises/[id]', { id: data.exercise.id }));
	}

	async function handleDelete() {
		if (!data.exercise?.id) return;
		await updateExercise(data.exercise.id, { deletedAt: Date.now() });
		await goto(resolve('/exercises'));
	}
</script>

<ExerciseForm
	title="Edit exercise"
	submitLabel="Save changes"
	cancelHref={resolve('/exercises/[id]', { id: data.exercise.id })}
	initialExercise={data.exercise}
	showCurrentValue
	onSubmit={handleSubmit}
/>

<div class="danger-zone">
	<button class="button danger" type="button" onclick={handleDelete}>Delete exercise</button>
</div>

<style>
	.danger-zone {
		margin-top: 1rem;
	}
</style>
