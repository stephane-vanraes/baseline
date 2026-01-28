<script lang="ts">
	import { resolve } from '$app/paths';
	import ExerciseCard from '$lib/components/ExerciseCard.svelte';

	let { data } = $props();
</script>

<div class="page-header">
	<h1>{data.program.name}</h1>
	<a class="button" href={resolve('/programs/[id]/edit', { id: data.program.id })}>Edit</a>
</div>
{#if data.program.description}
	<p>{data.program.description}</p>
{/if}
<ul>
	{#each data.programExercises as exercise (exercise.id)}
		<li>
			<a href={resolve('/exercises/[id]', { id: exercise.id })}>
				<ExerciseCard {...exercise} />
			</a>
		</li>
	{/each}
</ul>

