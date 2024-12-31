import type { File } from 'vault/file';
import { makeRecipe } from '$lib/recipe';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { vault } = locals;
	const recipes = vault
		.index()
		.filter((path) => {
			return path.startsWith('Recipes/') && path.endsWith('.md');
		})
		.map((path) => {
			return makeRecipe(path, vault.resolve(path) as File);
		});

	return {
		recipes,
	};
};
