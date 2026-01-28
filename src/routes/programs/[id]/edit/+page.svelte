<script lang="ts">
	import { updateProgram } from '$lib/db';
	import { addToast } from '$lib/components/Toast/toastList.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ProgramForm from '../../ProgramForm.svelte';

	let { data } = $props();

	async function handleSubmit(values: { name: string; description: string; exerciseIds: string[] }) {
		if (!data.program?.id) return;
		const { name, description, exerciseIds } = values;

		await updateProgram(data.program.id, { name, description, exerciseIds });
		addToast({
			title: 'Program updated',
			body: 'Your changes have been saved.',
			type: 'success'
		});
		await goto(resolve('/programs/[id]', { id: data.program.id }));
	}

	async function handleDelete() {
		if (!data.program?.id) return;
		await updateProgram(data.program.id, { deletedAt: Date.now() });
		addToast({
			title: 'Program deleted',
			body: 'This program was moved to the archive.',
			type: 'warning'
		});
		await goto(resolve('/programs'));
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

<div class="danger-zone">
	<button class="button danger" type="button" onclick={handleDelete}>Delete program</button>
</div>

<style>
	.danger-zone {
		margin-top: 1rem;
	}
</style>
