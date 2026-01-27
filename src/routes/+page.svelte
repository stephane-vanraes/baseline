<script lang="ts">
	import type { Program } from '$lib/db/types.js';
	import ProgramPicker from '$lib/organisms/ProgramPicker.svelte';
	import ProgramSession from '$lib/organisms/ProgramSession.svelte';
	import Onboarding from '$lib/organisms/Onboarding.svelte';
	import Banner from '$lib/components/Banner.svelte';
	import MeasurementsForm from '$lib/organisms/MeasurementsForm.svelte';

	const { data } = $props();

	let selectedProgram = $state<Program>();
	let hasCompletedProgram = $state(false);
	let hasEnteredMeasurements = $state(false);
</script>

{#if data.onboarding.required}
	<Onboarding {...data.onboarding} />
{:else}
	{#if data.hasMeasurementsToday}
		<Banner title="Measurements logged" body="You've already logged measurements this week." />
	{:else if hasEnteredMeasurements}
		<Banner
			title="Measurements saved"
			body="You've logged new measurements for this week."
			timeout={3000}
		/>
	{:else}
		<MeasurementsForm
			onSubmitted={() => {
				hasEnteredMeasurements = true;
			}}
		/>
	{/if}

	{#if hasCompletedProgram}
		<Banner title="Session Saved" body="You registered a session" timeout={3000} />
	{/if}
	{#if data.hasExerciseToday}
		<Banner title="Session already logged" body="You've registered exercises today." />
	{/if}
	{#if !selectedProgram}
		<ProgramPicker
			programs={data.programs}
			onSelect={(program) => {
				hasCompletedProgram = false;
				selectedProgram = program;
			}}
		/>
	{:else}
		<ProgramSession
			program={selectedProgram}
			exercises={data.exercises}
			onFinished={() => {
				selectedProgram = undefined;
				hasCompletedProgram = true;
			}}
			onCancel={() => {
				selectedProgram = undefined;
			}}
		/>
	{/if}
{/if}
