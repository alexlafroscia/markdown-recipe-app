<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PhrasingContent, PhrasingContentMap } from 'mdast';

	import PhrasingContentParent from './PhrasingContentParent.svelte';

	type PhrasingContentRendererMap = {
		[type in keyof PhrasingContentMap]: Snippet<[PhrasingContentMap[type]]>;
	};

	const TYPE_MAP: Partial<PhrasingContentRendererMap> = {
		emphasis,
		text,
		strong,
	};

	interface NodeWithPhasingContent {
		children: PhrasingContent[];
	}

	interface Props {
		node: NodeWithPhasingContent;
	}

	let props: Props = $props();
	let node = $derived(props.node);
</script>

{#snippet emphasis(node: PhrasingContentMap['emphasis'])}
	<i><PhrasingContentParent {node} /></i>
{/snippet}

{#snippet strong(node: PhrasingContentMap['strong'])}
	<b><PhrasingContentParent {node} /></b>
{/snippet}

{#snippet text(node: PhrasingContentMap['text'])}
	{node.value}
{/snippet}

{#each node.children as child}
	<!-- Ignore `as never`; this works but the following line does not type-check -->
	{@render TYPE_MAP[child.type]?.(child as never)}
{/each}
