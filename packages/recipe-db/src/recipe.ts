import type { File } from './types';

interface Recipe {
	title: string;
}

export function createRecipe(file: File): Recipe {
	return {
		title: file.title,
	};
}
