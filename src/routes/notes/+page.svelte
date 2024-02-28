<script lang="ts">
	import { notes } from '$lib/notes';
	import { onMount } from 'svelte';
	import { onLoad, type NoteType } from '$lib';
	import Prose from '$lib/prose.svelte';
	import { get } from 'svelte/store';
	import NotesEntry from '$lib/notesEntry.svelte';

	let loading = true;
	let notesCopy: Array<NotesType>,
		pinnedNotes: any,
		unpinnedNotes: any,
		divider: boolean = false;

	onMount(() => {
		notesCopy = get(notes);

		pinnedNotes = notesCopy.filter((note: any) => {
			return note.pinned === true;
		});
		unpinnedNotes = notesCopy.filter((note: any) => {
			return note.pinned === false;
		});
		console.log(pinnedNotes);

		divider = pinnedNotes.length !== 0 && unpinnedNotes.length !== 0;

		loading = false;
	});
</script>

<svelte:head>
	<title>Notes</title>
</svelte:head>

<div class="h-5"></div>
<Prose>
	<h1>Notes</h1>
	{#if !loading}
		{#if notesCopy.length === 0}
			<h2>No notes... yet</h2>
			<a href="/create">Create one?</a>
		{/if}
		<div class="mx-5 flex flex-col gap-5">
			{#each pinnedNotes as note}
				<NotesEntry {note} />
			{/each}
			{#if divider}
				<hr />
			{/if}
			{#each unpinnedNotes as note}
				<NotesEntry {note} />
			{/each}
		</div>
	{/if}
</Prose>
