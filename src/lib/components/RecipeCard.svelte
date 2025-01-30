<script lang="ts">
	import type { Recipe } from '$lib/recipe';

	import { clsx } from 'clsx';
	import ChefHatIcon from 'lucide-svelte/icons/chef-hat';
	import { hash } from '$lib/string';

	type RequiredRecipe = Pick<Recipe, 'name' | 'image'>;

	interface Props {
		recipe: RequiredRecipe;
	}

	let { recipe }: Props = $props();

	let image = $derived(recipe.image);

	let recipeHash = $derived(Math.abs(hash(recipe.name)));
	let noImageColorOption = $derived(recipeHash % 5);
</script>

<a
	href="/recipe/{recipe.name}"
	class="flex flex-col gap-2 bg-white p-4 shadow-md hover:scale-101 hover:shadow-lg"
>
	<div class="aspect-square w-full shadow">
		{#if image}
			<img src={image.url} alt={image.alt} class="aspect-square object-cover" />
		{:else}
			<div
				class={[
					'flex h-full items-center justify-center',
					{
						'bg-red-50': noImageColorOption === 0,
						'bg-blue-50': noImageColorOption === 1,
						'bg-green-50': noImageColorOption === 2,
						'bg-yellow-50': noImageColorOption === 3,
						'bg-purple-50': noImageColorOption === 4,
					},
				]}
			>
				<ChefHatIcon
					class={clsx('h-2/5 w-2/5 stroke-1', {
						'fill-red-100 text-red-400': noImageColorOption === 0,
						'fill-blue-100 text-blue-400': noImageColorOption === 1,
						'fill-green-100 text-green-400': noImageColorOption === 2,
						'fill-yellow-100 text-yellow-400': noImageColorOption === 3,
						'fill-purple-100 text-purple-400': noImageColorOption === 4,
					})}
				/>
			</div>
		{/if}
	</div>

	<p class="leading-5">
		{recipe.name}
	</p>
</a>
