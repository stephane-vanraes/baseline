<script lang="ts">
	import { resolve } from '$app/paths';
	import Banner from '$lib/components/Banner.svelte';
	import banners from '$lib/organisms/banners';
	import ProgramCard from '../../lib/components/ProgramCard.svelte';

	let { data } = $props();
</script>

{#if !data.programs || data.programs.length === 0}
	<Banner {...banners.programs} />
{:else}
	<h1>Programs</h1>
	<a class="button" href={resolve('/programs/new')}>New program</a>
	<ul>
		{#each data.programs as program (program.id)}
			<li>
				<a href={resolve('/programs/[id]', { id: program.id })}>
					<ProgramCard {...program} />
				</a>
			</li>
		{/each}
	</ul>
{/if}
