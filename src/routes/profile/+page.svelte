<script lang="ts">
	import BodyStatsList from './BodyStatsList.svelte';
	import ProfileDisplay from './ProfileDisplay.svelte';
	import BmiStatusCard from './BmiStatusCard.svelte';

	let { data } = $props();
</script>

<h1>{data.profile.name}</h1>
<ProfileDisplay {...data.profile} />
<BmiStatusCard profile={data.profile} entries={data.bodyStats ?? []} />
<BodyStatsList entries={data.bodyStats ?? []} />
