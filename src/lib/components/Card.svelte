<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { children: Snippet; vertical?: boolean };
	const { children, vertical }: Props = $props();
</script>

<div class:vertical>
	{@render children?.()}
</div>

<style>
	div {
		align-items: center;
		background: var(--color-surface);
		border-radius: 0.875rem;
		border: 1px solid var(--color-accent-soft);
		color: var(--color-text);
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
		max-inline-size: 100%;
		padding: 0.75rem 1rem;
		text-decoration: none;
	}
	.vertical {
		display: grid;
	}
</style>
