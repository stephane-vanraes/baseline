<script lang="ts">
	type Props = {
		label: string;
		name: string;
		step?: number;
		unit?: string;
		value?: number;
	};
	let { label, name, step = 0.5, unit, value = $bindable(0) }: Props = $props();
</script>

<label>
	<span>
		{label}
		{#if unit}
			<small>({unit})</small>
		{/if}
	</span>
	<div class="field">
		<input type="number" {name} {step} bind:value />
		{#if unit}
			<span>{unit}</span>
		{/if}
	</div>
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
		align-items: center;
		display: inline-flex;
		gap: 0.35rem;
		opacity: 0.7;
	}

	.field {
		align-items: center;
		display: grid;
		gap: 0.5rem;
		grid-template-columns: minmax(0, 1fr) auto;
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
