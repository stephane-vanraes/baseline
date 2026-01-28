<script lang="ts">
	import type { BodyStatsEntry, Profile } from '$lib/db/types';

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

<div class="card">
	<small>BMI status</small>
	<strong>{bmi ? bmi.toFixed(1) : '—'}</strong>
	<span class={`badge ${bmiStatus.tone}`}>{bmiStatus.label}</span>
</div>

<style>
	div {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}
	.badge {
		background-color: var(--color-accent);
		border-radius: var(--gap-xl);
		border: 2px solid var(--color-accent-border);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		max-inline-size: max-content;
		padding: var(--gap-sm) var(--gap);
		text-transform: uppercase;
	}
	.badge.danger {
		background-color: var(--color-error-bg);
		border-color: var(--color-error-border);
		color: var(--color-error);
	}
	.badge.warning {
		background-color: var(--color-warning-bg);
		border-color: var(--color-warning-border);
		color: var(--color-warning);
	}
</style>
