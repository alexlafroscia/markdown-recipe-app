<script lang="ts" module>
	import type { Blockquote, Node } from 'vault/mdast';

	export function isBlockquote(node: Node): node is Blockquote {
		return node.type === 'blockquote';
	}
</script>

<script lang="ts">
	import BlockContent, { isBlockContent } from './BlockContent.svelte';

	interface Props {
		node: Blockquote;
	}

	let { node }: Props = $props();

	let tagName = $derived(node.data?.hName ?? 'blockquote');
	let isCallout = $derived(node.data?.hProperties?.dataCallout ?? false);
	let calloutType = $derived(node.data?.hProperties?.dataCalloutType ?? '');
	let isOpen = $derived(node.data?.hProperties?.open ?? true);
</script>

{#snippet renderChildren()}
	{#each node.children as child}
		{#if isBlockContent(child)}
			<BlockContent node={child} />
		{/if}
	{/each}
{/snippet}

{#if tagName === 'details'}
	<details class:callout={isCallout} class={calloutType} open={isOpen}>
		{@render renderChildren()}
	</details>
{:else}
	<svelte:element this={tagName} class:callout={isCallout} class={calloutType}>
		{@render renderChildren()}
	</svelte:element>
{/if}

<style>
	.callout {
		--callout-color: var(--flexoki-blue-600);
		--callout-color-bg: var(--flexoki-blue-50);

		mix-blend-mode: darken;
		background-color: var(--callout-color-bg);
		color: var(--callout-color);

		padding: 0.75em 1.5em;
		margin-bottom: 1em;
	}

	.callout.bug,
	.callout.error,
	.callout.fail {
		--callout-color: var(--flexoki-red-600);
		--callout-color-bg: var(--flexoki-red-50);
	}

	.callout.warning,
	.callout.question {
		--callout-color: var(--flexoki-orange-600);
		--callout-color-bg: var(--flexoki-orange-50);
	}

	.callout.success {
		--callout-color: var(--flexoki-green-600);
		--callout-color-bg: var(--flexoki-green-50);
	}

	.callout.important,
	.callout.summary,
	.callout.tip,
	.callout.tldr {
		--callout-color: var(--flexoki-cyan-600);
		--callout-color-bg: var(--flexoki-cyan-50);
	}

	.callout.info,
	.callout.todo {
		--callout-color: var(--flexoki-blue-600);
		--callout-color-bg: var(--flexoki-blue-50);
	}

	.callout.example {
		--callout-color: var(--flexoki-purple-600);
		--callout-color-bg: var(--flexoki-purple-50);
	}
</style>
