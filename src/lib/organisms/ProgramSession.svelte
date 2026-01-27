<script lang="ts">
	import { onMount } from 'svelte';
	import { addExerciseEntry, getExercisesForProgram } from '$lib/db';
	import type { Exercise, ExerciseEntry, Program } from '$lib/db/types';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import Card from '$lib/components/Card.svelte';
	import { getSuffix } from '$lib/utils/exercise';

	type Props = {
		exercises: Exercise[];
		program: Program;
		onFinished: (entries: ExerciseEntry[]) => void;
		onCancel?: () => void;
	};
	const { exercises, program, onFinished, onCancel }: Props = $props();

	async function handleSubmit(ev: SubmitEvent) {
		ev.preventDefault();
		const form = ev.currentTarget as HTMLFormElement;
		const data = new FormData(form);

		const entries = exercises.map((exercise) => {
			const rawValue = data.get(`${exercise.id}-value`);
			const rawRpe = data.get(`${exercise.id}-rpe`);
			return {
				id: crypto.randomUUID(),
				exerciseId: exercise.id,
				value: Number(rawValue ?? exercise.currentValue),
				rpe: Number(rawRpe ?? 7)
			};
		});

		//await Promise.all(entries.map(addExerciseEntry));

		onFinished(entries);
	}
</script>

<h2>{program.name}</h2>
<form onsubmit={handleSubmit}>
	{#each exercises as exercise (exercise.id)}
		<Card vertical>
			<strong>{exercise.name}</strong>
			<div class="inputs">
				<NumberInput
					label={exercise.type}
					name={`${exercise.id}-value`}
					value={exercise.currentValue}
					unit={getSuffix(exercise.type)}
				/>
				<NumberInput label="RPE" name={`${exercise.id}-rpe`} value={7} />
			</div>
		</Card>
	{/each}
	<div class="actions">
		<button class="button" type="submit">Finish session</button>
		{#if onCancel}
			<button class="button danger" type="button" onclick={onCancel}>Cancel</button>
		{/if}
	</div>
</form>

<style>
	form {
		display: grid;
		gap: 0.5rem;
	}

	.inputs {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: 1fr 1fr;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
</style>
