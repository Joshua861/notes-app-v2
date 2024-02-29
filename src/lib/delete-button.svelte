<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { mediaQuery } from 'svelte-legos';
	import Button from './components/ui/button/button.svelte';
	import { deleteNote } from '$lib';
	import { Trash2 } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	const isDesktop = mediaQuery('(min-width: 768px)');
	let open = false;

	export let noteID: string;

	function del() {
		deleteNote(noteID);
		goto('/notes');
	}

	function close() {
		open = false;
	}
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Trigger>
			<Button variant="link" size="icon"><Trash2 class="h-4 w-4" /></Button>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Are you sure you want to delete this note?</Dialog.Title>
				<Dialog.Description>It's permanent, y'know?</Dialog.Description>
			</Dialog.Header>
			<div class="flex gap-3 [&>*]:flex-1">
				<Button on:click={del} variant="destructive">Delete</Button>
				<Button on:click={close} variant="secondary">Cancel</Button>
			</div>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger>
			<Button variant="link" size="icon"><Trash2 class="h-4 w-4" /></Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Are you sure you want to delete this note?</Drawer.Title>
				<Drawer.Description>It's permanent, y'know?</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Button on:click={del} variant="destructive">Delete</Button>
				<Button on:click={close} variant="secondary">Cancel</Button>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
