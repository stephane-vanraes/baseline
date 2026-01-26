<script lang="ts">
	import { resolve } from '$app/paths';
	import Banner from '$lib/components/Banner.svelte';
	import banners from '$lib/organisms/banners';
	import ExerciseCard from '../../lib/components/ExerciseCard.svelte';

	let { data } = $props();
</script>

{#if !data.exercises || data.exercises.length === 0}
	<Banner {...banners.exercise} />
{:else}
	<h1>Exercises</h1>
	<a class="button" href={resolve('/exercises/new')}>New exercise</a>
	<ul>
		{#each data.exercises as exercise (exercise.id)}
			<li>
				<a href={resolve('/exercises/[id]', { id: exercise.id })}>
					<ExerciseCard {...exercise} />
				</a>
			</li>
		{/each}
	</ul>
{/if}
