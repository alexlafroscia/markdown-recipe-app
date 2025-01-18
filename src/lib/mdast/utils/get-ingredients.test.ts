import { test, expect } from 'vitest';

import { parse } from '$lib/test-helpers';
import dedent from 'dedent';

import { getIngredients } from './get-ingredients';

test('when there are no ingredients', () => {
	const { ast } = parse(dedent`
        # Some other content

        - This is a list
    `);

	const ingredients = getIngredients(ast);

	expect(ingredients).toBeUndefined();
});

test('when there are ingredients in recipe sections', () => {
	const { ast } = parse(dedent`
        - First section ingredients

        These are directions

        ---

        - Second section ingredients

        These are directions
    `);

	const ingredients = getIngredients(ast);

	expect(ingredients).toBeDefined();
	expect(ingredients?.children).toHaveLength(2);
});

test('when there are ingredients under a heading', () => {
	const { ast } = parse(dedent`
        ## Ingredients

        - These are the ingredients

        ### Sub-section

        - These are more ingredients
    `);

	const ingredients = getIngredients(ast);

	expect(ingredients).toBeDefined();
	expect(ingredients?.children).toHaveLength(2);
});
