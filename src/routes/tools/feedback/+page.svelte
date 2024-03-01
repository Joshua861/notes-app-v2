<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { toast } from 'svelte-sonner';
	import { Loader2 } from 'lucide-svelte';

	let feedback: string = '';
	let error: boolean = false;
	let loading: boolean = false;

	let url =
		'https://discord.com/api/webhooks/1213193278627909683/tq8WIM7_twDhwtXeN_iVnKaD_0o-s3lv35dhkhxrFxvlpZRyu4J4boXw1Xw688ll0LI9';

	async function submit() {
		loading = true;
		error = false;

		if (feedback.length < 5) {
			toast.error('Feedback too short (<5 characters)');
			error = true;
		}

		let response;

		if (!error) {
			response = await fetch(url, {
				method: 'post',
				body: JSON.stringify({ content: feedback }),
				mode: 'cors',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).catch((e) => {
				console.log('ERROR: ', e);
				error = true;
				toast.error(`${e}`, {
					description:
						"If you get an error, check if you are online or try disabling browser extentions. If that dosen't work, it might be on Discord's end."
				});
			});
		}

		if (!error) {
			feedback = '';

			toast.success('Report submitted', {
				description: 'We will look it over, if it fits, it will be added to the list.'
			});
		}

		loading = false;
	}
</script>

<div class="prose prose-invert mx-auto p-5">
	<h1>Send Feedback</h1>

	<p>Have feedback? A feature idea? Please submit it here.</p>

	<div class="grid w-full gap-2">
		<Textarea bind:value={feedback} placeholder="feedback"></Textarea>
		<div class="flex">
			<Button disabled={loading} on:click={submit} class="flex-1">
				{#if loading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Submit
			</Button>
		</div>
	</div>
</div>
