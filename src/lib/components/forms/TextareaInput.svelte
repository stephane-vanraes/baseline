<script lang="ts">
	let {
		label,
		name,
		value = $bindable(''),
		rows = 4
	} = $props<{
		label: string;
		name: string;
		value?: string;
		rows?: number;
	}>();
</script>

<label>
	<span>{label}</span>
	<textarea {name} {rows} bind:value></textarea>
</label>

<style>
	label {
		display: grid;
		gap: 0.25rem;
		color: var(--color-text);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	span {
		font-weight: 600;
	}

	textarea {
		padding: 0.5rem 0.875rem;
		border-radius: 0.875rem;
		border: 1px solid var(--color-accent-soft);
		background: var(--color-surface);
		color: var(--color-text);
		text-transform: none;
		letter-spacing: normal;
		max-inline-size: 100%;
		min-block-size: 6rem;
		resize: vertical;
	}
</style>
