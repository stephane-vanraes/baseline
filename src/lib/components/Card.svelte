<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { children: Snippet };
	const { children }: Props = $props();
</script>

<div>
	{@render children?.()}
</div>

<style>
	div {
		background-color: var(--color-surface);
		border: 1px solid hsl(from var(--color-surface) h s calc(l * 0.9));
		border-radius: var(--gap);
		display: grid;
		gap: var(--gap-sm);
		padding: var(--gap);
	}
</style>
