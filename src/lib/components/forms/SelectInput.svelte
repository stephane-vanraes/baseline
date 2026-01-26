<script lang="ts">
	let {
		label,
		name,
		value = $bindable(''),
		options = []
	} = $props<{
		label: string;
		name: string;
		value?: string;
		options: { value: string; label: string }[];
	}>();
</script>

<label>
	<span>{label}</span>
	<select {name} bind:value>
		{#each options as option (option.value)}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
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

	select {
		padding: 0.5rem 2.25rem 0.5rem 0.875rem;
		border-radius: 0.875rem;
		border: 1px solid var(--color-accent-soft);
		background-color: var(--color-surface);
		color: var(--color-text);
		text-transform: none;
		letter-spacing: normal;
		max-inline-size: 100%;
		appearance: none;
		background-image:
			linear-gradient(45deg, transparent 50%, var(--color-text) 50%),
			linear-gradient(135deg, var(--color-text) 50%, transparent 50%);
		background-position:
			calc(100% - 1rem) 55%,
			calc(100% - 0.75rem) 55%;
		background-size:
			0.4rem 0.4rem,
			0.4rem 0.4rem;
		background-repeat: no-repeat;
	}
</style>
