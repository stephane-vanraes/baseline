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
		gap: var(--gap-sm);
	}

	span {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	select {
		padding: var(--gap) var(--gap-l);
		border-radius: var(--gap);
		border: 1px solid var(--color-accent);
		background: var(--color-surface);
		color: var(--color-text);
		text-transform: none;
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
