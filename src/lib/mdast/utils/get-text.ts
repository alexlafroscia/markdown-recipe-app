import type { Node, Literal, Text } from 'vault/mdast';
import { visit } from 'unist-util-visit';

function isLiteral(node: Node): node is Literal {
	return node.type === 'text' || node.type === 'code' || node.type === 'inlineCode';
}

export function getText(node: Node): string {
	let text = '';

	visit(node, isLiteral, (literal) => {
		text += literal.value;
	});

	return text;
}
