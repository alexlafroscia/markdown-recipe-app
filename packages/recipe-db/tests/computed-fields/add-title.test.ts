import { expect, test } from 'vitest';

import { makeClient } from '../helpers';

test('defining the title from the file name', async () => {
	const client = await makeClient({
		Recipes: {
			'Pasta Bologese.md': '',
		},
	});
	const [recipe] = await client.recipes();

	expect(recipe.title).toBe('Pasta Bologese');
});
