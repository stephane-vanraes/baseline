<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { clearDatabase, seedDatabase } from '$lib/db';

	const clear = () => clearDatabase().then(invalidateAll);
	const seed = () => seedDatabase().then(invalidateAll);
</script>

<footer>
	<button onclick={clear}>Clear DB</button>
	<button onclick={seed}>Seed DB</button>
</footer>

<style>
	footer {
		background: var(--color-surface);
		border-block-start: 1px solid var(--color-accent);
		box-shadow: var(--shadow);
		padding: 1rem 1.5rem;
		margin-inline: auto;
		max-inline-size: 96ch;
	}
</style>
