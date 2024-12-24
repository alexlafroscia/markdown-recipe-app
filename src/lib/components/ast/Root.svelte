<script lang="ts">
	import type { Root } from 'mdast';

	import Content from './Content.svelte';

	interface Props {
		node: Root;
	}

	let props: Props = $props();
	let node = $derived(props.node);
</script>

{#each node.children as child}
	<Content node={child} />
{/each}
