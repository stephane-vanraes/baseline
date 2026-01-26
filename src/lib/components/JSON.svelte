<script lang="ts">
	const { data } = $props<{ data: unknown }>();
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
