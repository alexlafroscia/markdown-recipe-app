<script lang="ts">
	import type { Root, RootContent, List } from 'vault/mdast';

	import RootContentComponent from '$lib/components/ast/RootContent.svelte';
	import IngredientList from '$lib/components/recipe-ast/IngredientList.svelte';
	import { type Page, getRecipePages } from '$lib/mdast/utils/get-recipe-pages';
	import { makeIngredientStateMap } from '$lib/ingredients';
	import { getIngredients } from '$lib/mdast/utils/get-ingredients';

	interface Props {
		recipe: Root;
	}

	let { recipe }: Props = $props();
	let pages = getRecipePages(recipe);

	let allIngredients = getIngredients(recipe);
	let ingredientState = allIngredients ? makeIngredientStateMap(allIngredients) : undefined;

	function extractDetails(page: Page): { ingredients: List | undefined; steps: RootContent[] } {
		const ingredients = page.find(
			(element): element is List => element.type === 'list' && !!element.data?.isIngredientList,
		);
		const steps = page.filter((element) => element.type !== 'list');

		return {
			ingredients,
			steps,
		};
	}
</script>

<div class="wizard bg-paper h-full divide-y overflow-y-auto text-lg">
	{#each pages as page}
		{@const { ingredients, steps } = extractDetails(page)}

		<div class="step flex min-h-full w-full">
			<div class="w-1/3 bg-black p-4 text-white">
				{#if ingredients}
					<IngredientList node={ingredients} checkedState={ingredientState} />
				{/if}
			</div>

			<div class="space-y-4 p-4">
				{#each steps as node}
					<RootContentComponent {node} />
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.wizard {
		scroll-snap-type: y mandatory;
	}

	.step {
		scroll-snap-align: start;
	}
</style>
