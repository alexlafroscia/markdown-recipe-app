<script lang="ts">
	import type { Root } from 'mdast';

	import RootContent from './RootContent.svelte';

	interface Props {
		node: Root;
	}

	let props: Props = $props();
	let node = $derived(props.node);
</script>

{#each node.children as child}
	<RootContent node={child} />
{/each}
