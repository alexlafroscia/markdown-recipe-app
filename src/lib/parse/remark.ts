import type { Root } from 'mdast';
import { unified } from 'unified';
import remarkParse from 'remark-parse';

import { type Frontmatter, remarkFrontmatter, matter } from './frontmatter';

export interface ParseResult {
	ast: Root;
	frontmatter: Frontmatter;
}

export interface MakeParserOptions {
	/**
	 * The path to the root of the vault
	 *
	 * If provided, this path is used to resolve internal links
	 * within the document.
	 *
	 * If not provided, no paths will be resolved.
	 */
	vaultPath?: string;
}

export function makeParser(options: MakeParserOptions = {}) {
	const parser = unified().use(remarkParse).use(remarkFrontmatter, ['yaml']);

	return function parse(doc: Buffer | string): ParseResult {
		const ast = parser.parse(doc);

		return {
			ast,
			frontmatter: matter(ast),
		};
	};
}
