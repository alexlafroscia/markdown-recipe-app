<script lang="ts">
	import type { List } from 'vault/mdast';
	import { task, timeout } from '@sheepdog/svelte';

	import CircleXIcon from 'lucide-svelte/icons/circle-x';
	import ClipboardCopyIcon from 'lucide-svelte/icons/clipboard-copy';
	import CheckIcon from 'lucide-svelte/icons/check';

	import { getText } from '$lib/mdast/utils/get-text';
	import IngredientList from '$lib/components/recipe-ast/IngredientList.svelte';
	import { makeIngredientStateMap } from '$lib/ingredients';

	interface Props {
		ingredients: List;
	}

	let { ingredients }: Props = $props();

	let numIngredients = $derived(ingredients.children.length);

	let checkedState = makeIngredientStateMap(ingredients);
	let numChecked = $derived.by(() => {
		return Array.from(checkedState.values()).reduce((acc, checked) => {
			return acc + (checked ? 1 : 0);
		}, 0);
	});

	let showCopySuccessMessage = $state(false);
	const copyRemaining = task.restart(async function () {
		const uncheckedListItems = ingredients.children
			.filter((listItem) => {
				const id = listItem.data!.ingredientId!;

				return !checkedState.get(id);
			})
			.map((listItem) => {
				return getText(listItem);
			})
			.join('\n');

		await navigator.clipboard.writeText(uncheckedListItems);

		showCopySuccessMessage = true;

		await timeout(1_000);

		showCopySuccessMessage = false;
	});
</script>

<form class="flex flex-row-reverse items-center gap-4">
	<button formmethod="dialog" class="flex gap-2 rounded-sm bg-slate-100 p-2">
		<CircleXIcon />

		Close
	</button>

	<button
		class="flex gap-2 rounded-sm bg-slate-100 p-2 disabled:bg-slate-50"
		disabled={numChecked === numIngredients}
		onclick={(event) => {
			event.stopPropagation();

			copyRemaining.perform();
		}}
	>
		{#if showCopySuccessMessage}
			<CheckIcon class="text-green-500" />
		{:else}
			<ClipboardCopyIcon />
		{/if}

		Copy the Rest
	</button>

	<p>
		{numChecked} / {numIngredients}
	</p>
</form>

<div class="overflow-y-auto bg-white">
	<div class="flex flex-col">
		<div class="prose overflow-y-auto">
			<IngredientList node={ingredients} {checkedState} />
		</div>
	</div>
</div>
