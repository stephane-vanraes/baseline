<script lang="ts">
	import Onboarding from '$lib/organisms/Onboarding.svelte';
	import Measurements from '$lib/organisms/Measurements.svelte';
	import Session from '$lib/organisms/Session.svelte';

	const { data } = $props();
</script>

{#if data.onboarding.required}
	<Onboarding {...data.onboarding} />
{:else}
	<Measurements {...data} />
	<Session {...data} />
{/if}
