<script lang="ts" module>
	import '../app.css';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { clsx } from 'clsx';

	import { page } from '$app/state';
	import type { LayoutData } from './$types';

	import ChefHatIcon from 'lucide-svelte/icons/chef-hat';

	interface Props {
		children: Snippet<[]>;
		data: LayoutData;
	}

	let { children }: Props = $props();
	let currentURL = $derived(page.url.pathname);
</script>

<div class="bg-bg text-tx flex flex-col md:h-screen md:flex-row">
	<ul
		class="flex gap-2 border-b border-gray-50 px-4 py-2 md:flex-col md:border-transparent md:pt-12 md:pr-0"
	>
		<li class="rounded-sm p-2 text-lg transition-colors hover:bg-gray-50 md:min-w-[200px]">
			<a class="flex gap-2" href="/">
				<ChefHatIcon
					class={clsx('text-cyan-600', {
						'fill-cyan-100': currentURL === '/',
					})}
				/>
				Recipes
			</a>
		</li>
	</ul>

	<div class="detail px-4 md:overflow-auto">
		{@render children()}
	</div>
</div>
