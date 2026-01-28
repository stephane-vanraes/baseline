<script lang="ts">
	import type { Program } from '$lib/db/types';

	const program: Program = $props();
	const count = $derived(program.exerciseIds?.length ?? 0);
	const text = $derived(`${count} ${count === 1 ? 'exercise' : 'exercises'}`);
</script>

<div class="card">
	<div>
		<strong>{program.name}</strong>
		<span>{text}</span>
	</div>
</div>
