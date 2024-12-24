<script lang="ts">
	import type { PhrasingContent } from 'mdast';

	import PhrasingContentComponent from './PhrasingContent.svelte';

	interface NodeWithPhasingContent {
		children: PhrasingContent[];
	}

	interface Props {
		node: NodeWithPhasingContent;
	}

	let props: Props = $props();
	let node = $derived(props.node);
</script>

{#each node.children as child}
	<PhrasingContentComponent node={child} />
{/each}
