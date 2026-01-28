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

