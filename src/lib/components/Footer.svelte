<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { dev } from '$app/environment';
	import { clearDatabase, exportDatabase, importDatabase, seedDatabase } from '$lib/db';
	import { addToast } from '$lib/components/Toast/toastList.svelte';

	const clear = () => clearDatabase().then(invalidateAll);
	const seed = () => seedDatabase().then(invalidateAll);

	let fileInput: HTMLInputElement | null = $state(null);

	async function exportData() {
		const payload = await exportDatabase();
		const json = JSON.stringify(payload, null, 2);
		const blob = new Blob([json], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `baseline-export-${new Date().toISOString().slice(0, 10)}.json`;
		link.click();
		URL.revokeObjectURL(url);
		addToast({
			title: 'Export ready',
			body: 'Your data export has downloaded.',
			type: 'success'
		});
	}

	function startImport() {
		fileInput?.click();
	}

	async function handleImport(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		const text = await file.text();
		const payload = JSON.parse(text);
		await importDatabase(payload);
		await invalidateAll();
		input.value = '';
		addToast({
			title: 'Import complete',
			body: 'Your data has been restored.',
			type: 'success'
		});
	}
</script>

<footer>
	<button type="button" onclick={exportData}>Export</button>
	<button type="button" onclick={startImport}>Import</button>
	<input
		bind:this={fileInput}
		type="file"
		accept="application/json"
		onchange={handleImport}
		hidden
	/>
	{#if dev}
		<button type="button" onclick={clear}>Clear DB</button>
		<button type="button" onclick={seed}>Seed DB</button>
	{/if}
</footer>

<style>
	footer {
		background: var(--color-surface);
		border-block-start: 1px solid var(--color-accent);
		box-shadow: var(--shadow);
		display: grid;
		gap: 0.5rem;
		grid-template-columns: 1fr 1fr;
		padding: 1rem 1.5rem;
		margin-block-start: 50dvh;
		margin-inline: auto;
		max-inline-size: 96ch;
	}
</style>
