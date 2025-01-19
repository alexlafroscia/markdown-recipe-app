<script lang="ts">
	import type { Snippet } from 'svelte';
	import { task, timeout } from '@sheepdog/svelte';

	interface Props {
		children: Snippet;
		onclose: () => void;
	}

	let { children, onclose }: Props = $props();

	function tryFullscreen(element: HTMLElement) {
		requestFullscreen.perform(element);
	}

	const requestFullscreen = task.restart(async function tryFullscreen(element: HTMLElement) {
		await element.requestFullscreen();

		// Wait to start listening for events
		await timeout(1_000);

		await new Promise<void>((resolve) => {
			document.addEventListener('fullscreenchange', () => {
				resolve();
			});
		});

		onclose();
	});
</script>

<div class="bg-paper" use:tryFullscreen>
	{@render children()}
</div>
