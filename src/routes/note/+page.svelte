<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Time from 'svelte-time/src/Time.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { onMount } from 'svelte';
	import { findNote, deleteNote, editNote, downloadNote, pinNote, unpinNote } from '$lib';
	import Prose from '$lib/prose.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Pin, Trash2, Download, SquarePen } from 'lucide-svelte';
	import Toggle from '$lib/components/ui/toggle/toggle.svelte';

	let id: string, note: any;
	let pinned = false;

	onMount(() => {
		if ($page.url.searchParams.get('id')) {
			id = $page.url.searchParams.get('id');
			note = findNote(id);
			console.log(note);
			pinned = note.pinned;
		} else {
			goto('/notes');
		}
		if (!note) {
			goto('/notes');
		}
	});

	function edit() {
		editNote(id);
	}

	function del() {
		deleteNote(note.id);
		goto('/notes');
	}

	function download() {
		downloadNote(id);
	}

	function pin() {
		if (pinned) {
			pinNote(id);
		} else {
			unpinNote(id);
		}
	}

	$: pinned, pin();
</script>

<svelte:head>
	{#if note}
		<title>{note.title}</title>
	{/if}
</svelte:head>

<div class="h-5"></div>

<Prose>
	{#if note}
		<h1>{note.title}</h1>
		<span class="font-mono text-neutral-500">
			<Time timestamp={note.date} />
			<Button on:click={del} variant="link" size="icon"><Trash2 class="h-4 w-4" /></Button>
			<Button on:click={edit} variant="link" size="icon"><SquarePen class="h-4 w-4" /></Button>
			<Button on:click={download} variant="link" size="icon"><Download class="h-4 w-4" /></Button>
			<Toggle bind:pressed={pinned}><Pin class="h-4 w-4" /></Toggle>
		</span>

		<SvelteMarkdown source={note.content} />
	{/if}
</Prose>
