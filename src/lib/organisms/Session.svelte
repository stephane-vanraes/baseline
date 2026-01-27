<script lang="ts">
	import type { ExerciseEntry, Exercise, Program } from '$lib/db/types.js';
	import ProgramPicker from '$lib/organisms/ProgramPicker.svelte';
	import ProgramSession from '$lib/organisms/ProgramSession.svelte';
	import Banner from '$lib/components/Banner.svelte';
	import { getExercisesForProgram } from '$lib/db';
	import SessionAnalysis from './SessionAnalysis.svelte';
	import { invalidate } from '$app/navigation';

	type Props = {
		exercises: Exercise[];
		hasExerciseToday: boolean;
		programs: Program[];
	};

	const { hasExerciseToday }: Props = $props();

	let selectedProgram = $state<Program>();
	let exerciseLoader = $derived.by(() => {
		if (!selectedProgram) return Promise.resolve([]);
		return getExercisesForProgram(selectedProgram.id);
	});

	let programCompleted = $state(false);
	let entries = $state<ExerciseEntry[]>([]);
</script>

{#if hasExerciseToday}
	<Banner title="Session already logged" body="You've registered exercises today." />
{:else if !selectedProgram}
	<ProgramPicker bind:selectedProgram />
{:else}
	{#await exerciseLoader then exercises}
		{#if !programCompleted}
			<ProgramSession
				{exercises}
				program={selectedProgram}
				onFinished={(e) => {
					programCompleted = true;
					entries = e;
				}}
				onCancel={() => {
					selectedProgram = undefined;
				}}
			/>
		{:else}
			<SessionAnalysis
				{entries}
				onComplete={() => {
					selectedProgram = undefined;
					invalidate('app:exercise-entries');
				}}
			/>
		{/if}
	{/await}
{/if}
