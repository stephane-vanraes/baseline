<script lang="ts">
	import { onMount } from 'svelte';
	import type { Program } from '$lib/db/types';
	import ProgramCard from '$lib/components/ProgramCard.svelte';
	import { allPrograms } from '$lib/db';

	type Props = {
		selectedProgram?: Program;
	};
	let { selectedProgram = $bindable() }: Props = $props();

	let programs = $state<Program[]>([]);

	onMount(async () => {
		programs = await allPrograms();
	});
</script>

<h1>Select a program</h1>
<ul>
	{#each programs as program (program.id)}
		<li>
			<button
				class="unstyled"
				type="button"
				onclick={() => {
					selectedProgram = program;
				}}
			>
				<ProgramCard {...program} />
			</button>
		</li>
	{/each}
</ul>
