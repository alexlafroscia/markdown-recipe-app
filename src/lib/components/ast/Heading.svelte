<script lang="ts" module>
	import type { Heading, Content } from 'mdast';

	export function isHeading(node: Content): node is Heading {
		return node.type === 'heading';
	}
</script>

<script lang="ts">
	import PhrasingContentParent from './PhrasingContentParent.svelte';

	interface Props {
		node: Heading;
	}

	let props: Props = $props();
	let node = $derived(props.node);

	let headingElement = $derived(`h${node.depth}`);
</script>

<svelte:element this={headingElement}>
	<PhrasingContentParent {node} />
</svelte:element>
