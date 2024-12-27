import type { Root } from 'mdast';
import { unified } from 'unified';
import remarkParse from 'remark-parse';

import { type Frontmatter, remarkFrontmatter, matter } from './frontmatter';

const parser = unified().use(remarkParse).use(remarkFrontmatter, ['yaml']);

export interface ParseResult {
	ast: Root;
	frontmatter: Frontmatter;
}

export function parse(doc: Buffer): ParseResult {
	const ast = parser.parse(doc);

	return {
		ast,
		frontmatter: matter(ast),
	};
}
