<script lang="ts">
	import type { Exercise } from '$lib/db/types';
	import { formatExercise } from '$lib/utils/exercise';
	import Card from './Card.svelte';

	const exercise: Exercise = $props();
</script>

<Card>
	<div>
		<p>
			<strong>{exercise.name}</strong>
			{#if exercise.deletedAt}
				<small>(deleted)</small>
			{/if}
		</p>
		<span>{exercise.type}</span>
	</div>
	<em>{formatExercise(exercise.currentValue, exercise.type)} </em>
</Card>

<style>
	div {
		display: grid;
		gap: 0.25rem;
		justify-items: start;
	}

	span {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.7;
	}
</style>
