<script lang="ts">
	import type { BodyStatsEntry } from '$lib/db/types';
	import { formatDateYMD } from '$lib/utils/date';

	const { entries = [] }: { entries: BodyStatsEntry[] } = $props();
</script>

<h2>History</h2>
{#if entries.length === 0}
	<p>No entries yet.</p>
{:else}
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Weight (kg)</th>
				<th>Waist (cm)</th>
			</tr>
		</thead>
		<tbody>
			{#each entries as entry, index (entry.id ?? entry.createdAt)}
				{@const next = entries[index + 1]}
				<tr>
					<td>{formatDateYMD(entry.createdAt)}</td>
					<td>{entry.weight} </td>
					<td>{entry.waist} </td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

