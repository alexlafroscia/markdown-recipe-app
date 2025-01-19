import type { List } from 'vault/mdast';
import { SvelteMap } from 'svelte/reactivity';

export type IngredientStateMap = SvelteMap<string, boolean | undefined>;

export function makeIngredientStateMap(list: List): IngredientStateMap {
	if (!list.data?.isIngredientList) {
		throw new Error('Not an ingredient list');
	}

	const state: IngredientStateMap = new SvelteMap();

	for (const item of list.children) {
		if (!item.data?.ingredientId) {
			throw new Error('Not an ingredient');
		}

		state.set(item.data.ingredientId, false);
	}

	return state;
}
