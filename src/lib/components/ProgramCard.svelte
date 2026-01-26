<script lang="ts">
	import type { Program } from '$lib/db/types';
	import Card from './Card.svelte';

	const program: Program = $props();
	const count = $derived(program.exerciseIds?.length ?? 0);
	const text = $derived(`${count} ${count === 1 ? 'exercise' : 'exercises'}`);
</script>

<Card>
	<div>
		<strong>{program.name}</strong>
		<span>{text}</span>
	</div>
</Card>

<style>
	div {
		display: grid;
		gap: 0.25rem;
	}

	span {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.7;
	}
</style>
