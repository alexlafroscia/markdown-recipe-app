import { expect, test } from 'vitest';
import dedent from 'dedent';

import { makeClient, withRecipe } from '../helpers';

const WITH_INGREDIENT_HEADER = dedent`
    ## Ingredients

    - 1 small onion
    - 1/2 lb ground beef
`;

test('attaching the full AST', async () => {
	const client = await makeClient(withRecipe(WITH_INGREDIENT_HEADER));
	const [recipe] = await client.recipes();

	expect(recipe.fullAST).toMatchSnapshot();
});
