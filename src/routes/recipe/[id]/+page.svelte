<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let recipe = $derived(data.recipe);
</script>

<h2>Ingredients</h2>

<ul>
	{#each recipe.ingredients as ingredient}
		<li>{ingredient}</li>
	{/each}
</ul>
