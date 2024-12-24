<script lang="ts" module>
	import type { BlockContent, Content } from 'mdast';

	import Heading, { isHeading } from './Heading.svelte';
	import List, { isList } from './List.svelte';
	import Paragraph, { isParagraph } from './Paragraph.svelte';
	import ThematicBreak, { isThematicBreak } from './ThematicBreak.svelte';

	export function isBlockContent(node: Content): node is BlockContent {
		return isHeading(node) || isList(node) || isParagraph(node) || isThematicBreak(node);
	}
</script>

<script lang="ts">
	interface Props {
		node: BlockContent;
	}

	let props: Props = $props();
	let node = $derived(props.node);
</script>

{#if isHeading(node)}
	<Heading {node} />
{:else if isList(node)}
	<List {node} />
{:else if isParagraph(node)}
	<Paragraph {node} />
{:else if isThematicBreak(node)}
	<ThematicBreak {node} />
{/if}
