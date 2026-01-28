<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import { type Analysis } from '$lib/utils/analysis';
	import { formatExercise, getSuffix } from '$lib/utils/exercise';
	import { updateExercise } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { showToast } from '$lib/components/Toast/toastMessages';

	const { entry, exercise, suggestions, history }: Analysis = $props();

	let increaseValue = $derived(suggestions.increase ?? 0);
	let decreaseValue = $derived(suggestions.decrease ?? 0);

	async function applyValue(value: number | undefined) {
		if (!exercise.id || value === undefined) return;
		await updateExercise(exercise.id, { currentValue: value });
		await Promise.all([
			invalidate('app:exercise-entries'),
			invalidate(`app:exercise-entries:${exercise.id}`),
			invalidate(`app:exercise:${exercise.id}`)
		]);
		showToast('analysisValueUpdated');
	}
</script>

{#if suggestions.none}
	<Card>
		<strong>{exercise.name}</strong>
		<small>OK</small>
	</Card>
{:else if suggestions.increase}
	<Card>
		<div class="summary">
			<strong>{exercise.name}</strong>

			<div>
				<span>Current Value</span>
				<strong>{formatExercise(exercise.currentValue, exercise.type)}</strong>
			</div>

			<div>
				<span>Session Value</span>
				<strong>{formatExercise(entry.value, exercise.type)}</strong>
			</div>

			<div>
				<span>Session RPE</span>
				<strong>{entry.rpe}</strong>
			</div>

			<div>
				<span>Recent RPE</span>
				<strong>{history.rpe_increase ?? '-'}</strong>
			</div>

			<p>
				Recent sessions indicate low relative effort. Suggested adjustment: <strong
					>+{formatExercise(exercise.increment, exercise.type)}</strong
				>
			</p>

			<NumberInput
				label={exercise.type}
				name={`${exercise.id}-value`}
				bind:value={increaseValue}
				unit={getSuffix(exercise.type)}
			/>
			<button type="button" onclick={() => applyValue(increaseValue)}>Set</button>
		</div>
	</Card>
{:else if suggestions.decrease}
	<Card>
		<div class="summary">
			<strong>{exercise.name}</strong>

			<div>
				<span>Current Value</span>
				<strong>{formatExercise(exercise.currentValue, exercise.type)}</strong>
			</div>

			<div>
				<span>Session Value</span>
				<strong>{formatExercise(entry.value, exercise.type)}</strong>
			</div>

			<div>
				<span>Session RPE</span>
				<strong>{entry.rpe}</strong>
			</div>

			<div>
				<span>Recent RPE</span>
				<strong>{history.rpe_decrease ?? '-'}</strong>
			</div>

			<p>
				Recent sessions indicate high relative effort. Suggested adjustment: <strong
					>-{formatExercise(exercise.increment, exercise.type)}</strong
				>
			</p>

			<NumberInput
				label={exercise.type}
				name={`${exercise.id}-value`}
				bind:value={decreaseValue}
				unit={getSuffix(exercise.type)}
			/>
			<button type="button" onclick={() => applyValue(decreaseValue)}>Set</button>
		</div>
	</Card>
{/if}
