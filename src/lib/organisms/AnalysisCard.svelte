<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import { type Analysis } from '$lib/utils/analysis';
	import { formatExercise, getSuffix } from '$lib/utils/exercise';

	const { name, suggestIncrease, noSuggestions, current, session, type, id }: Analysis = $props();
</script>

{#if noSuggestions}
	<Card>
		<strong>{name}</strong>
		<small>OK</small>
	</Card>
{:else if suggestIncrease}
	<Card vertical>
		<div class="summary">
			<strong>{name}</strong>

			<div>
				<span>Current Value</span>
				<strong>{formatExercise(current, type)}</strong>
			</div>

			<div>
				<span>Session Value</span>
				<strong>{formatExercise(session, type)}</strong>
			</div>

			<p>Looks like you're doing great,maybe increase the volume?</p>

			<NumberInput label={type} name={`${id}-value`} value={session} unit={getSuffix(type)} />
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
