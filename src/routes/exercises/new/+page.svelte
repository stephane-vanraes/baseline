<script lang="ts">
	import { addExercise } from '$lib/db';
	import type { ExerciseType } from '$lib/db/types';
	import { goto } from '$app/navigation';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import TextareaInput from '$lib/components/forms/TextareaInput.svelte';
	import SelectInput from '$lib/components/forms/SelectInput.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import { resolve } from '$app/paths';
	import { getSuffix } from '$lib/utils/exercise';

	const typeOptions: { value: ExerciseType; label: string }[] = [
		{ value: 'weight', label: 'Weight' },
		{ value: 'time', label: 'Time' },
		{ value: 'distance', label: 'Distance' }
	];

	let selectedType = $state(typeOptions[0].value);
	const unit = $derived(getSuffix(selectedType));

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);

		const name = String(data.get('name') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();
		const link = String(data.get('link') ?? '').trim();
		const type = (data.get('type') as ExerciseType) ?? 'weight';
		const initialValue = Number(data.get('initialValue') ?? 0);
		const increment = Number(data.get('increment') ?? 1);

		if (!name) return;

		const id = await addExercise({
			name,
			description,
			link,
			type,
			initialValue,
			currentValue: initialValue,
			increment
		});

		await goto(resolve('/exercises/[id]', { id }));
	}
</script>

<h1>New exercise</h1>
<form onsubmit={handleSubmit}>
	<TextInput label="Name" name="name" />
	<TextareaInput label="Description" name="description" />
	<TextInput label="Link" name="link" type="url" />
	<SelectInput label="Type" name="type" options={typeOptions} bind:value={selectedType} />
	<NumberInput label="Initial value" name="initialValue" value={30} {unit} />
	<NumberInput label="Increment" name="increment" value={1} {unit} />
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
