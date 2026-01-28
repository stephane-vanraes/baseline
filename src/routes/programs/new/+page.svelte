<script lang="ts">
	import { addProgram } from '$lib/db';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ProgramForm from '../ProgramForm.svelte';

	let { data } = $props();

	async function handleSubmit(values: { name: string; description: string; exerciseIds: string[] }) {
		const { name, description, exerciseIds } = values;

		const id = await addProgram({ name, description, exerciseIds });
		await goto(resolve('/programs/[id]', { id }));
	}
</script>

<ProgramForm
	title="New program"
	submitLabel="Create program"
	cancelHref={resolve('/programs')}
	exercises={data.exercises}
	onSubmit={handleSubmit}
/>
