<script lang="ts">
	type Props = {
		submitLabel: string;
		cancelHref: string;
		cancelLabel?: string;
	};

	const { submitLabel, cancelHref, cancelLabel = 'Cancel' }: Props = $props();
</script>

<div class="actions">
	<button class="button" type="submit">{submitLabel}</button>
	<a href={cancelHref} class="button danger">{cancelLabel}</a>
</div>

