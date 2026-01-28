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

