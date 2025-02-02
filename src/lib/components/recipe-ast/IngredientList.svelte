<script lang="ts">
	import type { List } from 'vault/mdast';

	import type { IngredientStateMap } from '$lib/ingredients';
	import IngredientListItem from './IngredientListItem.svelte';

	interface Props {
		node: List;
		checkedState: IngredientStateMap;
	}

	let { node, checkedState }: Props = $props();
</script>

<ul class="list-none ps-0">
	{#each node.children as child}
		{@const id = child.data?.ingredientId}
		<li>
			<IngredientListItem
				node={child}
				bind:checked={
					() => checkedState.get(id!)!,
					(value) => {
						checkedState.set(id!, value);
					}
				}
			/>
		</li>
	{/each}
</ul>
