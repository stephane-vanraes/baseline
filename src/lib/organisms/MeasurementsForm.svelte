<script lang="ts">
	import { addBodyStatEntry } from '$lib/db';
	import Card from '$lib/components/Card.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';

	const {
		onSubmitted,
		currentWeight,
		currentWaist
	}: { onSubmitted?: () => void; currentWeight?: number; currentWaist?: number } = $props();

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const weight = Number(data.get('weight') ?? 0);
		const waist = Number(data.get('waist') ?? 0);

		if (!weight || !waist) return;

		await addBodyStatEntry({ weight, waist });
		form.reset();
		onSubmitted?.();
	}
</script>

<h1>New measurements</h1>
<Card vertical>
	<form onsubmit={handleSubmit}>
		<NumberInput label="Weight" name="weight" unit="kg" value={currentWeight} />
		<NumberInput label="Waist" name="waist" unit="cm" value={currentWaist} />
		<button class="button" type="submit">Add measurements</button>
	</form>
</Card>

<style>
	form {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: 1fr 1fr;
	}

	button {
		grid-column: 1 / -1;
		justify-self: start;
	}
</style>
