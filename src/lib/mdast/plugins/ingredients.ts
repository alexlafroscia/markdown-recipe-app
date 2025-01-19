import type { Root, RootContent } from 'vault/mdast';
import type { Plugin } from 'unified';

import { getRecipePages } from '../utils/get-recipe-pages';
import { getSectionByHeader } from '../utils/get-section-by-header';

declare module 'mdast' {
	interface ListData {
		/**
		 * Marks a "list" within the document as being
		 * a list of ingredients for the recipe
		 */
		isIngredientList?: boolean;
	}

	interface ListItemData {
		/**
		 * A unique ID for this ingredient
		 */
		ingredientId?: string;
	}
}

function anootateListsAsIngredients(nodes: RootContent[]) {
	const lists = nodes.filter((child) => child.type === 'list');

	for (const list of lists) {
		list.data = {
			...list.data,
			isIngredientList: true,
		};

		list.children.map((listItem) => {
			listItem.data = {
				...listItem.data,
				ingredientId: crypto.randomUUID(),
			};
		});
	}
}

export const IdentifyIngredients: Plugin<[], Root> = () => {
	return function (ast) {
		const pages = getRecipePages(ast);

		for (const page of pages) {
			anootateListsAsIngredients(page);
		}

		const ingredientSection = getSectionByHeader(ast, 'Ingredients');
		if (ingredientSection) {
			anootateListsAsIngredients(ingredientSection);
		}
	};
};
