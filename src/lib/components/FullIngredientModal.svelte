<script lang="ts">
	import CookingPotIcon from 'lucide-svelte/icons/cooking-pot';

	import List from '$lib/components/ast/List.svelte';
	import type { getIngredients } from '$lib/mdast/utils/get-ingredients';

	export let ingredients: ReturnType<typeof getIngredients>;

	let modal: HTMLDialogElement | undefined;

	function openModal() {
		modal?.showModal();
	}
</script>

<button
	class="flex gap-2 rounded bg-green-100 p-2 text-green-800 transition-colors hover:bg-green-200 hover:shadow-sm"
	disabled={!ingredients}
	onclick={openModal}
>
	<CookingPotIcon />

	Ingredients
</button>

{#if ingredients}
	<dialog class="min-w-half rounded-lg p-4" bind:this={modal}>
		<div class="flex flex-col">
			<div class="prose overflow-y-auto">
				<List node={ingredients} />
			</div>

			<form method="dialog">
				<button>Close</button>
			</form>
		</div>
	</dialog>
{/if}
