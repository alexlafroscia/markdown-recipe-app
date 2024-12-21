import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';
import { Factory } from 'file-fixture-factory';

import { RecipeDB } from '../src/recipe-db';
import { tmpdir } from 'node:os';

const factory = new Factory('recipe-db-build-index-vault');
let client: RecipeDB;

beforeAll(async () => {
	const directory = await factory.createDirectory({
		Recipes: {
			'Pasta Bolognese.md': '',
		},
	});

	const indexPath = await fs.mkdtemp(path.join(tmpdir(), 'recipe-db-build-index-'));

	client = await RecipeDB.init({
		vaultPath: directory.dir,
		indexPath,
	});
});

describe('recipe file properties', () => {
	test('title', async () => {
		const recipes = await client.recipes();

		expect(recipes).toHaveLength(1);

		const [recipe] = recipes;

		expect(recipe.title).toBe('Pasta Bolognese');
	});
});
