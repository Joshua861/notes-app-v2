<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { NoteType } from '$lib';
	import Prose from '$lib/prose.svelte';
	import { goto } from '$app/navigation';
	import { viewNote, findNote, updateNote } from '$lib';

	let id: any, note: NoteType, title: string, content: string;

	onMount(() => {
		if ($page.url.searchParams.get('id')) {
			id = $page.url.searchParams.get('id');
			note = findNote(id);

			[title, content] = [note.title, note.content];
		} else {
			goto('/notes');
		}
		if (!note) {
			goto('/notes');
		}
	});

	function done() {
		viewNote(id);
	}

	$: [content, title], updateNote(id, title, content);
</script>

<Prose class="h-[100svh] w-[100svw]">
	<div class="h-5"></div>
	<h1>Edit Note</h1>
	<div class="flex gap-3">
		<Input bind:value={title} type="text" placeholder="title" class="flex-1" />
		<Button on:click={done}>Done</Button>
	</div>
	<Textarea placeholder="content" class="mt-3 h-[70svh] w-full font-mono" bind:value={content} />
</Prose>
