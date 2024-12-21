import { MarkdownDB } from 'mddb';

import { buildIndex } from './build-index';
import { createRecipe } from './recipe';
import type { Options } from './types';

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

	async withId(id: string) {
		const file = await this.client.getFileById(id);

		return file ? createRecipe(file) : null;
	}

	async recipes() {
		const files = await this.client.getFiles({
			folder: 'Recipes',
			extensions: ['md'],
		});

		return files.map((file) => createRecipe(file));
	}
}
