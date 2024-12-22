import type { Root } from 'mdast';
import type { File } from './types';

export interface Recipe {
	id: string;
	title: string;
	ingredients: Ingredient[];
	fullAST: Root;
}

export interface Ingredient {}

export function createRecipe(file: File): Recipe {
	return {
		id: file._id,
		title: file.title,
		ingredients: JSON.parse(file.ingredients),
		fullAST: JSON.parse(file.fullAST),
	};
}
