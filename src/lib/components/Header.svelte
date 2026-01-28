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
		<a href={resolve('/settings')}>Settings</a>
	</nav>
</header>

