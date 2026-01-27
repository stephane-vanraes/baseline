<script lang="ts">
	import ExerciseDetailsCard from './ExerciseDetailsCard.svelte';
	import ExerciseHistoryList from './ExerciseHistoryList.svelte';

	let { data } = $props();
</script>

<h1>{data.exercise.name}</h1>

<ExerciseDetailsCard exercise={data.exercise} latestEntry={data.entries[0]} />
<ExerciseHistoryList entries={data.entries} type={data.exercise.type} />
