import type { Image } from 'vault/mdast';
import type { File, FilePath } from 'vault/file';
import { find } from 'unist-util-find';

export interface Recipe extends Pick<File, 'ast' | 'frontmatter'> {
	/**
	 * The user-facing name of the Recipe
	 */
	name: string;

	image?: Image;
}

export function makeUrl(recipe: Pick<Recipe, 'name'>): string {
	return `/recipe/${recipe.name}`;
}

export function makeRecipe(filePath: FilePath, file: File): Recipe {
	const name = filePath.split('/').at(-1)?.replace('.md', '') as string;

	return {
		name,
		ast: file.ast,
		frontmatter: file.frontmatter,
		image: find(file.ast, { type: 'image' }),
	};
}
