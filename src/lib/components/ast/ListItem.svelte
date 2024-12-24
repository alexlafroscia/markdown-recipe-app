<script lang="ts" module>
	import type { ListItem, Content } from 'mdast';

	export function isListItem(node: Content): node is ListItem {
		return node.type === 'listItem';
	}
</script>

<script lang="ts">
	import BlockContent, { isBlockContent } from './BlockContent.svelte';

	interface Props {
		node: ListItem;
	}

	let props: Props = $props();
	let node = $derived(props.node);
</script>

{#each node.children as child}
	{#if isBlockContent(child)}
		<BlockContent node={child} />
	{/if}
{/each}
