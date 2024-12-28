import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import glob from 'fast-glob';

import { zip2 } from '$lib/array';
import { RecipeDB } from '$lib/recipe';
import { makeParser } from '$lib/parse';

import { VAULT_PATH } from '$env/static/private';

export interface MakeDBOptions {
	/**
	 * The location of the Obsidian vault
	 */
	vaultPath: string;
}

export async function makeDB(options: MakeDBOptions) {
	const { vaultPath } = options;

	const fullFilePaths = await glob(`${vaultPath}/Recipes/**/*.md`);
	const fileContents = await Promise.all(
		fullFilePaths.map((path) => {
			return fs.readFile(path);
		}),
	);

	const parse = makeParser({
		permalinks: fullFilePaths.map((fullFilePath) => fullFilePath.replace(options.vaultPath, '')),

		href(permalink) {
			return permalink.includes('Recipes/') ? { type: 'internal' } : { type: 'external' };
		},
	});
	const parsedFiles = fileContents.map((fileContent) => parse(fileContent));

	return new RecipeDB(
		new Map(
			zip2(fullFilePaths, parsedFiles).map(([fullPath, parseResult]) => {
				const { name } = path.parse(fullPath);

				return [
					name,
					{
						name,
						...parseResult,
					},
				];
			}),
		),
	);
}

export const db = await makeDB({
	vaultPath: VAULT_PATH,
});
