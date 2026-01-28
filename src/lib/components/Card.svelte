<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { children: Snippet; vertical?: boolean };
	const { children, vertical }: Props = $props();
</script>

<div class:vertical>
	{@render children?.()}
</div>

