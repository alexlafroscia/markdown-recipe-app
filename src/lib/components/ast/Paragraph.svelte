<script lang="ts" module>
	import type { Paragraph, Node } from 'mdast';

	export function isParagraph(node: Node): node is Paragraph {
		return node.type === 'paragraph';
	}
</script>

<script lang="ts">
	import PhrasingContentParent from './PhrasingContentParent.svelte';

	interface Props {
		node: Paragraph;
	}

	let props: Props = $props();
	let node = $derived(props.node);

	let tagName = $derived(node.data?.hName ?? 'p');
	let isCalloutTitle = $derived(node.data?.hProperties?.dataCalloutTitle ?? false);
</script>

<svelte:element this={tagName} class:callout-title={isCalloutTitle}>
	<PhrasingContentParent {node} />
</svelte:element>

<style>
	.callout-title {
		color: rgb(var(--callout-color));
		font-weight: bold;
	}
</style>
