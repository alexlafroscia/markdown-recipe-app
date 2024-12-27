import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { zip2 } from '$lib/array';
import { RecipeDB } from '$lib/recipe';
import { parse } from '$lib/parse';

import { VAULT_PATH } from '$env/static/private';

export async function makeDB(vaultPath: string) {
	const markdownFiles = fs.glob(`${vaultPath}/Recipes/**/*.md`);

	const fullFilePaths = await Array.fromAsync(markdownFiles);
	const fileContents = await Promise.all(
		fullFilePaths.map((path) => {
			return fs.readFile(path);
		}),
	);

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

export const db = await makeDB(VAULT_PATH);
