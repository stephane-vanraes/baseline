<script lang="ts">
	import { addExercise } from '$lib/db';
	import type { ExerciseType } from '$lib/db/types';
	import { goto } from '$app/navigation';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import SelectInput from '$lib/components/forms/SelectInput.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import { resolve } from '$app/paths';

	const typeOptions: { value: ExerciseType; label: string }[] = [
		{ value: 'weight', label: 'Weight' },
		{ value: 'time', label: 'Time' },
		{ value: 'distance', label: 'Distance' }
	];

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);

		const name = String(data.get('name') ?? '').trim();
		const type = (data.get('type') as ExerciseType) ?? 'weight';
		const initialValue = Number(data.get('initialValue') ?? 0);

		if (!name) return;

		const id = await addExercise({
			name,
			type,
			initialValue,
			currentValue: initialValue
		});

		await goto(resolve('/exercises/[id]', { id }));
	}
</script>

<h1>New exercise</h1>
<form onsubmit={handleSubmit}>
	<TextInput label="Name" name="name" />
	<SelectInput label="Type" name="type" options={typeOptions} value={typeOptions[0].value} />
	<NumberInput label="Initial value" name="initialValue" />
	<div class="buttons">
		<button class="button" type="submit">Create exercise</button>
		<a href={resolve('/exercises')} class="button danger">Cancel</a>
	</div>
</form>

<style>
	form {
		display: grid;
		gap: 1rem;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
</style>
