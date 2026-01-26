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

<style>
	span {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.7;
	}

	strong {
		font-size: 1rem;
		font-weight: 600;
	}

	.badge {
		padding: 0.25rem 0.6rem;
		border-radius: 999px;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		border: 1px solid var(--color-accent);
		color: var(--color-text);
		background: var(--color-accent-soft);
		opacity: 1;
	}

	.badge.warning {
		border-color: var(--color-warning-border);
		background: var(--color-warning);
	}

	.badge.danger {
		border-color: var(--color-danger-border);
		background: var(--color-danger);
	}
</style>
