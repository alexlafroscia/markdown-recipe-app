<script lang="ts">
	import CookingPotIcon from 'lucide-svelte/icons/cooking-pot';

	import Button from '$lib/components/Button.svelte';
	import type { getIngredients } from '$lib/mdast/utils/get-ingredients';
	import { makeIngredientStateMap } from '$lib/ingredients';

	import IngredientModalContents from './IngredientModalContents.svelte';

	interface Props {
		ingredients: ReturnType<typeof getIngredients>;
	}

	let { ingredients }: Props = $props();

	let modal = $state<HTMLDialogElement>();
	let checkedState = ingredients ? makeIngredientStateMap(ingredients) : undefined;

	function openModal() {
		modal?.showModal();
	}
</script>

<Button
	class="bg-green-100 text-green-800 hover:bg-green-200 disabled:bg-green-50"
	disabled={!ingredients}
	onclick={openModal}
>
	<CookingPotIcon />

	Ingredients
</Button>

{#if ingredients && checkedState}
	<dialog class="min-w-half m-auto flex-col gap-2 rounded-lg p-4 shadow-2xl" bind:this={modal}>
		<IngredientModalContents {ingredients} />
	</dialog>
{/if}

<style>
	dialog[open] {
		display: flex;
	}
</style>
