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

<style>
	span {
		display: grid;
		place-items: center;
		inline-size: 1.25rem;
		block-size: 1.25rem;
		border-radius: 999px;
		font-size: 0.75rem;
		background: var(--color-accent-soft);
		color: var(--color-text);
	}

	.up {
		background: rgba(34, 197, 94, 0.15);
		color: #1f7a3e;
	}

	.down {
		background: rgba(239, 68, 68, 0.15);
		color: #9b1c1c;
	}

	.flat {
		background: rgba(148, 163, 184, 0.2);
		color: #64748b;
	}
</style>
