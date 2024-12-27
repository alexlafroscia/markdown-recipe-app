import { error } from '@sveltejs/kit';
import { db } from '$lib/server/recipe-db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const recipe = db.withName(params.name);

	if (!recipe) {
		error(404, 'No recipe matching that name');
	}

	return {
		recipe,
	};
};
