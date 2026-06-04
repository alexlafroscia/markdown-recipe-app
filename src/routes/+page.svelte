<script lang="ts">
	import { persisted } from 'svelte-persisted-store';
	import type { PageData } from './$types';

	import GridIcon from '@lucide/svelte/icons/layout-grid';
	import ListIcon from '@lucide/svelte/icons/list';

	import AppHeader from '$lib/components/AppHeader.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import RecipeListItem from '$lib/components/RecipeListItem.svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';

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
	<ToggleGroup.Root
		type="single"
		value={$display}
		onValueChange={(v) => {
			if (v) $display = v as 'grid' | 'list';
		}}
		size="sm"
		variant="outline"
	>
		<ToggleGroup.Item value="list" aria-label="List view">
			<ListIcon class="h-4 w-4" />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="grid" aria-label="Grid view">
			<GridIcon class="h-4 w-4" />
		</ToggleGroup.Item>
	</ToggleGroup.Root>
</AppHeader>

{#if $display === 'grid'}
	<div class="my-4 grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 lg:grid-cols-4">
		{#each recipes as recipe}
			<RecipeCard {recipe} />
		{/each}
	</div>
{:else}
	<ul class="flex flex-col px-2 py-1">
		{#each recipes as recipe}
			<li>
				<RecipeListItem {recipe} />
			</li>
		{/each}
	</ul>
{/if}
