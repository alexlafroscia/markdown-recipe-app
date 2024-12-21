import { error } from '@sveltejs/kit';
import { client } from '$lib/server/recipe-db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const recipe = await client.withId(params.id);

	if (!recipe) {
		error(404, 'No recipe matching that ID');
	}

	return {
		recipe,
	};
};
