import * as path from 'node:path';

import type { Handle } from '@sveltejs/kit';
import { Vault } from 'vault';

import { VAULT_PATH } from '$env/static/private';

const vault = await Vault.init({
	vaultPath: VAULT_PATH,

	externalize(internalPath) {
		const parsed = path.parse(internalPath);

		if (parsed.ext === '.md') {
			// Non-`Recipes` links should be opened in Obsidian
			if (parsed.dir !== 'Recipes') {
				return `obsidian://open?file=${internalPath}`;
			}

			// `.md` links within `Recipes` are navigable within the app
			return `/recipe/${parsed.name}`;
		}

		// Non-`.md` files within `Recipes` are images; resolve as static assets
		return `/${internalPath}`;
	},
});

export const initVault: Handle = ({ event, resolve }) => {
	event.locals.vault = vault;

	return resolve(event);
};
