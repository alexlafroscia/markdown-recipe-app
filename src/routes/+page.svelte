<script lang="ts">
	import type { PageData } from './$types';

	import RecipeCard from '$lib/components/RecipeCard.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let recipes = $derived(data.recipes);
</script>

<div class="my-4 grid grid-cols-3 gap-4">
	{#each recipes as recipe}
		<RecipeCard {recipe} />
	{/each}
</div>
