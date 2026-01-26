<script lang="ts">
	import Trend from '$lib/components/Trend.svelte';
	import type { ExerciseEntry, ExerciseType } from '$lib/db/types';
	import { formatDateYMD } from '$lib/utils/date';
	import { formatExercise } from '$lib/utils/exercise';

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
				<th>Value</th>
				<th>RPE</th>
			</tr>
		</thead>
		<tbody>
			{#each entries as entry, index (entry.id ?? entry.createdAt)}
				{@const next = entries[index + 1]}
				<tr>
					<td>{formatDateYMD(entry.createdAt)}</td>
					<td>
						<div>
							<strong>{formatExercise(entry.value, type)}</strong>
							<Trend current={entry.value} prev={next?.value} />
						</div>
					</td>
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
		padding: 0 0 0.5rem 0.8rem;
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

		> div {
			display: inline-flex;
			gap: 0.5rem;
			align-items: center;
		}
	}

	tbody tr:first-child td {
		border-top: none;
	}
</style>
