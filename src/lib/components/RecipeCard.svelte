<script lang="ts">
	import { type Recipe, makeUrl } from '$lib/recipe';

	import RecipeFallbackImage from './RecipeFallbackImage.svelte';

	type RequiredRecipe = Pick<Recipe, 'name' | 'image'>;

	interface Props {
		recipe: RequiredRecipe;
	}

	let { recipe }: Props = $props();

	let image = $derived(recipe.image);
</script>

<a
	href={makeUrl(recipe)}
	class="bg-bg-2 flex flex-col gap-2 p-4 shadow-md hover:scale-101 hover:shadow-lg"
>
	<div class="aspect-square w-full shadow">
		{#if image}
			<img src={image.url} alt={image.alt} class="aspect-square object-cover" />
		{:else}
			<RecipeFallbackImage class="h-full" {recipe} />
		{/if}
	</div>

	<p class="leading-5">
		{recipe.name}
	</p>
</a>
