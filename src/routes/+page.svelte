<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let recipes = $derived(data.recipes);
</script>

<ul>
	{#each recipes as recipe}
		<li>
			{recipe.title}
		</li>
	{/each}
</ul>
