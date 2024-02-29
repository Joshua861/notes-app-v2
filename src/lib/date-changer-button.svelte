<script lang="ts">
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import * as Popover from '$lib/components/ui/popover';
	import { CalendarDays } from 'lucide-svelte';
	import Button from './components/ui/button/button.svelte';
	import { replaceNote, findNote, type NoteType } from '$lib';

	let value: DateValue | undefined = undefined;
	export let noteID: string;

	let note = findNote(noteID);

	$: setDate(value);

	function setDate(date: any) {
		if (date == undefined || note == undefined) {
			return;
		}

		let formattedDate: number = value?.toDate().getTime();
		let newNote: NoteType = note;
		newNote.date = formattedDate;

		replaceNote(note.id, newNote);
		location.reload();
	}
</script>

<Popover.Root>
	<Popover.Trigger>
		<Button variant="link" size="icon"><CalendarDays class="h-4 w-4" /></Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar bind:value initialFocus />
	</Popover.Content>
</Popover.Root>
