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

