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

