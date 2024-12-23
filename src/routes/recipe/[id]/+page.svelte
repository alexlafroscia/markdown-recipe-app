<script lang="ts">
	import Root from '$lib/components/ast/Root.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let recipe = $derived(data.recipe);
</script>

<div>
	<Root node={recipe.fullAST} />
</div>
