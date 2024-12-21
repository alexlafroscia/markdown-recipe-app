import { INDEX_LOCATION, MD_LOCATION } from '$env/static/private';
import { RecipeDB } from 'recipe-db';

const client = await RecipeDB.init({
	vaultPath: MD_LOCATION,
	indexPath: INDEX_LOCATION,
});

export { client };
