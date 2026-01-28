<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Banner from '$lib/components/Banner.svelte';

	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import { addBodyStatEntry } from '$lib/db';
	import type { Profile } from '$lib/db/types';
	import { showToast } from '$lib/components/Toast/toastMessages';

	type Props = {
		hasMeasurements: boolean;
		profile: Profile;
	};

	const { hasMeasurements, profile }: Props = $props();

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const weight = Number(data.get('weight') ?? 0);
		const waist = Number(data.get('waist') ?? 0);

		if (!weight || !waist) return;

		await addBodyStatEntry({ weight, waist });
		invalidate('app:bodystats');
		showToast('measurementsAdded');
	}
</script>

{#if hasMeasurements}
	<Banner title="Measurements logged" body="You've already logged measurements this week." />
{:else}
	<div class="card">
		<form onsubmit={handleSubmit}>
			<NumberInput label="Weight" name="weight" unit="kg" value={profile.currentWeight} />
			<NumberInput label="Waist" name="waist" unit="cm" value={profile.currentWaist} />
			<button class="button" type="submit">Add entry</button>
		</form>
	</div>
{/if}
