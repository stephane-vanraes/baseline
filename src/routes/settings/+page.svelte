<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { dev } from '$app/environment';
	import { clearDatabase, exportDatabase, importDatabase, seedDatabase } from '$lib/db';
	import { showToast } from '$lib/components/Toast/toastMessages';
	import Card from '$lib/components/Card.svelte';
	import Switch from '$lib/components/forms/Switch.svelte';
	import preferences from '$lib/stores/preferences.svelte';

	let fileInput: HTMLInputElement | null = $state(null);

	const attachFileInput = (node: HTMLInputElement) => {
		fileInput = node;
		return {
			destroy() {
				if (fileInput === node) {
					fileInput = null;
				}
			}
		};
	};

	const clearAllData = () => clearDatabase().then(invalidateAll);
	const seed = () => seedDatabase().then(invalidateAll);

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
		showToast('exportReady');
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
		showToast('importComplete');
	}

</script>

<h1>Settings</h1>

<Card vertical>
	<h2>Preferences</h2>
	<Switch
		label="Dark mode"
		description="Use a darker theme across the app."
		bind:checked={preferences.darkMode.current}
	/>
</Card>

<Card vertical>
	<h2>Data</h2>
	<div class="actions">
		<button class="button danger" type="button" onclick={clearAllData}>Clear all data</button>
		<button class="button" type="button" onclick={exportData}>Export</button>
		<button class="button" type="button" onclick={startImport}>Import</button>
		<input
			{@attach attachFileInput}
			type="file"
			accept="application/json"
			onchange={handleImport}
			hidden
		/>
		{#if dev}
			<button class="button" type="button" onclick={seed}>Seed</button>
		{/if}
	</div>
</Card>

<style>
	.actions {
		align-items: center;
		justify-items: center;
		display: grid;
		gap: 0.75rem;
		margin-inline: auto;
		inline-size: max-content;
		> button {
			inline-size: 100%;
			max-inline-size: unset;
		}
	}
</style>
