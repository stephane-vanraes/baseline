<script lang="ts">
	import ExerciseSummaryCard from './ExerciseSummaryCard.svelte';
	import ExerciseHistoryList from './ExerciseHistoryList.svelte';
	import ExerciseDetailsCard from './ExerciseDetailsCard.svelte';
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<div class="page-header">
	<h1>{data.exercise.name}</h1>
	<a class="button" href={resolve('/exercises/[id]/edit', { id: data.exercise.id })}>Edit</a>
</div>

<ExerciseDetailsCard description={data.exercise.description} url={data.exercise.link} />
<ExerciseSummaryCard exercise={data.exercise} latestEntry={data.entries[0]} />
<ExerciseHistoryList entries={data.entries} type={data.exercise.type} />

