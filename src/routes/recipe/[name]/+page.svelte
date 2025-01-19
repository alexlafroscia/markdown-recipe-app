<script lang="ts">
	import Root from '$lib/components/ast/Root.svelte';
	import type { PageData } from './$types';

	import Frontmatter from '$lib/components/Frontmatter.svelte';
	import LaunchIngredientModal from '$lib/components/IngredientModal/Button.svelte';
	import { getIngredients } from '$lib/mdast/utils/get-ingredients';

	let { data }: { data: PageData } = $props();

	let recipe = $derived(data.recipe);
	let recipeAST = $derived(recipe.ast);

	let frontmatter = $derived(Object.entries(recipe.frontmatter));
</script>

<div class="detail-full flex flex-col gap-4 py-2">
	<header>
		<h1 class="mb-2 text-2xl">{recipe.name}</h1>
	</header>

	{#if frontmatter.length > 0}
		<Frontmatter {frontmatter} />
	{/if}

	<section>
		<LaunchIngredientModal ingredients={getIngredients(recipe.ast)} />
	</section>

	<div class="prose prose-li:marker:text-current prose-hr:border-current">
		<Root node={recipeAST} />
	</div>
</div>

<style>
	.prose {
		white-space: pre-line;

		--tw-prose-headings: var(--flexoki-black);
	}
</style>
