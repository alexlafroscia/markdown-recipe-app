<script lang="ts" module>
	import type { ThematicBreak, Node } from 'mdast';

	export function isThematicBreak(node: Node): node is ThematicBreak {
		return node.type === 'thematicBreak';
	}
</script>

<script lang="ts">
	interface Props {
		node: ThematicBreak;
	}

	let props: Props = $props();
</script>

<hr />
