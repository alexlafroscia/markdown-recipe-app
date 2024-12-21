import type { MarkdownDB } from 'mddb';

export type File = Awaited<ReturnType<MarkdownDB['getFiles']>>[0];

export interface Options {
	vaultPath: string;

	indexPath: string;
}
