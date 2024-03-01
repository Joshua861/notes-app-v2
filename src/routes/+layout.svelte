<script>
	import '../app.pcss';
	import Navbar from '$lib/navbar.svelte';
	import { onLoad } from '$lib';
	import { beforeUpdate, onMount } from 'svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Loader } from 'lucide-svelte';
	import { ModeWatcher } from 'mode-watcher';

	let mounted = false;

	beforeUpdate(() => {
		onLoad();
	});

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content="#111213" />
</svelte:head>

{#if !mounted}
	<div class="absolute z-10 m-0 flex h-screen w-screen items-center justify-center bg-zinc-950">
		<div class="flex items-center justify-center space-x-1 text-sm text-gray-400">
			<Loader class="animate-spin" size="48" />
		</div>
	</div>
{/if}

<Navbar />

<slot />

<Toaster position="bottom-center" richColors theme="dark" />
<ModeWatcher />
