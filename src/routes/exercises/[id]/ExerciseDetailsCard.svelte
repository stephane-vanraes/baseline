<script lang="ts">
	type Props = {
		description?: string;
		url?: string;
	};
	const { description, url }: Props = $props();
</script>

{#if url || description}
	<div class="card">
		{#if description}
			<p>{description}</p>
		{/if}
		{#if url}
			<a href={url}>Visit Link</a>
		{/if}
	</div>
{/if}
