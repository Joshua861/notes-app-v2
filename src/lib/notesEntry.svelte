<script lang="ts">
	import Time from 'svelte-time/src/Time.svelte';
	export let note: import('$lib').NoteType;
	import { Pin } from 'lucide-svelte';
</script>

<div class="m-0">
	{#if note.pinned}
		<Pin class="m-0 inline h-[1.25rem] w-[1.25rem] align-middle" />
	{/if}
	<a class="text-xl font-bold underline-offset-4" href="/note?id={note.id}">{note.title}</a>
	<br />
	<span class="font-mono text-neutral-500">
		<Time timestamp={note.time} />
	</span>
</div>
