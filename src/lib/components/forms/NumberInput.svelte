<script lang="ts">
	let {
		label,
		name,
		step = 1,
		value = $bindable(0)
	} = $props<{
		label: string;
		name: string;
		step?: number;
		value?: number;
	}>();
</script>

<label>
	<span>{label}</span>
	<input type="number" {name} {step} bind:value />
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
		opacity: 0.7;
	}

	input {
		background: var(--color-background);
		border-radius: 0.5rem;
		border: 1px solid var(--color-accent-soft);
		color: var(--color-text);
		inline-size: 100%;
		letter-spacing: normal;
		max-inline-size: 100%;
		padding: 0.5rem 0.875rem;
		text-transform: none;
	}
</style>
