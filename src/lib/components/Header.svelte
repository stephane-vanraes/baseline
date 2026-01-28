<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<header>
	<div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 64 64"
			height="1em"
			width="1em"
			aria-hidden="true"
		>
			<rect width="64" height="64" rx="14" />
			<path
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="4"
				d="M10 40h44M14 36c8-8 16-2 24-10 6-6 11-4 14-8"
			/>
			<circle cx="45" cy="40" r="6" /></svg
		>
		<h1>Baseline</h1>
	</div>
	<nav>
		<a href={resolve('/')} aria-current={page.route.id == '/' ? 'page' : undefined}> Home </a>
		<a
			href={resolve('/programs')}
			aria-current={page.route.id?.startsWith('/programs') ? 'page' : undefined}
		>
			Programs
		</a>
		<a
			href={resolve('/exercises')}
			aria-current={page.route.id?.startsWith('/exercises') ? 'page' : undefined}
		>
			Exercises
		</a>
		<a
			href={resolve('/profile')}
			aria-current={page.route.id?.startsWith('/profile') ? 'page' : undefined}>Profile</a
		>
		<a href={resolve('/settings')} aria-current={page.route.id == '/settings' ? 'page' : undefined}>
			Settings
		</a>
	</nav>
</header>

<style>
	header {
		background-color: var(--color-accent);
		color: var(--color-accent-text);
		letter-spacing: 0.08em;
	}

	h1 {
		text-decoration: none;
	}
	div {
		align-items: center;
		display: flex;
		font-weight: 600;
		gap: 1ch;
		padding: var(--gap);
	}

	svg {
		font-size: 1.5rem;
		rect {
			fill: var(--color-background);
		}
		path {
			stroke: var(--color-accent);
		}
		circle {
			fill: var(--color-accent);
		}
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		font-size: 0.875rem;
		text-transform: uppercase;
	}

	a {
		padding: var(--gap-sm) var(--gap);
	}

	[aria-current~='page'] {
		background-color: var(--color-background);
		color: var(--color-text);
	}

	:global(:root[data-theme='dark']) {
		header {
			background-color: var(--color-surface);
			border-block-end: 1px solid var(--color-surface-border);
			color: var(--color-text);
		}
		[aria-current~='page'] {
			background-color: var(--color-accent);
			color: var(--color-accent-text);
		}
	}
</style>
