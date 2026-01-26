<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import banners from '$lib/organisms/banners';
	import BodyStatsList from './BodyStatsList.svelte';
	import ProfileDisplay from './ProfileDisplay.svelte';
	import BmiStatusCard from './BmiStatusCard.svelte';

	let { data } = $props();
</script>

{#if !data.profile}
	<Banner {...banners.profile} />
{:else}
	<ProfileDisplay {...data.profile} />
	<BmiStatusCard profile={data.profile} entries={data.bodyStats ?? []} />
	<BodyStatsList entries={data.bodyStats ?? []} />
{/if}
