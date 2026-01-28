<script lang="ts">
	import type { BodyStatsEntry, Profile } from '$lib/db/types';
	import Card from '$lib/components/Card.svelte';

	type Props = {
		profile: Profile;
		entries?: BodyStatsEntry[];
	};

	const { profile, entries = [] }: Props = $props();

	const latestWeight = $derived(entries[0]?.weight ?? profile.currentWeight);
	const heightMeters = $derived.by(() => {
		const height = profile.height ?? 0;
		return height > 3 ? height / 100 : height;
	});
	const bmi = $derived(
		latestWeight && heightMeters ? latestWeight / (heightMeters * heightMeters) : undefined
	);
	const bmiStatus = $derived.by(() => {
		if (!bmi) return { label: 'OK', tone: 'accent' };
		if (bmi < 25) return { label: 'OK', tone: 'accent' };
		if (bmi < 30) return { label: 'Overweight', tone: 'warning' };
		return { label: 'Obese', tone: 'danger' };
	});
</script>

<Card>
	<span>BMI status</span>
	<strong>{bmi ? bmi.toFixed(1) : '—'}</strong>
	<span class={`badge ${bmiStatus.tone}`}>{bmiStatus.label}</span>
</Card>

