<script lang="ts">
	import Prose from '$lib/prose.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import copy from 'copy-text-to-clipboard';
	import { toast } from 'svelte-sonner';
	import { getNotesData, loadNoteData } from '$lib';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { goto } from '$app/navigation';

	let textboxContent: string;

	function copyData() {
		if (copy(getNotesData())) {
			toast.success('Copied!');
		} else {
			toast.error('An error occurred!');
		}
	}

	async function loadData() {
		loadNoteData(textboxContent);
		toast.success('Loaded notes!', {
			description:
				"Probably; if they don't show up or something weird happened, the data you put in isn't valid."
		});
		goto('/notes');
	}
</script>

<svelte:head>
	<title>Transfer</title>
</svelte:head>

<Prose>
	<h1>Transfer data</h1>

	<p>
		This lets you move all your notes from one device to the other. When you press the copy data
		button, it copies all the data from all your notes to the clipboard, send that data to another
		device, and, on there, paste the data in the text box below and press the load date button, all
		your notes will show up on that device.
	</p>

	<div class="flex gap-3 [&>*]:flex-1">
		<Button on:click={copyData}>Copy Data</Button>
		<Button on:click={loadData}>Load Data</Button>
	</div>

	<Textarea
		class="mt-3 h-32 font-mono"
		bind:value={textboxContent}
		placeholder="Put your note data here for loading."
	/>
</Prose>
