<script lang="ts">
	import CookingPotIcon from 'lucide-svelte/icons/cooking-pot';

	import Button from '$lib/components/Button.svelte';
	import Dialog, { DialogController } from '$lib/components/Dialog.svelte';
	import type { getIngredients } from '$lib/mdast/utils/get-ingredients';
	import { makeIngredientStateMap } from '$lib/ingredients';

	import IngredientModalContents from './IngredientModalContents.svelte';

	interface Props {
		ingredients: ReturnType<typeof getIngredients>;
	}

	let { ingredients }: Props = $props();

	let checkedState = ingredients ? makeIngredientStateMap(ingredients) : undefined;
	let dialogController = new DialogController();
</script>

<Button
	class="bg-green-100 text-green-800 hover:bg-green-200 disabled:bg-green-50"
	disabled={!ingredients}
	onclick={dialogController.showModal}
>
	<CookingPotIcon class="h-4 w-4" />

	Ingredients
</Button>

{#if ingredients && checkedState}
	<Dialog
		class={[
			'min-w-half m-auto flex-col gap-2 rounded-lg p-4 text-base shadow-2xl',
			dialogController.isOpen && 'flex',
		]}
		controller={dialogController}
	>
		<IngredientModalContents {ingredients} />
	</Dialog>
{/if}
