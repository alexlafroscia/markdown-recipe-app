<script lang="ts" module>
	import type { Paragraph, Content } from 'mdast';

	export function isParagraph(node: Content): node is Paragraph {
		return node.type === 'paragraph';
	}
</script>

<script lang="ts">
	import PhrasingContentParent from './PhrasingContentParent.svelte';

	interface Props {
		node: Paragraph;
	}

	let props: Props = $props();
	let node = $derived(props.node);
</script>

<p>
	<PhrasingContentParent {node} />
</p>
