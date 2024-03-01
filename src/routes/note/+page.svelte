<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Time from 'svelte-time/src/Time.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { onMount } from 'svelte';
	import { findNote, editNote, downloadNote, pinNote, unpinNote } from '$lib';
	import Prose from '$lib/prose.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Pin, Download, SquarePen } from 'lucide-svelte';
	import Toggle from '$lib/components/ui/toggle/toggle.svelte';
	import DeleteButton from '$lib/delete-button.svelte';
	import DateChangerButton from '$lib/date-changer-button.svelte';

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

	function changeDate() {}

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
			<Time timestamp={note.date} format="DD/MM" />
			<DeleteButton noteID={id} />
			<Button on:click={edit} variant="link" size="icon"><SquarePen class="h-4 w-4" /></Button>
			<DateChangerButton noteID={id} />
			<Button on:click={download} variant="link" size="icon"><Download class="h-4 w-4" /></Button>
			<Toggle bind:pressed={pinned}><Pin class="h-4 w-4" /></Toggle>
		</span>

		<SvelteMarkdown source={note.content} />
	{/if}
</Prose>
