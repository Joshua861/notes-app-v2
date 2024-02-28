<script lang="ts">
	import { updateNote, viewNote } from '$lib';
	import { v4 as uuid } from 'uuid';
	import Prose from '$lib/prose.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let title: string = '',
		content: string = '',
		id = uuid();

	$: [content, title], updateNote(id, title, content);

	function done() {
		viewNote(id);
	}
</script>

<svelte:head>
	<title>Create note</title>
</svelte:head>

<Prose class="h-[100svh] w-[100svw]">
	<div class="h-5"></div>
	<h1>Create note</h1>
	<div class="flex gap-3">
		<Input bind:value={title} type="text" placeholder="title" class="flex-1" />
		<Button on:click={done}>Done</Button>
	</div>
	<Textarea placeholder="content" class="mt-3 h-[70svh] w-full font-mono" bind:value={content} />
</Prose>
