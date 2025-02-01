<script lang="ts">
	import { clsx, type ClassValue } from 'clsx';
	import ChefHatIcon from 'lucide-svelte/icons/chef-hat';
	import { hash } from '$lib/string';

	interface Recipe {
		name: string;
	}

	interface Props {
		class?: ClassValue;
		recipe: Recipe;
	}

	let { class: classValue, recipe }: Props = $props();

	let recipeHash = $derived(Math.abs(hash(recipe.name)));
	let noImageColorOption = $derived(recipeHash % 5);
</script>

<div
	class={[
		'flex items-center justify-center',
		{
			'bg-red-50': noImageColorOption === 0,
			'bg-blue-50': noImageColorOption === 1,
			'bg-green-50': noImageColorOption === 2,
			'bg-yellow-50': noImageColorOption === 3,
			'bg-purple-50': noImageColorOption === 4,
		},
		classValue,
	]}
>
	<ChefHatIcon
		class={clsx('h-2/5 min-h-6 w-2/5 min-w-6 stroke-1', {
			'fill-red-100 text-red-400': noImageColorOption === 0,
			'fill-blue-100 text-blue-400': noImageColorOption === 1,
			'fill-green-100 text-green-400': noImageColorOption === 2,
			'fill-yellow-100 text-yellow-400': noImageColorOption === 3,
			'fill-purple-100 text-purple-400': noImageColorOption === 4,
		})}
	/>
</div>
