import { describe, test, expect } from 'vitest';

import { parse } from '$lib/test-helpers';
import dedent from 'dedent';

import { getRecipePages } from './get-recipe-pages';

describe('recipes with split steps', () => {
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
});

describe('recipes with an ordered list under a header', () => {
	test('in a `Steps` section', () => {
		const { ast } = parse(dedent`
            # Steps

            1. Whisk together ingredients
            2. This is another step
        `);

		const pages = getRecipePages(ast);

		expect(pages).toHaveLength(2);

		const [page] = pages;

		expect(page).toHaveLength(1);
	});

	test('in a `Directions` section', () => {
		const { ast } = parse(dedent`
            # Directions

            1. Whisk together ingredients
            2. This is another step
        `);

		const pages = getRecipePages(ast);

		expect(pages).toHaveLength(2);

		const [page] = pages;

		expect(page).toHaveLength(1);
	});
});
