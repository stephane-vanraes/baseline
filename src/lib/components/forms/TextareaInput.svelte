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

