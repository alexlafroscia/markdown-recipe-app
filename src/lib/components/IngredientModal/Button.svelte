<script lang="ts">
	import CookingPotIcon from '@lucide/svelte/icons/cooking-pot';

	import * as Drawer from '$lib/components/ui/drawer';
	import type { getIngredients } from '$lib/mdast/utils/get-ingredients';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';

	import IngredientModalContents from './IngredientModalContents.svelte';

	interface Props {
		ingredients: ReturnType<typeof getIngredients>;
	}

	let { ingredients }: Props = $props();

	let contents = $state<IngredientModalContents>();

	function handleOpenStateChange(open: boolean) {
		if (!open) {
			contents?.reset();
		}
	}
</script>

<Drawer.Root onOpenChange={handleOpenStateChange}>
	<Drawer.Trigger
		class={cn(
			'gap-1.5 bg-green-100 text-green-800 hover:bg-green-200 disabled:bg-green-50 dark:bg-green-950 dark:text-green-200 dark:hover:bg-green-900',
			buttonVariants({ size: 'sm', variant: 'secondary' }),
		)}
	>
		<CookingPotIcon class="h-4 w-4" />
		Ingredients
	</Drawer.Trigger>

	<Drawer.Content>
		<IngredientModalContents bind:this={contents} {ingredients} />
	</Drawer.Content>
</Drawer.Root>
