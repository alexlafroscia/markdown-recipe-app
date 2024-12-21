import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { tmpdir } from 'node:os';

import { Factory } from 'file-fixture-factory';

import { RecipeDB } from '../src';

type Definition = Parameters<Factory['createDirectory']>[0];

const factory = new Factory('recipe-db');

export async function makeClient(definition: Definition) {
	const indexPath = await fs.mkdtemp(path.join(tmpdir(), 'recipe-db-build-index-'));
	const directory = await factory.createDirectory(definition);

	return RecipeDB.init({
		vaultPath: directory.dir,
		indexPath,
	});
}

export function withRecipe(fileContent: string): Definition {
	return {
		Recipes: {
			'Pasta Bologese.md': fileContent,
		},
	};
}
