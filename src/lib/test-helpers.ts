import { makeParser } from 'vault/test-helpers';

import { setupProcessor } from './mdast/plugins';

const parse = makeParser({
	options: {
		setupProcessor,
	},
});

export { parse };
