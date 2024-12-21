import { client } from '$lib/server/recipe-db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		recipes: await client.recipes(),
	};
};
