<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as prettier from 'prettier/standalone';
	import prettierPluginHTML from 'prettier/plugins/html';

	let { children }: { children: Snippet } = $props();

	let rendered = $state<HTMLDivElement>();

	let printedAndFormatted = $derived.by(async () => {
		let content = rendered?.innerHTML ?? '';

		content = content.replaceAll('<!---->', '');

		const formatted = await prettier.format(content, {
			parser: 'html',
			plugins: [prettierPluginHTML],
		});

		return formatted;
	});
</script>

<div class="wrapper">
	<div bind:this={rendered} class="rendered">
		{@render children()}
	</div>

	<div class="printed">
		{#await printedAndFormatted then printed}
			{printed}
		{/await}
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em;

		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.printed {
		background: var(--flexoki-black);
		color: var(--flexoki-paper);
		padding: 0.5em;
	}
</style>
