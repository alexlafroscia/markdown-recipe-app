import type { ParseResult } from '$lib/parse';

export interface Recipe extends ParseResult {
	/**
	 * The user-facing name of the Recipe
	 */
	name: string;
}

export class RecipeDB {
	constructor(private store: Map<string, Recipe>) {}

	all(): Recipe[] {
		return Array.from(this.store.values());
	}

	withName(name: string): Recipe | undefined {
		return this.store.get(name);
	}
}
