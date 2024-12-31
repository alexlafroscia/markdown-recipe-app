import type { File, FilePath } from 'vault/file';

export interface Recipe extends Pick<File, 'ast' | 'frontmatter'> {
	/**
	 * The user-facing name of the Recipe
	 */
	name: string;
}

export function makeRecipe(filePath: FilePath, file: File): Recipe {
	const name = filePath.split('/').at(-1)?.replace('.md', '') as string;

	return {
		name,
		ast: file.ast,
		frontmatter: file.frontmatter,
	};
}
