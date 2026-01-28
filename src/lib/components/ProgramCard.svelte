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

