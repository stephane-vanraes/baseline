<script lang="ts">
	import { resolve } from '$app/paths';
	import type { ResolvedPathname } from '$app/types';

	const props = $props<{
		action?: string;
		body: string;
		href?: ResolvedPathname;
		title: string;
		onAction?: () => void;
	}>();

	let hidden = $state(false);
</script>

<div class:hidden>
	<h2>{props.title}</h2>
	<p>{props.body}</p>
	{#if props.href}
		<a class="button" href={resolve(props.href)}>{props.action ?? ''}</a>
	{:else if props.onAction}
		<button onclick={props.onAction}>{props.action ?? ''}</button>
	{/if}
	<button
		class="close"
		onclick={() => {
			hidden = true;
		}}>&Cross;</button
	>
</div>

