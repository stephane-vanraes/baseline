<script lang="ts">
	import ExerciseDetailsCard from './ExerciseDetailsCard.svelte';
	import ExerciseHistoryList from './ExerciseHistoryList.svelte';

	let { data } = $props();

	const latestEntry = $derived.by(() => {
		if (data.entries.length > 0) {
			return data.entries[data.entries.length - 1];
		} else {
			return undefined;
		}
	});
</script>

<h1>{data.exercise.name}</h1>

<ExerciseDetailsCard exercise={data.exercise} {latestEntry} />
<ExerciseHistoryList entries={data.entries} type={data.exercise.type} />
