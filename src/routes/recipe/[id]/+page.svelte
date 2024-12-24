<script lang="ts">
	import Root from '$lib/components/ast/Root.svelte';
	import type { PageData } from './$types';

	import { removeFrontmatter } from '$lib/ast/extract-frontmatter';

	let { data }: { data: PageData } = $props();

	let recipe = $derived(data.recipe);
	let recipeAST = $derived(removeFrontmatter(recipe.fullAST));
</script>

<div class="prose">
	<Root node={recipeAST} />
</div>

<style>
	div {
		white-space: pre-line;
	}
</style>
