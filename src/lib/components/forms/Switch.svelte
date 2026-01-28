<script lang="ts">
	type Props = {
		label: string;
		description?: string;
		checked?: boolean;
		disabled?: boolean;
	};

	let { label, description, checked = $bindable(false), disabled = false }: Props = $props();
</script>

<label class="switch {disabled ? 'disabled' : ''}">
	<span class="text">
		<span class="label">{label}</span>
		{#if description}
			<span class="description">{description}</span>
		{/if}
	</span>
	<input type="checkbox" bind:checked {disabled} />
	<span class="track" aria-hidden="true">
		<span class="thumb"></span>
	</span>
</label>

