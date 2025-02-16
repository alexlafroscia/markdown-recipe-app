<script lang="ts">
	import Root from '$lib/components/ast/Root.svelte';
	import type { PageData } from './$types';

	import Frontmatter from '$lib/components/Frontmatter.svelte';
	import LaunchIngredientModal from '$lib/components/IngredientModal/Button.svelte';
	import LaunchCookingWizard from '$lib/components/CookingWizard/Button.svelte';
	import { getIngredients } from '$lib/mdast/utils/get-ingredients';

	let { data }: { data: PageData } = $props();

	let recipe = $derived(data.recipe);
	let recipeAST = $derived(recipe.ast);

	let frontmatter = $derived(Object.entries(recipe.frontmatter));

	let ingredients = $derived(getIngredients(recipeAST));
	let hasIngredients = $derived(ingredients.children.length > 0);
</script>

<div class="flex flex-col gap-4">
	<header>
		<h1 class="mb-2 text-2xl">{recipe.name}</h1>
	</header>

	{#if frontmatter.length > 0}
		<div class="bg-bg-2 rounded">
			<details open>
				<summary class="p-2">Properties</summary>
				<Frontmatter {frontmatter} />
			</details>

			<section class="border-bg m-2 mt-0 flex gap-2 border-t pt-2">
				{#if hasIngredients}
					<LaunchIngredientModal {ingredients} />
				{/if}

				<LaunchCookingWizard recipe={recipeAST} />
			</section>
		</div>
	{/if}

	<div class="prose prose-li:marker:text-current prose-hr:border-current">
		<Root node={recipeAST} />
	</div>
</div>

<style>
	.prose {
		white-space: pre-line;

		--tw-prose-headings: var(--flexoki-tx);
		--tw-prose-body: var(--flexoki-tx);
	}
</style>
