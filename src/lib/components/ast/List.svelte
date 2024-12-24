<script lang="ts" module>
	import type { List, Content } from 'mdast';

	export function isList(node: Content): node is List {
		return node.type === 'list';
	}
</script>

<script lang="ts">
	import ListItem from './ListItem.svelte';

	interface Props {
		node: List;
	}

	let props: Props = $props();
	let node = $derived(props.node);
</script>

<svelte:element this={node.ordered ? 'ol' : 'ul'}>
	{#each node.children as child}
		<li>
			<ListItem node={child} />
		</li>
	{/each}
</svelte:element>
