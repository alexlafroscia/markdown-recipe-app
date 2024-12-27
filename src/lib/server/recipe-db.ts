import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import glob from 'fast-glob';

import { zip2 } from '$lib/array';
import { RecipeDB } from '$lib/recipe';
import { makeParser, type MakeParserOptions } from '$lib/parse';

import { VAULT_PATH } from '$env/static/private';

export interface MakeDBOptions extends Required<MakeParserOptions> {}

export async function makeDB(options: MakeDBOptions) {
	const { vaultPath } = options;

	const fullFilePaths = await glob(`${vaultPath}/Recipes/**/*.md`);
	const fileContents = await Promise.all(
		fullFilePaths.map((path) => {
			return fs.readFile(path);
		}),
	);

	const parse = makeParser({
		vaultPath,
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
