<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	type Props = {
		description?: string;
		url?: string;
	};
	const { description, url }: Props = $props();
</script>

{#if url || description}
	<Card vertical>
		{#if description}
			<p>{description}</p>
		{/if}
		{#if url}
			<a href={url}>Visit Link</a>
		{/if}
	</Card>
{/if}
