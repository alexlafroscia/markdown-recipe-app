import type { Heading, Root, RootContent } from 'vault/mdast';

import { getText } from './get-text';

/**
 * Gets the nodes under the header with the given {@linkcode headerText}
 */
export function getSectionByHeader(ast: Root, headerText: string): RootContent[] | undefined {
	let startingHeader: Heading | undefined;
	let nodes: RootContent[] | undefined = undefined;

	function isStartingNode(node: RootContent): node is Heading {
		return !startingHeader && node.type === 'heading' && getText(node) === headerText;
	}

	function isEndingNode(node: RootContent): boolean {
		return !!startingHeader && node.type === 'heading' && node.depth <= startingHeader.depth;
	}

	for (const child of ast.children) {
		if (isStartingNode(child)) {
			startingHeader = child;
			continue;
		}

		if (!startingHeader) {
			continue;
		}

		if (isEndingNode(child)) {
			break;
		} else {
			nodes = nodes ?? [];
			nodes.push(child);
		}
	}

	return nodes;
}
