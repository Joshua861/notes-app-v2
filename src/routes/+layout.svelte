<script>
	import '../app.pcss';
	import Navbar from '$lib/navbar.svelte';
	import { onLoad } from '$lib';
	import { onMount } from 'svelte';

	onMount(() => {
		onLoad();
	});
</script>

<Navbar />
<slot />
