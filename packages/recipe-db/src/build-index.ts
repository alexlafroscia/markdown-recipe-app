import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { execa } from 'execa';
import * as url from 'node:url';

import type { Options } from './types';

import { mddbBinPath } from './mddb-cli';

const INDEX_NAME = 'markdown.db';

const currentFileName = path.dirname(url.fileURLToPath(import.meta.url));
const BASE_CONFIG_FILE_PATH = path.resolve(currentFileName, '../config/markdowndb.config.js');

/**
 * @param options
 * @returns path to the `mddb` index
 */
export async function buildIndex(options: Options): Promise<string> {
	// Ensure the index directory exists
	await fs.mkdir(options.indexPath, {
		recursive: true,
	});

	// Build the index
	await execa({
		cwd: options.indexPath,
		preferLocal: true,
	})`${mddbBinPath} ${options.vaultPath} ${BASE_CONFIG_FILE_PATH}`;

	// Return a path to the index to load
	return path.join(options.indexPath, INDEX_NAME);
}
