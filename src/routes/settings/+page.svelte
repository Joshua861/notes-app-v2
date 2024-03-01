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

	<div class="flex flex-col gap-3 [&>*]:w-full [&>*]:flex-1">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button class="w-full flex-1">Change theme</Button>
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
				<Button class="w-full flex-1">Change main font</Button>
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
				<Button class="w-full flex-1">Change title font</Button>
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
				<Button class="w-full flex-1">Change mono font</Button>
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

	<h2>Fonts</h2>

	<div class="flex flex-col gap-5">
		<h1 class="fade-text m-0 max-w-full overflow-hidden whitespace-nowrap text-6xl">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto nesciunt quia assumenda vitae
			sint voluptatem porro expedita atque iste laborum, sit quis amet velit ut. Inventore
			aspernatur necessitatibus sint ea consequatur placeat quis. Corporis culpa asperiores
			voluptate, deserunt excepturi maiores temporibus? Veniam eius quisquam maiores delectus magni
			necessitatibus ipsa nam!
		</h1>
		<p class="fade-text m-0 max-w-full overflow-hidden whitespace-nowrap text-6xl">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto nesciunt quia assumenda vitae
			sint voluptatem porro expedita atque iste laborum, sit quis amet velit ut. Inventore
			aspernatur necessitatibus sint ea consequatur placeat quis. Corporis culpa asperiores
			voluptate, deserunt excepturi maiores temporibus? Veniam eius quisquam maiores delectus magni
			necessitatibus ipsa nam!
		</p>
		<code class="fade-text m-0 max-w-full overflow-hidden whitespace-nowrap text-6xl"
			>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto nesciunt quia assumenda vitae
			sint voluptatem porro expedita atque iste laborum, sit quis amet velit ut. Inventore
			aspernatur necessitatibus sint ea consequatur placeat quis. Corporis culpa asperiores
			voluptate, deserunt excepturi maiores temporibus? Veniam eius quisquam maiores delectus magni
			necessitatibus ipsa nam!</code
		>
	</div>
</Prose>

<style>
	.fade-text {
		position: relative;
		display: inline-block;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		-moz-background-clip: text;
		-moz-text-fill-color: transparent;
		/* ;	background: linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%) */
		background-size: 100%;
		background-repeat: repeat;
		/* Create the gradient. */
		background-image: linear-gradient(to right, #0000, #fff, #fff, #fff, #fff, #0000);
	}
</style>
