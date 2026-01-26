<script lang="ts">
	import { resolve } from '$app/paths';
	import type { ResolvedPathname } from '$app/types';
	import { onMount } from 'svelte';

	const props = $props<{
		action?: string;
		body: string;
		href?: ResolvedPathname;
		title: string;
		onAction?: () => void;
		timeout?: number;
	}>();

	let hidden = $state(false);

	onMount(() => {
		if (props.timeout) {
			setTimeout(() => {
				hidden = true;
			}, props.timeout);
		}
	});
</script>

<div class:hidden>
	<h2>{props.title}</h2>
	<p>{props.body}</p>
	{#if props.href}
		<a class="button" href={resolve(props.href)}>{props.action ?? ''}</a>
	{:else if props.onAction}
		<button onclick={props.onAction}>{props.action ?? ''}</button>
	{/if}
</div>

<style>
	div {
		background: var(--color-warning);
		border: 1px solid var(--color-warning-border);
		border-radius: 0.5rem;
		display: grid;
		font-size: 0.75rem;
		padding: 1rem;
	}
	.hidden {
		display: none;
	}
	h2 {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.08rem;
		text-transform: uppercase;
	}
	p {
		color: var(--color-text-muted);
	}
	a,
	button {
		justify-self: end;
		margin-block-start: 0.5rem;
	}
</style>
