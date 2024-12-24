<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import RecipeLinkItem from '$lib/components/RecipeLinkItem.svelte';

	import '../app.css';

	interface Props {
		children: Snippet<[]>;
		data: LayoutData;
	}

	let { children, data }: Props = $props();

	let recipes = $derived(data.recipes);
</script>

<div class="list-and-detail">
	<ul>
		{#each recipes as recipe}
			<li>
				<RecipeLinkItem {recipe} />
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
		gap: 1em;
		height: 100vh;
	}

	ul {
		overflow-y: auto;
		padding: 0 1em;
		max-width: 40%;
		border-right: 1px solid var(--rich-chocolate-brown);
	}

	.detail {
		overflow: auto;
	}
</style>
