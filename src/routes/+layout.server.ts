import { client } from '$lib/server/recipe-db';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		recipes: await client.recipes(),
	};
};
