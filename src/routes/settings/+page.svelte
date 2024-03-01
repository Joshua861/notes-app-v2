<script lang="ts">
	import Prose from '$lib/prose.svelte';
	import { settings, applySettings, fonts, themes } from '$lib/settings';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	let settingsValue = get(settings);
	$: {
		if (mounted) {
			settings.set(settingsValue);
			applySettings();
		}
	}

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	const baseFonts = [];
	const titleFonts = [];
	const monoFonts = [];

	// Flatten the fonts object into separate arrays based on category
	for (const category in fonts) {
		for (const font in fonts[category]) {
			const fontObject = fonts[category][font];
			switch (category) {
				case 'base':
					baseFonts.push(fontObject);
					break;
				case 'title':
					titleFonts.push(fontObject);
					break;
				case 'mono':
					monoFonts.push(fontObject);
					break;
			}
		}
	}
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<Prose>
	<h1>Settings</h1>

<div class="flex flex-col gap-3 [&>*]:flex-1 [&>*]:w-full">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button class="flex-1 w-full">Change theme</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Label>Themes</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.RadioGroup bind:value={settingsValue.theme}>
				{#each Object.entries(themes) as [themeName, themeDetails]}
					<DropdownMenu.RadioItem value={themeDetails.value}>
						{themeDetails.name}
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button class="flex-1 w-full">Change main font</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Label>Fonts</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.RadioGroup bind:value={settingsValue.baseFont}>
				{#each baseFonts as font}
					<DropdownMenu.RadioItem value={font.value}>
						{font.name}
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button class="flex-1 w-full">Change title font</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Label>Fonts</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.RadioGroup bind:value={settingsValue.titleFont}>
				{#each titleFonts as font}
					<DropdownMenu.RadioItem value={font.value}>
						{font.name}
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button class="flex-1 w-full">Change mono font</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Label>Fonts</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.RadioGroup bind:value={settingsValue.monoFont}>
				{#each monoFonts as font}
					<DropdownMenu.RadioItem value={font.value}>
						{font.name}
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

	<h2>Theme showcase</h2>
	<p>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, est dolor, ipsum saepe magni
		eveniet nisi esse at <code
			>pariatur accusamus assumenda temporibus aperiam architecto facilis, delectus dignissimos</code
		> earum nesciunt libero quis aliquid eum! Architecto eveniet dignissimos impedit eos rerum itaque
		minima autem.
	</p>

	<Button>Example button</Button>
</Prose>
