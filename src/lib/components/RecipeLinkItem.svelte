<script lang="ts">
	import type { Recipe } from '$lib/recipe';

	export let recipe: Recipe;
</script>

<a href="/recipe/{recipe.name}">
	<span class="image"></span>

	<b>{recipe.name}</b>
</a>

<style>
	a {
		display: grid;
		grid-template-areas:
			'image name'
			'image description';
		grid-template-columns: 40px 1fr;
		gap: 0.5em;

		padding: 1em;

		/* Smooth transition */
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	a:hover {
		/* Move up and scale slightly */
		transform: translateY(-2px) scale(1.05);

		/* Shadow for depth */
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
	}

	b {
		line-height: 1.2em;
	}

	.image {
		aspect-ratio: 1/1;
		background-color: var(--muted-olive-green);
	}
</style>
