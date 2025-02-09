<script lang="ts" module>
	import '../app.css';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { clsx } from 'clsx';

	import { base } from '$app/paths';
	import { page } from '$app/state';
	import type { LayoutData } from './$types';

	import ChefHatIcon from 'lucide-svelte/icons/chef-hat';

	interface Props {
		children: Snippet<[]>;
		data: LayoutData;
	}

	let { children }: Props = $props();
	let currentURL = $derived(page.url.pathname);

	let recipeListURL = base ?? '/';
</script>

<svelte:head>
	<!-- Light Mode: Flexoki Paper -->
	<meta name="theme-color" content="#fffcf0" />
	<!-- Dark Mode: Flexoki Black -->
	<meta name="theme-color" content="#100f0f" media="(prefers-color-scheme: dark)" />

	<!-- Disable tap-to-zoom on iOS -->
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
	/>
</svelte:head>

<div class="bg-bg text-tx flex flex-col md:h-screen md:flex-row">
	<ul
		class="border-bg-2 flex gap-2 border-b px-4 py-2 md:flex-col md:border-transparent md:pt-12 md:pr-0"
	>
		<li class="hover:bg-ui-2 rounded-sm p-2 text-lg transition-colors md:min-w-[200px]">
			<a class="flex gap-2" href={recipeListURL}>
				<ChefHatIcon
					class={clsx('text-cyan-600', {
						'fill-cyan-100': currentURL === recipeListURL,
					})}
				/>
				Recipes
			</a>
		</li>
	</ul>

	<div class="flex-grow px-4 py-2 md:overflow-auto">
		{@render children()}
	</div>
</div>
