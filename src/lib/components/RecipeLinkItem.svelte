<script lang="ts">
	import type { Recipe } from '$lib/recipe';

	interface Props {
		recipe: Recipe;
		active?: boolean;
	}

	const { recipe, active = false }: Props = $props();
</script>

<a href="/recipe/{recipe.name}" class:active>
	<span class="image"></span>

	<b>{recipe.name}</b>
</a>

<style>
	a {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: 0.5em;

		border-radius: 5px;
		padding: 1em;

		transition: background-color 0.2s ease;
	}

	.active {
		background-color: color-mix(in srgb, var(--cream) 90%, black);
	}

	a:hover {
		background-color: color-mix(in srgb, var(--cream) 85%, black);
	}

	b {
		line-height: 1.2em;
	}

	.image {
		aspect-ratio: 1/1;
		background-color: var(--muted-olive-green);
	}
</style>
