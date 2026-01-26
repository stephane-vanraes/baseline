<script lang="ts">
	import { resolve } from '$app/paths';
	import logoFilled from '$lib/assets/logo-filled.svg?raw';
</script>

<header>
	<div>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html logoFilled}
		<h1>Baseline</h1>
	</div>
	<nav>
		<a href={resolve('/')}>Home</a>
		<a href={resolve('/programs')}>Programs</a>
		<a href={resolve('/exercises')}>Exercises</a>
		<a href={resolve('/profile')}>Profile</a>
	</nav>
</header>

<style>
	header {
		background: var(--color-surface);
		border-block-end: 1px solid var(--color-accent);
		box-shadow: var(--shadow);
		padding: 1rem 1.5rem;
		margin-inline: auto;
		max-inline-size: 96ch;
	}

	div {
		align-items: center;
		display: flex;
		font-size: 1.25rem;
		gap: 1ch;
		letter-spacing: 0.02em;
		text-transform: uppercase;

		> h1 {
			margin-inline-end: auto;
			text-decoration: none;
		}
	}

	:global(svg) {
		width: 28px;
		height: 28px;
		color: var(--color-accent);
	}

	nav {
		align-items: center;
		color: var(--color-accent);
		display: flex;
		flex-wrap: wrap;
		font-size: 0.75rem;
		gap: 1ch;
		letter-spacing: 0.12em;
		margin-top: 0.5rem;
		text-transform: uppercase;
	}
</style>
