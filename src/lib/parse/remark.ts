import type { Root } from 'mdast';
import { unified } from 'unified';
import remarkParse from 'remark-parse';

import { type Frontmatter, remarkFrontmatter, matter } from './frontmatter';
import {
	remarkWikiLink,
	makeOptions as makeRemarkWikiLinkOptions,
	type MakeOptionsOptions as MakeRemarkWikiLinkOptionsOptions,
} from './wiki-link';

export interface ParseResult {
	ast: Root;
	frontmatter: Frontmatter;
}

export interface MakeParserOptions extends Partial<MakeRemarkWikiLinkOptionsOptions> {}

export function makeParser(options: MakeParserOptions = {}) {
	const parser = unified()
		.use(remarkParse)
		.use(remarkFrontmatter, ['yaml'])
		.use(
			remarkWikiLink,
			makeRemarkWikiLinkOptions({
				// Defaults
				permalinks: [],
				href(permalink) {
					return { type: 'external', permalink };
				},

				// Overrides
				...options,
			}),
		);

	return function parse(doc: Buffer | string): ParseResult {
		const ast = parser.parse(doc);

		return {
			ast,
			frontmatter: matter(ast),
		};
	};
}
