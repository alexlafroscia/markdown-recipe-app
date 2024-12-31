import { File } from 'vault/file';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import { makeRecipe } from '$lib/recipe';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { vault } = locals;

	const filePath = vault.resolvePath(params.name);
	const file = filePath && vault.resolve(filePath);

	if (!file || !(file instanceof File)) {
		error(404, 'No recipe matching that name');
	}

	return {
		recipe: makeRecipe(filePath, file),
	};
};
