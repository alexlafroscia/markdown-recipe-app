import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/recipe-db';

export const load: LayoutServerLoad = async () => {
	const data = db.all();

	return {
		recipes: data,
	};
};
