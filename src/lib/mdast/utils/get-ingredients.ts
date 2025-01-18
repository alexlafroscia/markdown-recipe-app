import type { Root, List, Node } from 'vault/mdast';
import { visit } from 'unist-util-visit';

function isList(node: Node): node is List {
	return node.type === 'list';
}

function isIngredientList(node: Node): node is List {
	return isList(node) && !!node.data?.isIngredientList;
}

export function getIngredients(node: Root): List | undefined {
	let ingredientLists: List[] | undefined;

	visit(node, isIngredientList, (list) => {
		ingredientLists = ingredientLists ?? [];
		ingredientLists.push(list);
	});

	if (!ingredientLists) {
		return ingredientLists;
	}

	if (ingredientLists.length === 1) {
		return ingredientLists[0];
	}

	// Combine individual lists into one
	const combinedList: List = {
		type: 'list',
		children: ingredientLists.flatMap((list) => list.children),
	};

	return combinedList;
}
