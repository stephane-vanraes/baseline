<script lang="ts">
	import type { Profile } from '$lib/db/types';
	import { formatDateYMD } from '$lib/utils/date';

	const { dob, height, currentWeight, currentWaist }: Profile = $props();
</script>

<div class="card">
	<div>
		<small>Date of Birth</small>
		<strong>{formatDateYMD(dob)}</strong>
	</div>
	<div>
		<small>Height</small>
		<strong>{height} cm</strong>
	</div>
	<div>
		<small>Weight</small>
		<strong>{currentWeight} kg</strong>
	</div>
	<div>
		<small>Waist</small>
		<strong>{currentWaist} cm</strong>
	</div>
</div>

<style>
	.card {
		grid-template-columns: 1fr 1fr;
		gap: var(--gap);

		> div {
			display: grid;
			gap: var(--gap-sm);
		}
	}
</style>
