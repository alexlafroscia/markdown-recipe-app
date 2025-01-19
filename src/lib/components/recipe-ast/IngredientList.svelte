<script lang="ts">
	import type { List } from 'vault/mdast';

	import type { IngredientStateMap } from '$lib/ingredients';
	import IngredientListItem from './IngredientListItem.svelte';

	interface Props {
		node: List;
		checkedState?: IngredientStateMap;
	}

	let { node, checkedState }: Props = $props();
</script>

<ul class="list-none ps-0">
	{#each node.children as child}
		<li>
			<IngredientListItem
				node={child}
				update={(checked) => {
					const id = child.data!.ingredientId!;

					checkedState?.set(id, checked);
				}}
			/>
		</li>
	{/each}
</ul>
