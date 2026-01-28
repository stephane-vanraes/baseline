<script lang="ts">
	import type { Exercise, ExerciseEntry } from '$lib/db/types';
	import { updateExercise } from '$lib/db';
	import Card from '$lib/components/Card.svelte';
	import { formatExercise, getSuffix } from '$lib/utils/exercise';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import { formatDateYMD } from '$lib/utils/date';
	import { invalidate } from '$app/navigation';
	import { showToast } from '$lib/components/Toast/toastMessages';

	type Props = {
		exercise: Exercise;
		latestEntry?: ExerciseEntry;
	};

	const { exercise, latestEntry }: Props = $props();

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!exercise.id) return;
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const rawValue = data.get('currentValue');
		const currentValue = Number(rawValue ?? exercise.currentValue);
		await updateExercise(exercise.id, { currentValue });
		showToast('exerciseValueUpdated');
		await Promise.all([
			invalidate('app:exercise-entries'),
			invalidate(`app:exercise-entries:${exercise.id}`),
			invalidate(`app:exercise:${exercise.id}`)
		]);
	}

	async function changeToLatest() {
		await updateExercise(exercise.id, { currentValue: latestEntry?.value });
		showToast('exerciseValueSetLatest');
		await Promise.all([
			invalidate('app:exercise-entries'),
			invalidate(`app:exercise-entries:${exercise.id}`),
			invalidate(`app:exercise:${exercise.id}`)
		]);
	}
</script>

<Card>
	<div class="stats">
		{#if latestEntry}
			<div>
				<span>Latest value ({formatDateYMD(latestEntry.createdAt)})</span>
				<strong>{formatExercise(latestEntry.value, exercise.type)}</strong>
			</div>
			{#if latestEntry.value !== exercise.currentValue}
				<button type="button" onclick={changeToLatest}>Set</button>
			{/if}
		{/if}
		<div>
			<span>Increment</span>
			<strong>{formatExercise(exercise.increment, exercise.type)}</strong>
		</div>
		<form class="update" onsubmit={handleSubmit} id="form">
			<NumberInput
				label="Current value"
				name="currentValue"
				value={exercise.currentValue}
				unit={getSuffix(exercise.type)}
			/>
		</form>
		<button class="button" type="submit" form="form">Set</button>
	</div>
</Card>

