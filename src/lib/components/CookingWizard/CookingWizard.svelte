<script lang="ts">
	import type { Root, RootContent, List } from 'vault/mdast';
	import { inview } from 'svelte-inview';

	import CookingPotIcon from 'lucide-svelte/icons/cooking-pot';
	import MaximizeIcon from 'lucide-svelte/icons/maximize-2';
	import MinimizeIcon from 'lucide-svelte/icons/minimize-2';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';

	import { type Page, getRecipePages } from '$lib/mdast/utils/get-recipe-pages';
	import { makeIngredientStateMap } from '$lib/ingredients';
	import { getIngredients } from '$lib/mdast/utils/get-ingredients';

	import Button from '$lib/components/Button.svelte';
	import RootContentComponent from '$lib/components/ast/RootContent.svelte';
	import IngredientList from '$lib/components/recipe-ast/IngredientList.svelte';
	import { FullscreenController } from '$lib/actions/fullscreen.svelte';

	interface Props {
		recipe: Root;
	}

	let { recipe }: Props = $props();
	let pages = getRecipePages(recipe);

	let allIngredients = getIngredients(recipe);
	let ingredientState = makeIngredientStateMap(allIngredients);

	function extractDetails(page: Page): { ingredients: List | undefined; steps: RootContent[] } {
		const ingredients = page.find(
			(element): element is List => element.type === 'list' && !!element.data?.isIngredientList,
		);
		const steps = page.filter((element) => element.type !== 'list');

		return {
			ingredients,
			steps,
		};
	}

	const fullscreen = new FullscreenController();
	let ingredientsExpanded = $state(true);

	/* === Previous/Next Page Controls === */

	let visiblePageElement = $state<HTMLElement>();
	let previousPageElement = $derived(visiblePageElement?.previousElementSibling);
	let nextPageElement = $derived(visiblePageElement?.nextElementSibling);

	let allPageElements = $derived(Array.from(visiblePageElement?.parentElement?.children ?? []));
	let visiblePageIndex = $derived(
		visiblePageElement ? allPageElements.indexOf(visiblePageElement) + 1 : 0,
	);

	function scrollIntoView(element: Element | null | undefined) {
		element?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'start',
		});
	}
</script>

<div class="bg-bg-2 flex max-h-screen max-w-4xl flex-col" use:fullscreen.attach>
	<header class="text-tx flex items-center justify-between p-2">
		<div>
			<Button
				class={['bg-ui hover:bg-ui-2 md:hidden', ingredientsExpanded ? 'bg-ui-3' : 'bg-ui']}
				onclick={() => {
					ingredientsExpanded = !ingredientsExpanded;
				}}
			>
				<CookingPotIcon class="h-5 w-5" />
			</Button>
		</div>

		<div class="flex items-center gap-2">
			<Button
				class="bg-ui hover:bg-ui-2 disabled:text-tx-2 disabled:hover:bg-ui"
				disabled={!previousPageElement}
				onclick={() => {
					scrollIntoView(previousPageElement);
				}}
			>
				<ArrowLeft class="h-5 w-5" />
			</Button>

			<span>
				{visiblePageIndex} / {pages.length}
			</span>

			<Button
				class="bg-ui hover:bg-ui-2 disabled:text-tx-2 disabled:hover:bg-ui"
				disabled={!nextPageElement}
				onclick={() => {
					scrollIntoView(nextPageElement);
				}}
			>
				<ArrowRight class="h-5 w-5" />
			</Button>
		</div>

		<Button
			class="bg-ui hover:bg-ui-2"
			onclick={() => {
				fullscreen.toggle();
			}}
		>
			{#if fullscreen.enabled}
				<MinimizeIcon class="h-5 w-5" />
			{:else}
				<MaximizeIcon class="h-5 w-5" />
			{/if}
		</Button>
	</header>
	<div class="flex flex-grow snap-x snap-mandatory items-stretch overflow-x-auto text-lg">
		{#each pages as page}
			{@const { ingredients, steps } = extractDetails(page)}

			<div
				class="flex w-full shrink-0 snap-start flex-col-reverse md:flex-row"
				use:inview={{
					threshold: 0.5,
				}}
				oninview_enter={(event) => {
					visiblePageElement = event.detail.node;
				}}
			>
				<div class={['min-w-1/3 p-4', ingredientsExpanded ? '' : 'hidden md:block']}>
					{#if ingredients}
						<IngredientList node={ingredients} checkedState={ingredientState} />
					{/if}
				</div>

				<div class="bg-bg flex-grow space-y-4 overflow-y-auto rounded-tl-lg p-4">
					{#each steps as node}
						<RootContentComponent {node} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
