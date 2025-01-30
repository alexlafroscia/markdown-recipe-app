<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import RecipeCard from './RecipeCard.svelte';

	const { Story } = defineMeta({
		title: 'Recipe Card',
		component: RecipeCard,
	});
</script>

<Story name="Card With Image">
	<RecipeCard
		recipe={{
			name: 'Cookies',
			image: {
				type: 'image',
				url: '/test-assets/cookies.jpg',
			},
		}}
	/>
</Story>
