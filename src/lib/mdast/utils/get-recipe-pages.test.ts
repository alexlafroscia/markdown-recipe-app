import { test, expect } from 'vitest';

import { parse } from '$lib/test-helpers';
import dedent from 'dedent';

import { getRecipePages } from './get-recipe-pages';

test('a recipe with a single page', () => {
	const { ast } = parse(dedent`
        - 1 egg
        - 2 cups sugar

        Whisk together ingredients
    `);

	const pages = getRecipePages(ast);

	expect(pages.length).toEqual(1);

	const [page] = pages;

	expect(page.length).toEqual(2);
});

test('skipping sections with unsupported elements', () => {
	const { ast } = parse(dedent`
        ---
        front: matter
        ---

        # This is a title

        ---

        - 1 egg
        - 2 cups sugar

        Whisk together ingredients

        ---

        This is just some steps and should be included
    `);

	const pages = getRecipePages(ast);

	expect(pages.length).toEqual(2);

	const [page] = pages;

	expect(page.length).toEqual(2);
});
