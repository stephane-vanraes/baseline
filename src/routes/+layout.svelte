<script lang="ts">
	import '$lib/styles/app.css';
	import favicon from '$lib/assets/logo.svg';
	import Header from '$lib/components/Header.svelte';
	import { dev } from '$app/environment';
	import Footer from '$lib/components/Footer.svelte';
	import Toast from '$lib/components/Toast/Toast.svelte';
	import { onMount } from 'svelte';
	import preferences from '$lib/stores/preferences.svelte';

	let { children } = $props();

	$effect(() => {
		document.documentElement.dataset.theme = preferences.darkMode.current ? 'dark' : 'light';
	});

	onMount(() => {
		if (dev) return;
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="manifest" href="/manifest.webmanifest" />
	<meta name="theme-color" content="#7aa2f7" />
	<title>Baseline</title>
</svelte:head>

<Header />

<main>
	{@render children()}
</main>

<Footer />
<Toast />
