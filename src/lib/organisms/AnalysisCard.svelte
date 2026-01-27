<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import { type Analysis } from '$lib/utils/analysis';
	import { formatExercise, getSuffix } from '$lib/utils/exercise';

	const { entry, exercise, suggestions, history }: Analysis = $props();
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
				<strong>{history.rpe ?? '-'}</strong>
			</div>

			<p>
				Recent sessions indicate low relative effort. Suggested adjustment: +{formatExercise(
					exercise.increment,
					exercise.type
				)}
			</p>

			<NumberInput
				label={exercise.type}
				name={`${exercise.id}-value`}
				value={suggestions.increase}
				unit={getSuffix(exercise.type)}
			/>
			<button>Set</button>
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

		button {
			justify-self: end;
		}
	}
</style>
