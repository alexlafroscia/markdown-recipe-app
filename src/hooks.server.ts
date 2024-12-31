import * as path from 'node:path';

import type { Handle } from '@sveltejs/kit';
import { VAULT_PATH } from '$env/static/private';
import { Vault } from 'vault';

const vault = await Vault.init({
	vaultPath: VAULT_PATH,

	externalize(internalPath) {
		const parsed = path.parse(internalPath);

		// Non-`Recipes` links should be opened in Obsidian
		if (parsed.dir !== 'Recipes') {
			return `obsidian://open?file=${internalPath}`;
		}

		// `.md` links within `Recipes` are navigable within the app
		if (parsed.ext === '.md') {
			return `/recipes/${parsed.name}`;
		}

		// Non-`.md` files within `Recipes` are images; resolve as static assets
		return `/static/${internalPath}`;
	},
});

export const handle: Handle = async ({ event, resolve }) => {
	// Attach `vault` local for all request handlers
	event.locals.vault = vault;

	return resolve(event);
};
