<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import dedent from 'dedent';

	import { parse } from '$lib/test-helpers';
	import { getIngredients } from '$lib/mdast/utils/get-ingredients';

	import IngredientModalContents from './IngredientModalContents.svelte';

	const { Story } = defineMeta({
		title: 'IngredientModalContents',
		component: IngredientModalContents,
	});

	const { ast } = parse(dedent`
        ## Ingredients

        - 2 eggs
        - 1 cup milk
    `);
	const ingredients = getIngredients(ast)!;
</script>

<Story name="Default">
	<IngredientModalContents {ingredients} />
</Story>
