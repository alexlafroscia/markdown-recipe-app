<script lang="ts">
	import type { Recipe } from '$lib/recipe';

	import PhrasingContent from '$lib/components/ast/PhrasingContent.svelte';

	interface Props {
		recipe: Recipe;
		active?: boolean;
	}

	const { recipe, active = false }: Props = $props();
</script>

<a href="/recipe/{recipe.name}" class:active>
	{#if recipe.image}
		<PhrasingContent node={recipe.image} />
	{:else}
		<span class="image"></span>
	{/if}

	<b>{recipe.name}</b>
</a>

<style>
	a {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: 0.5em;

		border-radius: 5px;
		padding: 1em;

		transition: background-color 0.2s ease;
	}

	.active {
		background-color: var(--flexoki-100);
	}

	a:hover {
		background-color: var(--flexoki-200);
	}

	b {
		line-height: 1.2em;
	}

	.image {
		aspect-ratio: 1/1;
		background-color: var(--flexoki-200);
	}
</style>
