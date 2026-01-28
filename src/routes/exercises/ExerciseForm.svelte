<script lang="ts">
	import type { ExerciseType } from '$lib/db/types';
	import { onMount } from 'svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import TextareaInput from '$lib/components/forms/TextareaInput.svelte';
	import SelectInput from '$lib/components/forms/SelectInput.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import FormActions from '$lib/components/forms/FormActions.svelte';
	import { getSuffix } from '$lib/utils/exercise';
	import { EXERCISE_TYPE_OPTIONS } from '$lib/constants/exercise';

	type ExerciseFormValues = {
		name: string;
		description: string;
		link: string;
		type: ExerciseType;
		initialValue: number;
		increment: number;
		currentValue?: number;
	};

	type ExerciseFormInitial = Partial<ExerciseFormValues>;

	type Props = {
		title: string;
		submitLabel: string;
		cancelHref: string;
		initialExercise?: ExerciseFormInitial;
		showCurrentValue?: boolean;
		onSubmit: (values: ExerciseFormValues) => Promise<void> | void;
	};

	let {
		title,
		submitLabel,
		cancelHref,
		initialExercise,
		showCurrentValue = false,
		onSubmit
	}: Props = $props();

	let selectedType = $state<ExerciseType>('weight');
	const unit = $derived(getSuffix(selectedType));

	onMount(() => {
		selectedType = initialExercise?.type ?? 'weight';
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		const name = String(formData.get('name') ?? '').trim();
		const description = String(formData.get('description') ?? '').trim();
		const link = String(formData.get('link') ?? '').trim();
		const type = (formData.get('type') as ExerciseType) ?? selectedType;
		const initialValue = Number(formData.get('initialValue') ?? initialExercise?.initialValue ?? 30);
		const increment = Number(formData.get('increment') ?? initialExercise?.increment ?? 1);
		const currentValue = Number(
			formData.get('currentValue') ??
				initialExercise?.currentValue ??
				initialExercise?.initialValue ??
				initialValue
		);

		if (!name) return;

		await onSubmit({
			name,
			description,
			link,
			type,
			initialValue,
			increment,
			currentValue: showCurrentValue ? currentValue : undefined
		});
	}
</script>

<h1>{title}</h1>
<form onsubmit={handleSubmit}>
	<TextInput label="Name" name="name" value={initialExercise?.name ?? ''} />
	<TextareaInput label="Description" name="description" value={initialExercise?.description ?? ''} />
	<TextInput label="Link" name="link" type="url" value={initialExercise?.link ?? ''} />
	<SelectInput label="Type" name="type" options={EXERCISE_TYPE_OPTIONS} bind:value={selectedType} />
	<NumberInput label="Initial value" name="initialValue" value={initialExercise?.initialValue ?? 30} {unit} />
	<NumberInput label="Increment" name="increment" value={initialExercise?.increment ?? 1} {unit} />
	{#if showCurrentValue}
		<NumberInput
			label="Current value"
			name="currentValue"
			value={initialExercise?.currentValue ?? initialExercise?.initialValue ?? 0}
			{unit}
		/>
	{/if}
	<FormActions {submitLabel} {cancelHref} />
</form>

