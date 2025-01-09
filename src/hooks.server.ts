import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { initVault } from '$lib/server/hooks/init-vault';
import { serveVaultAssets } from '$lib/server/hooks/serve-vault-assets';

export const handle: Handle = sequence(initVault, serveVaultAssets);
