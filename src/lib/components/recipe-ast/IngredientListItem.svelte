<script lang="ts">
	import type { ListItem } from 'vault/mdast';
	import BlockContent, { isBlockContent } from '../ast/BlockContent.svelte';

	interface Props {
		node: ListItem;
		checked: boolean;
	}

	let { node, checked = $bindable() }: Props = $props();

	let id = crypto.randomUUID();
</script>

<div class="flex items-baseline gap-2" class:line-through={checked}>
	<input {id} type="checkbox" bind:checked />

	<label for={id}>
		{#each node.children as child}
			{#if isBlockContent(child)}
				<BlockContent node={child} />
			{/if}
		{/each}
	</label>
</div>
