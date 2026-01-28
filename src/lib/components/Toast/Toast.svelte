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

