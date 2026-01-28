<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import { type Analysis } from '$lib/utils/analysis';
	import { formatExercise, getSuffix } from '$lib/utils/exercise';
	import { updateExercise } from '$lib/db';
	import { invalidateAll } from '$app/navigation';
	import { addToast } from '$lib/components/Toast/toastList.svelte';

	const { entry, exercise, suggestions, history }: Analysis = $props();

	let increaseValue = $state(suggestions.increase ?? 0);
	let decreaseValue = $state(suggestions.decrease ?? 0);

	$effect(() => {
		if (suggestions.increase !== undefined) {
			increaseValue = suggestions.increase;
		}
	});

	$effect(() => {
		if (suggestions.decrease !== undefined) {
			decreaseValue = suggestions.decrease;
		}
	});

	async function applyValue(value: number | undefined) {
		if (!exercise.id || value === undefined) return;
		await updateExercise(exercise.id, { currentValue: value });
		await invalidateAll();
		addToast({
			title: 'Value updated',
			body: 'Current value adjusted based on your session.',
			type: 'success'
		});
	}
</script>

{#if suggestions.none}
	<Card>
		<strong>{exercise.name}</strong>
		<small>OK</small>
	</Card>
{:else if suggestions.increase}
	<Card vertical>
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
	<Card vertical>
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

<style>
	.summary {
		align-items: end;
		display: grid;
		gap: 0.5rem;
		grid-template-columns: 1fr 1fr;

		> strong,
		> p {
			grid-column: 1 / -1;
		}

		> div {
			display: grid;
			gap: 0.25rem;

			> span {
				font-size: 0.7rem;
				text-transform: uppercase;
				letter-spacing: 0.08em;
				opacity: 0.7;
			}
		}

		p {
			padding-block-end: 1rem;
		}

		button {
			justify-self: end;
		}
	}
</style>
