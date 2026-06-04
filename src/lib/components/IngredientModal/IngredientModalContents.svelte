<script lang="ts">
	import type { List } from 'vault/mdast';
	import { task } from '@sheepdog/svelte';
	import { toast } from 'svelte-sonner';

	import ClipboardCopyIcon from '@lucide/svelte/icons/clipboard-copy';

	import { getText } from '$lib/mdast/utils/get-text';
	import IngredientList from '$lib/components/recipe-ast/IngredientList.svelte';
	import { makeIngredientStateMap } from '$lib/ingredients';
	import { Button } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';

	interface Props {
		ingredients: List;
	}

	let { ingredients }: Props = $props();

	let numIngredients = $derived(ingredients.children.length);

	let checkedState = $derived(makeIngredientStateMap(ingredients));
	let numChecked = $derived.by(() => {
		return Array.from(checkedState.values()).reduce((acc, checked) => {
			return acc + (checked ? 1 : 0);
		}, 0);
	});

	const copyRemaining = task.restart(async function () {
		const uncheckedListItems = ingredients.children
			.filter((listItem) => {
				const id = listItem.data!.ingredientId!;

				return !checkedState.get(id);
			})
			.map((listItem) => {
				return getText(listItem);
			});
		const uncheckedListItemsText = uncheckedListItems.join('\n');

		await navigator.clipboard.writeText(uncheckedListItemsText);

		toast.success(`${uncheckedListItems.length} ingredients copied successfully`);
	});

	/**
	 * Reset the ingredient state so that they're all un-checked
	 */
	export function reset() {
		for (const key of checkedState.keys()) {
			checkedState.set(key, false);
		}
	}
</script>

<div class="overflow-y-auto px-4">
	<div class="flex flex-col">
		<div class="overflow-y-auto">
			<IngredientList node={ingredients} {checkedState} />
		</div>
	</div>
</div>

<Drawer.Footer>
	<p class="text-muted-foreground text-center">
		{numChecked} / {numIngredients} in stock
	</p>

	<Button
		disabled={numChecked === numIngredients}
		onclick={(event) => {
			event.stopPropagation();
			copyRemaining.perform();
		}}
	>
		<ClipboardCopyIcon />
		Copy the Rest
	</Button>
</Drawer.Footer>
