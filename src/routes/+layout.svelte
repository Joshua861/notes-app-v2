<script>
	import '../app.pcss';
	import Navbar from '$lib/navbar.svelte';
	import { onLoad } from '$lib';
	import { beforeUpdate } from 'svelte';

	beforeUpdate(() => {
		onLoad();
	});
</script>

<Navbar />
<slot />
