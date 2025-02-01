<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { type Recipe, makeUrl } from '$lib/recipe';

	import RecipeFallbackImage from './RecipeFallbackImage.svelte';

	interface Props {
		class?: ClassValue;
		recipe: Recipe;
	}

	let { recipe, class: classValue }: Props = $props();
</script>

<a class={['flex items-center gap-2', classValue]} href={makeUrl(recipe)}>
	{#if recipe.image}
		<img src={recipe.image.url} alt={recipe.image.alt} class="h-10 w-10 rounded" />
	{:else}
		<RecipeFallbackImage class="h-10 w-10 rounded" {recipe} />
	{/if}

	<span>{recipe.name}</span>
</a>
