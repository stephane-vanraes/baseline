<script lang="ts">
	import type { Profile } from '$lib/db/types';
	import { formatDateYMD } from '$lib/utils/date';

	const { name, dob, height, currentWeight, currentWaist }: Profile = $props();
</script>

<section>
	<h1>{name}</h1>
	<div>
		<span>Date of Birth</span>
		<strong>{formatDateYMD(dob)}</strong>
	</div>
	<div>
		<span>Height</span>
		<strong>{height} cm</strong>
	</div>
	<div>
		<span>Weight</span>
		<strong>{currentWeight} kg</strong>
	</div>
	<div>
		<span>Waist</span>
		<strong>{currentWaist} cm</strong>
	</div>
</section>

<style>
	section {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: 1fr 1fr;
	}
	h1 {
		grid-column: 1 / -1;
	}

	div {
		display: grid;
		gap: 0.25rem;
		padding: 0.75rem 0.875rem;
		border-radius: 0.875rem;
		border: 1px solid var(--color-accent-soft);
		background: var(--color-surface);
		color: var(--color-text);
	}

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
</style>
