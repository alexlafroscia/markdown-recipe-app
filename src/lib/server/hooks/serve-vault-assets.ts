import type { Handle } from '@sveltejs/kit';
import type { Asset } from 'vault/asset';

import { base } from '$app/paths';

function toFileName(url: URL) {
	let { pathname } = url;

	if (base) {
		pathname = pathname.replace(base, '');
	}

	return decodeURIComponent(pathname.substring(1));
}

export const serveVaultAssets: Handle = async ({ event, resolve }) => {
	const { vault } = event.locals;
	const filePath = vault.resolvePath(toFileName(event.url));

	if (filePath && !filePath.endsWith('.md')) {
		const asset = vault.resolve(filePath) as Asset;

		return new Response(asset.read());
	}

	return resolve(event);
};
