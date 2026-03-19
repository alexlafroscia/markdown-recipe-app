<script lang="ts">
	import { persisted } from 'svelte-persisted-store';
	import type { PageData } from './$types';

	import GridIcon from 'lucide-svelte/icons/layout-grid';
	import ListIcon from 'lucide-svelte/icons/list';

	import AppHeader from '$lib/components/AppHeader.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import RecipeListItem from '$lib/components/RecipeListItem.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let recipes = $derived(data.recipes);

	let display = persisted<'grid' | 'list'>('display', 'list', {
		storage: 'session',
	});
</script>

<AppHeader title="Recipes">
	<div class="divide-x-ui-2 flex divide-solid rounded shadow">
		<button
			class={['hover:bg-ui-2 flex rounded-l p-2', $display === 'list' ? 'bg-ui-3' : 'bg-ui']}
			onclick={() => {
				$display = 'list';
			}}
		>
			<ListIcon class="h-4 w-4" />
		</button>

		<button
			class={['hover:bg-ui-2 flex rounded-r p-2', $display === 'grid' ? 'bg-ui-3' : 'bg-ui']}
			onclick={() => {
				$display = 'grid';
			}}
		>
			<GridIcon class="h-4 w-4" />
		</button>
	</div>
</AppHeader>

{#if $display === 'grid'}
	<div class="my-4 grid grid-cols-3 gap-4 px-4">
		{#each recipes as recipe}
			<RecipeCard {recipe} />
		{/each}
	</div>
{:else}
	<ul class="divide-bg-2 space-y-2 divide-y px-4">
		{#each recipes as recipe}
			<li class="block pb-2">
				<RecipeListItem {recipe} />
			</li>
		{/each}
	</ul>
{/if}
