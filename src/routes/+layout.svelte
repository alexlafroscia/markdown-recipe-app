<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import { page } from '$app/state';
	import RecipeLinkItem from '$lib/components/RecipeLinkItem.svelte';

	import '../app.css';

	interface Props {
		children: Snippet<[]>;
		data: LayoutData;
	}

	let { children, data }: Props = $props();

	let recipes = $derived(data.recipes);
	let selectedRecipe = $derived(page.data.recipe);
</script>

<div class="list-and-detail">
	<ul>
		{#each recipes as recipe}
			<li>
				<RecipeLinkItem {recipe} active={recipe.name === selectedRecipe.name} />
			</li>
		{/each}
	</ul>

	<div class="detail">
		{@render children()}
	</div>
</div>

<style>
	.list-and-detail {
		background-color: var(--cream);
		color: var(--rich-chocolate-brown);

		display: flex;
		height: 100vh;

		/* By default, a `.detail` with `.detail-empty` is hidden */
		&:has(:global(.detail-empty)) .detail {
			display: none;
		}

		/* By default, a list` with `.detail-full` is hidden */
		&:has(:global(.detail-full)) ul {
			display: none;
		}

		@media (min-width: 600px) {
			&:has(:global(.detail-empty)) .detail {
				display: block;
			}

			&:has(:global(.detail-full)) ul {
				display: flex;
			}
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		overflow-y: auto;
		padding: 0.5em 1em;
		width: 100%;

		@media (min-width: 600px) {
			border-right: 1px solid var(--rich-chocolate-brown);
			max-width: 35%;
		}

		@media (min-width: 800px) {
			max-width: 40%;
		}
	}

	.detail {
		overflow: auto;
		padding: 0 1em;
	}
</style>
