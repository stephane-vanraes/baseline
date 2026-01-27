<script lang="ts">
	import type { Program } from '$lib/db/types.js';
	import ProgramPicker from '$lib/organisms/ProgramPicker.svelte';
	import ProgramSession from '$lib/organisms/ProgramSession.svelte';
	import Onboarding from '$lib/organisms/Onboarding.svelte';
	import Banner from '$lib/components/Banner.svelte';
	import Measurements from '$lib/organisms/Measurements.svelte';
	import Session from '$lib/organisms/Session.svelte';

	const { data } = $props();

	let selectedProgram = $state<Program>();
	let hasCompletedProgram = $state(false);
</script>

{#if data.onboarding.required}
	<Onboarding {...data.onboarding} />
{:else}
	<Measurements {...data} />
	<Session {...data} />
{/if}
