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
		gap: var(--gap-sm);
	}

	span {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	textarea {
		padding: var(--gap) var(--gap-l);
		border-radius: var(--gap);
		border: 1px solid var(--color-accent);
		background: var(--color-surface);
		color: var(--color-text);
		text-transform: none;
		max-inline-size: 100%;
		min-block-size: 6rem;
		resize: vertical;
	}
</style>
