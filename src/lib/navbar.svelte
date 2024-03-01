<script lang="ts">
	import { page } from '$app/stores';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

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
		},
		{
			title: 'Settings',
			path: '/settings'
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
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<button class="inline text-neutral-500 no-underline transition-all hover:text-neutral-300"
				>Tools</button
			>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					<a href="/tools/transfer"> Transfer data </a>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a href="/tools/feedback"> Send feedback </a>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</nav>
