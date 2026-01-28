<script lang="ts">
	let {
		label,
		name,
		type = 'text',
		value = $bindable('')
	} = $props<{
		label: string;
		name: string;
		type?: 'text' | 'url';
		value?: string;
	}>();
</script>

<label>
	<span>{label}</span>
	<input {type} {name} bind:value />
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

	input {
		padding: var(--gap) var(--gap-l);
		border-radius: var(--gap);
		border: 1px solid var(--color-accent);
		background: var(--color-surface);
		color: var(--color-text);
		text-transform: none;
		max-inline-size: 100%;
	}
</style>
