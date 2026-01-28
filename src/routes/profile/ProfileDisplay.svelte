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

