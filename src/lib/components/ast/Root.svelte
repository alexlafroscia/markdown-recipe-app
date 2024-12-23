<script lang="ts">
	import type { Root } from 'mdast';

	import Heading, { isHeading } from './Heading.svelte';
	import Paragraph, { isParagraph } from './Paragraph.svelte';

	interface Props {
		node: Root;
	}

	let props: Props = $props();
	let node = $derived(props.node);
</script>

{@debug node}

{#each node.children as child}
	{#if isHeading(child)}
		<Heading node={child} />
	{:else if isParagraph(child)}
		<Paragraph node={child} />
	{/if}
{/each}
