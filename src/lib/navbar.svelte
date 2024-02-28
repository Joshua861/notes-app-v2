<script>
	import { page } from '$app/stores';

	$: activeUrl = $page.url.pathname;

	let links = [
		{
			title: 'Notes',
			path: '/notes'
		},
		{
			title: 'Create',
			path: '/create'
		},
		{
			title: 'About',
			path: '/about'
		}
	];
</script>

<nav class="m-5 flex gap-5">
	{#each links as link}
		<a
			class="{link.path === activeUrl
				? 'text-neutral-200 hover:text-neutral-100'
				: 'text-neutral-500'} inline no-underline transition-all hover:text-neutral-300"
			href={link.path}>{link.title}</a
		>
	{/each}
</nav>
