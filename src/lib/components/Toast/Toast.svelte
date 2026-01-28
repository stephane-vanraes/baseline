<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { toastList } from './toastList.svelte';

	const currentToast = $derived(toastList[0] ?? undefined);

	const timeout = () => {
		setTimeout(() => toastList.shift(), 3000);
	};
</script>

{#if currentToast}
	{#key currentToast.id}
		<div class={currentToast.type} {@attach timeout} in:fly={{ y: 200 }} out:fade>
			<p>{currentToast.title}</p>
			<p>{currentToast.body}</p>
		</div>
	{/key}
{/if}

<style>
	div {
		position: fixed;
		inset: auto 0 0 0;
		background-color: var(--color-surface);
		border-top: 2px solid var(--color-accent);
		color: var(--color-text);
		display: grid;
		gap: 0.35rem;
		padding: 0.65rem 1rem 0.8rem;
		font-size: 0.85rem;
		box-shadow: 0 -8px 24px rgba(31, 41, 55, 0.12);

		&.success {
			background-color: var(--color-accent-soft);
			border-top-color: var(--color-accent);
		}

		&.warning {
			background-color: var(--color-warning);
			border-top-color: var(--color-warning-border);
		}

		&.error {
			background-color: var(--color-danger);
			border-top-color: var(--color-danger-border);
		}
	}

	p {
		margin: 0;
		letter-spacing: 0.01em;
	}

	p:first-child {
		font-weight: 600;
		font-size: 0.95rem;
	}

	p:last-child {
		color: var(--color-text-muted);
	}
</style>
