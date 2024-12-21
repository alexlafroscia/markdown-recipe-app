import type { File } from './types';

export interface Recipe {
	title: string;
	ingredients: Ingredient[];
}

export interface Ingredient {}

export function createRecipe(file: File): Recipe {
	return {
		title: file.title,
		ingredients: JSON.parse(file.ingredients),
	};
}
