import { expect, test } from 'vitest';
import dedent from 'dedent';

import { makeClient, withRecipe } from '../helpers';

const WITH_INGREDIENT_HEADER = dedent`
    ## Ingredients

    - 1 small onion
    - 1/2 lb ground beef
`;

const WITH_STEPS = dedent`
    This is a description

    ---

    - 1 small onion

    Fry the onion

    ---

    - 1/2 lb ground beef

    Brown the ground beef
`;

test('grabbing the list from a heading', async () => {
	const client = await makeClient(withRecipe(WITH_INGREDIENT_HEADER));
	const [recipe] = await client.recipes();

	expect(recipe.ingredients).toEqual(['1 small onion', '1/2 lb ground beef']);
});

test('grabbing from all of the steps', async () => {
	const client = await makeClient(withRecipe(WITH_STEPS));
	const [recipe] = await client.recipes();

	expect(recipe.ingredients).toEqual(['1 small onion', '1/2 lb ground beef']);
});
