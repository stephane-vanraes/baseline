<script lang="ts">
	import type { Program } from '$lib/db/types';
	import ProgramCard from '$lib/components/ProgramCard.svelte';

	const {
		programs = [],
		onSelect
	}: {
		programs: Program[];
		onSelect: (program: Program) => void;
	} = $props();
</script>

<h1>Select a program</h1>
<ul>
	{#each programs as program (program.id)}
		<li>
			<button class="unstyled" type="button" onclick={() => onSelect(program)}>
				<ProgramCard {...program} />
			</button>
		</li>
	{/each}
</ul>
