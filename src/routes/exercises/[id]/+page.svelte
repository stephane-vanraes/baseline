<script lang="ts">
	import ExerciseSummaryCard from './ExerciseSummaryCard.svelte';
	import ExerciseHistoryList from './ExerciseHistoryList.svelte';
	import ExerciseDetailsCard from './ExerciseDetailsCard.svelte';

	let { data } = $props();
</script>

<h1>{data.exercise.name}</h1>

<ExerciseDetailsCard description={data.exercise.description} url={data.exercise.link} />
<ExerciseSummaryCard exercise={data.exercise} latestEntry={data.entries[0]} />
<ExerciseHistoryList entries={data.entries} type={data.exercise.type} />
