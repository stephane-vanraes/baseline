<script lang="ts">
	import { updateProgram } from '$lib/db';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ProgramForm from '../../ProgramForm.svelte';

	let { data } = $props();

	async function handleSubmit(values: { name: string; description: string; exerciseIds: string[] }) {
		if (!data.program?.id) return;
		const { name, description, exerciseIds } = values;

		await updateProgram(data.program.id, { name, description, exerciseIds });
		await goto(resolve('/programs/[id]', { id: data.program.id }));
	}
</script>

<ProgramForm
	title="Edit program"
	submitLabel="Save changes"
	cancelHref={resolve('/programs/[id]', { id: data.program.id })}
	exercises={data.exercises}
	initialProgram={{
		name: data.program.name,
		description: data.program.description,
		exerciseIds: data.program.exerciseIds
	}}
	onSubmit={handleSubmit}
/>
