<script lang="ts">
	let {
		label,
		name,
		value = $bindable('')
	} = $props<{
		label: string;
		name: string;
		value?: string;
	}>();
</script>

<label>
	<span>{label}</span>
	<input type="date" {name} bind:value />
</label>

