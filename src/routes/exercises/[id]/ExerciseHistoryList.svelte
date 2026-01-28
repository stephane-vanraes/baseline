<script lang="ts">
	import type { ExerciseEntry, ExerciseType } from '$lib/db/types';
	import { formatDateYMD } from '$lib/utils/date';
	import { getSuffix } from '$lib/utils/exercise';

	const { entries = [], type }: { entries: ExerciseEntry[]; type: ExerciseType } = $props();
</script>

<h2>History</h2>
{#if entries.length === 0}
	<p>No entries yet.</p>
{:else}
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Value ({getSuffix(type)})</th>
				<th>RPE</th>
			</tr>
		</thead>
		<tbody>
			{#each entries as entry (entry.id ?? entry.createdAt)}
				<tr>
					<td>{formatDateYMD(entry.createdAt)}</td>
					<td>{entry.value} </td>
					<td>{entry.rpe}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

