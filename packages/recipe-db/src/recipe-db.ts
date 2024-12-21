import { MarkdownDB } from 'mddb';

import { buildIndex } from './build-index';
import { createRecipe } from './recipe';
import type { File, Options } from './types';

export class RecipeDB {
	private client: MarkdownDB;

	private constructor(client: MarkdownDB) {
		this.client = client;
	}

	static async init(options: Options) {
		const filename = await buildIndex(options);

		const client = new MarkdownDB({
			client: 'sqlite3',
			connection: {
				filename,
			},
		});

		await client.init();

		return new RecipeDB(client);
	}

	#loadRecipes: Promise<File[]> | undefined;

	async recipes() {
		if (!this.#loadRecipes) {
			this.#loadRecipes = this.client.getFiles({
				folder: 'Recipes',
				extensions: ['md'],
			});
		}

		const files = await this.#loadRecipes;

		return files.map((file) => createRecipe(file));
	}
}
