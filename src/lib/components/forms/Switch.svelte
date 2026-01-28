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

<style>
	.switch {
		align-items: center;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.text {
		display: grid;
		gap: 0.2rem;
	}

	.label {
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.description {
		color: var(--color-text-muted);
		font-size: 0.8rem;
	}

	input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.track {
		align-items: center;
		background: var(--color-accent-soft);
		border-radius: 999px;
		display: inline-flex;
		block-size: 1.6rem;
		inline-size: 2.8rem;
		padding: 0.2rem;
		transition: background-color 150ms ease;
	}

	.thumb {
		background: var(--color-surface);
		border-radius: 999px;
		box-shadow: 0 2px 8px rgba(31, 41, 55, 0.2);
		block-size: 1.2rem;
		inline-size: 1.2rem;
		transform: translateX(0);
		transition: transform 150ms ease;
	}

	input:checked + .track {
		background: var(--color-accent);
	}

	input:checked + .track .thumb {
		transform: translateX(1.2rem);
	}

	.disabled {
		opacity: 0.6;
		pointer-events: none;
	}
</style>
