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
	<div>
		<input type="number" {name} {step} bind:value />
		{#if unit}
			<small>{unit}</small>
		{/if}
	</div>
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

	div {
		align-items: center;
		display: flex;
		gap: var(--gap);
	}

	input {
		padding: var(--gap) var(--gap-l);
		border-radius: var(--gap);
		border: 1px solid var(--color-accent);
		background: var(--color-surface);
		color: var(--color-text);
		inline-size: 100%;
		text-transform: none;
	}
</style>
