<script lang="ts">
	import Root from '$lib/components/ast/Root.svelte';
	import type { PageData } from './$types';

	import { removeFrontmatter } from '$lib/ast/extract-frontmatter';
	import Frontmatter from '$lib/components/Frontmatter.svelte';

	let { data }: { data: PageData } = $props();

	let recipe = $derived(data.recipe);
	let recipeAST = $derived(removeFrontmatter(recipe.fullAST));

	let frontmatter = $derived(Object.entries(recipe.frontmatter));
</script>

<div class="detail-full flex flex-col gap-4 py-2">
	<header>
		<h1 class="mb-2 text-2xl">{recipe.title}</h1>
	</header>

	{#if frontmatter.length > 0}
		<Frontmatter {frontmatter} />
	{/if}

	<div class="prose">
		<Root node={recipeAST} />
	</div>
</div>

<style>
	.prose {
		white-space: pre-line;

		--tw-prose-headings: var(--rich-chocolate-brown);
	}
</style>
