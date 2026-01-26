<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import type { Onboarding } from '$lib/db/types';
	import banners from './banners';

	const { hasExercises, hasProfile, hasPrograms }: Onboarding = $props();

	const bannerList = $derived.by(() => {
		return [
			!hasProfile && banners.profile,
			!hasExercises && banners.exercise,
			!hasPrograms && banners.programs
		].filter((b) => !!b);
	});
</script>

<h1>Getting Started</h1>

{#each bannerList as bannerProps (bannerProps.href)}
	<Banner {...bannerProps} />
{/each}
