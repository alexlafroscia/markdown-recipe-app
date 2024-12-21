import { expect, test, vi } from 'vitest';

import { RecipeDB } from 'recipe-db';
import { client } from './recipe-db';

vi.mock('recipe-db', () => {
	return {
		RecipeDB: class MockRecipeDB {
			static init() {
				return Promise.resolve('MOCK_CLIENT');
			}
		},
	};
});

test('retreiving the client', () => {
	expect(client).toBe('MOCK_CLIENT');
});
