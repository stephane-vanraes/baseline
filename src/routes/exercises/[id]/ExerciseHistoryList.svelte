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

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
	}

	thead th {
		text-align: left;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.7;
		padding: 0 0.5rem 0.8rem;

		&:not(:first-child) {
			text-align: center;
		}
	}

	tbody tr {
		border-radius: 0.75rem;
		border: 1px solid var(--color-accent-soft);
		background: var(--color-surface);
	}

	tbody td {
		padding: 0.65rem 0.8rem;
		color: var(--color-text);
		border-top: 1px solid var(--color-accent-soft);

		&:not(:first-child) {
			font-weight: 600;
			text-align: center;
		}
	}

	tbody tr:first-child td {
		border-top: none;
	}
</style>
