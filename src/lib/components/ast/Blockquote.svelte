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
		/* Obsidian Variable Configuration */
		--callout-bug: var(--color-red-rgb);
		--callout-default: var(--color-blue-rgb);
		--callout-error: var(--color-red-rgb);
		--callout-example: var(--color-purple-rgb);
		--callout-fail: var(--color-red-rgb);
		--callout-important: var(--color-cyan-rgb);
		--callout-info: var(--color-blue-rgb);
		--callout-question: var(--color-orange-rgb);
		--callout-success: var(--color-green-rgb);
		--callout-summary: var(--color-cyan-rgb);
		--callout-tip: var(--color-cyan-rgb);
		--callout-todo: var(--color-blue-rgb);
		--callout-warning: var(--color-orange-rgb);

		--callout-color: var(--callout-default);
		--callout-blend-mode: darken;

		mix-blend-mode: var(--callout-blend-mode);
		background-color: rgba(var(--callout-color), 0.1);

		padding: 0.75em 1.5em;
		margin-bottom: 1em;
	}

	.callout.warning {
		--callout-color: var(--callout-warning);
	}
</style>
