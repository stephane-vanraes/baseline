<script lang="ts">
	const { current, prev }: { current: number; prev?: number } = $props();
</script>

{#if !prev}
	<span class="flat">/</span>
{:else if current > prev}
	<span class="up">+</span>
{:else}
	<span class="down">-</span>
{/if}

