<script lang="ts">
	import type { Exercise } from '$lib/db/types';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import TextareaInput from '$lib/components/forms/TextareaInput.svelte';
	import ExerciseCard from '$lib/components/ExerciseCard.svelte';
	import { getProgramExercises } from '$lib/utils/programs';
	import { onMount } from 'svelte';

	type ProgramFormValues = {
		name: string;
		description: string;
		exerciseIds: string[];
	};

	type ProgramFormInitial = {
		name?: string;
		description?: string;
		exerciseIds?: string[];
	};

	type Props = {
		title: string;
		submitLabel: string;
		cancelHref: string;
		exercises: Exercise[];
		initialProgram?: ProgramFormInitial;
		onSubmit: (values: ProgramFormValues) => Promise<void> | void;
	};

	let { title, submitLabel, cancelHref, exercises, initialProgram, onSubmit }: Props = $props();

	let query = $state('');
	let selected = $state<Exercise[]>([]);

	onMount(() => {
		if (!initialProgram) return;
		const selectedExercises = getProgramExercises(
			{
				id: '',
				name: initialProgram.name ?? '',
				description: initialProgram.description,
				exerciseIds: initialProgram.exerciseIds ?? []
			},
			exercises
		);
		selected = selectedExercises;
	});

	const available = $derived(
		exercises
			.filter((exercise) => !selected.some((picked) => picked.id === exercise.id))
			.filter((exercise) => exercise.name.toLowerCase().includes(query.trim().toLowerCase()))
	);

	function addExercise(exercise: Exercise) {
		selected = [...selected, exercise];
	}

	function removeExercise(exercise: Exercise) {
		selected = selected.filter((item) => item.id !== exercise.id);
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const name = String(data.get('name') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();
		if (!name) return;

		const exerciseIds = selected.map((exercise) => exercise.id).filter(Boolean) as string[];

		await onSubmit({ name, description, exerciseIds });
	}
</script>

<h1>{title}</h1>
<form onsubmit={handleSubmit}>
	<TextInput label="Name" name="name" value={initialProgram?.name ?? ''} />
	<TextareaInput label="Description" name="description" value={initialProgram?.description ?? ''} />
	<h2>Selected exercises ({selected.length})</h2>
	<ul>
		{#each selected as exercise (exercise.id)}
			<li>
				<button type="button" class="unstyled" onclick={() => removeExercise(exercise)}>
					<ExerciseCard {...exercise} />
				</button>
			</li>
		{:else}
			<p>No exercises match your search criteria.</p>
		{/each}
	</ul>
	<h2>Available exercises</h2>
	<TextInput label="Filter exercises" name="exerciseFilter" bind:value={query} />
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
		<button class="button" type="submit">{submitLabel}</button>
		<a href={cancelHref} class="button danger">Cancel</a>
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
