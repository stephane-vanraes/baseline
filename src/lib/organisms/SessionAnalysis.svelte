<script lang="ts">
	import type { ExerciseEntry } from '$lib/db/types';
	import { analyse } from '$lib/utils/analysis';
	import AnalysisCard from './AnalysisCard.svelte';

	type Props = {
		entries: ExerciseEntry[];
		onComplete: () => void;
	};

	const { entries, onComplete }: Props = $props();
</script>

<h1>Session Analysis</h1>

{#each entries as entry}
	{#await analyse(entry) then data}
		<AnalysisCard {...data} />
	{/await}
{/each}
<button onclick={onComplete}>Done</button>
