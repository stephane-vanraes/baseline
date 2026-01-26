<script lang="ts">
	import { resolve } from '$app/paths';
	import ExerciseCard from '$lib/components/ExerciseCard.svelte';

	let { data } = $props();
</script>

<h1>{data.program.name}</h1>
<ul>
	{#each data.programExercises as exercise (exercise.id)}
		<li>
			<a href={resolve('/exercises/[id]', { id: exercise.id })}>
				<ExerciseCard {...exercise} />
			</a>
		</li>
	{/each}
</ul>
