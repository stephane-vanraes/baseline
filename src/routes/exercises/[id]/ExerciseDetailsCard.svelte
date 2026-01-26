<script lang="ts">
	import type { Exercise, ExerciseEntry } from '$lib/db/types';
	import { updateExercise } from '$lib/db';
	import Card from '$lib/components/Card.svelte';
	import { formatExercise } from '$lib/utils/exercise';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import { formatDateYMD } from '$lib/utils/date';
	import Banner from '$lib/components/Banner.svelte';

	type Props = {
		exercise: Exercise;
		latestEntry?: ExerciseEntry;
	};

	const { exercise, latestEntry }: Props = $props();

	let hasChangedValue = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!exercise.id) return;
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const rawValue = data.get('currentValue');
		const currentValue = Number(rawValue ?? exercise.currentValue);
		await updateExercise(exercise.id, { currentValue });
		hasChangedValue = true;
	}
</script>

{#if hasChangedValue}
	<Banner
		title="Current value changed"
		body="You change the current value for this exercise"
		timeout={3000}
	/>
{/if}

<Card vertical>
	<div class="stats">
		<div>
			<span>Initial value</span>
			<strong>{formatExercise(exercise.initialValue, exercise.type)}</strong>
		</div>
		<div>
			{#if latestEntry}
				<span>Latest value ({formatDateYMD(latestEntry.createdAt)})</span>
				<strong>{formatExercise(latestEntry.value, exercise.type)}</strong>
			{/if}
		</div>
	</div>
	<form class="update" onsubmit={handleSubmit}>
		<NumberInput label="Current value" name="currentValue" value={exercise.currentValue} />
		<button class="button" type="submit">Set</button>
	</form>
</Card>

<style>
	.stats {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	}

	.stats div {
		display: grid;
		gap: 0.25rem;
	}

	span {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.7;
	}

	.update {
		align-items: end;
		display: grid;
		gap: 0.75rem;
		grid-template-columns: 1fr auto;
		inline-size: 100%;
	}
</style>
