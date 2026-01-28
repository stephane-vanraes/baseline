<script lang="ts">
	type Props = {
		label: string;
		checked?: boolean;
		disabled?: boolean;
	};

	let { label, checked = $bindable(false), disabled = false }: Props = $props();
</script>

<label class:disabled>
	<input type="checkbox" bind:checked {disabled} />
	<span aria-hidden="true">
		<span></span>
	</span>
	<span>{label}</span>
</label>

<style>
	label {
		align-items: center;
		display: inline-flex;
		gap: var(--gap);
	}

	label > span:last-child {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	label > span:first-of-type {
		align-items: center;
		background: var(--color-surface);
		border: 1px solid hsl(from var(--color-accent) h s calc(l * 0.7));
		border-radius: 999px;
		display: inline-flex;
		block-size: 1.5rem;
		inline-size: 2.75rem;
		padding: 0.2rem;
		transition:
			background-color 150ms ease,
			border-color 150ms ease;

		> span {
			background: var(--color-text);
			border-radius: 999px;
			block-size: 1.1rem;
			inline-size: 1.1rem;
			transform: translateX(0);
			transition:
				transform 150ms ease,
				background-color 150ms ease;
		}
	}

	input:checked + span {
		background: var(--color-accent);
		border-color: var(--color-accent);
	}

	input:checked + span > span {
		background: var(--color-surface);
		transform: translateX(1.2rem);
	}

	.disabled {
		opacity: 0.6;
		pointer-events: none;
	}
</style>
