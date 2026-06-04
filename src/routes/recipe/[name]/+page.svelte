<script lang="ts">
	import Root from '$lib/components/ast/Root.svelte';
	import type { PageData } from './$types';

	import Frontmatter from '$lib/components/Frontmatter.svelte';
	import LaunchIngredientModal from '$lib/components/IngredientModal/Button.svelte';
	import LaunchCookingWizard from '$lib/components/CookingWizard/Button.svelte';
	import { getIngredients } from '$lib/mdast/utils/get-ingredients';
	import AppHeader from '$lib/components/AppHeader.svelte';

	let { data }: { data: PageData } = $props();

	let recipe = $derived(data.recipe);
	let recipeAST = $derived(recipe.ast);

	let frontmatter = $derived(Object.entries(recipe.frontmatter));

	let ingredients = $derived(getIngredients(recipeAST));
	let hasIngredients = $derived(ingredients.children.length > 0);
</script>

<div class="flex flex-col items-center gap-4 mb-4">
	<AppHeader title={recipe.name} />

	{#if frontmatter.length > 0}
		<div class="bg-bg-2 mx-4 max-w-[65ch] rounded">
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

	<div class="prose prose-li:marker:text-current prose-hr:border-current mx-4">
		<Root node={recipeAST} />
	</div>
</div>

<style>
	.prose {
		white-space: pre-line;

		--tw-prose-headings: var(--flexoki-tx);
		--tw-prose-body: var(--flexoki-tx);
		--tw-prose-links: var(--flexoki-cy);
	}
</style>
