<script lang="ts" module>
	import type { ThematicBreak, Content } from 'mdast';

	export function isThematicBreak(node: Content): node is ThematicBreak {
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
