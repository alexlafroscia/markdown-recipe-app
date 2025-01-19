<script lang="ts">
	import type { ListItem } from 'vault/mdast';
	import BlockContent, { isBlockContent } from '../ast/BlockContent.svelte';

	interface Props {
		node: ListItem;
		update?: (checked: boolean) => void;
	}

	let { node, update }: Props = $props();

	let checked = $state(false);
	let id = crypto.randomUUID();
</script>

<div class="flex items-center gap-2" class:line-through={checked}>
	<input
		{id}
		type="checkbox"
		bind:checked
		onclick={() => {
			update?.(!checked);
		}}
	/>

	<label for={id}>
		{#each node.children as child}
			{#if isBlockContent(child)}
				<BlockContent node={child} />
			{/if}
		{/each}
	</label>
</div>
