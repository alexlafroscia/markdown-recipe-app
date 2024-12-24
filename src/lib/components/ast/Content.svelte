<script lang="ts">
	import type { Content } from 'mdast';

	import BlockContent, { isBlockContent } from './BlockContent.svelte';
	import ListItem, { isListItem } from './ListItem.svelte';
	import PhrasingContent, { isPhrasingContent } from './PhrasingContent.svelte';

	interface Props {
		node: Content;
	}

	let props: Props = $props();
	let node = $derived(props.node);
</script>

{#if isBlockContent(node)}
	<BlockContent {node} />
{:else if isListItem(node)}
	<ListItem {node} />
{:else if isPhrasingContent(node)}
	<PhrasingContent {node} />
{/if}
