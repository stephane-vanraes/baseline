<script lang="ts">
	import { addProgram } from '$lib/db';
	import type { Exercise } from '$lib/db/types';
	import { goto } from '$app/navigation';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import ExerciseCard from '$lib/components/ExerciseCard.svelte';
	import { resolve } from '$app/paths';

	let { data } = $props();

	const available = $derived(
		(data.exercises ?? []).filter(
			(exercise) => !selected.some((picked) => picked.id === exercise.id)
		)
	);
	let selected = $state<Exercise[]>([]);

	function addExercise(exercise: Exercise) {
		selected = [...selected, exercise];
	}

	function removeExercise(exercise: Exercise) {
		selected = selected.filter((item) => item.id !== exercise.id);
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (selected.length === 0) return;
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const name = String(data.get('name') ?? '').trim();
		if (!name) return;

		const exerciseIds = selected.map((exercise) => exercise.id).filter(Boolean) as string[];
		if (exerciseIds.length === 0) return;

		const id = await addProgram({ name, exerciseIds });
		await goto(resolve('/programs/[id]', { id }));
	}
</script>

<h1>New program</h1>
<form onsubmit={handleSubmit}>
	<TextInput label="Name" name="name" />
	<h2>Selected exercises ({selected.length})</h2>
	<ul>
		{#each selected as exercise (exercise.id)}
			<li>
				<button type="button" class="unstyled" onclick={() => removeExercise(exercise)}>
					<ExerciseCard {...exercise} />
				</button>
			</li>
		{:else}
			<p>No exercises selected yet.</p>
		{/each}
	</ul>
	<h2>Available exercises</h2>
	<ul>
		{#each available as exercise (exercise.id)}
			<li>
				<button type="button" class="unstyled" onclick={() => addExercise(exercise)}>
					<ExerciseCard {...exercise} />
				</button>
			</li>
		{:else}
			<p>No exercises left.</p>
		{/each}
	</ul>
	<hr />
	<div class="buttons">
		<button class="button" type="submit">Create program</button>
		<a href={resolve('/programs')} class="button danger">Cancel</a>
	</div>
</form>

<style>
	form {
		display: grid;
		gap: 1rem;
	}

	p {
		margin: 0;
		opacity: 0.7;
	}
</style>
