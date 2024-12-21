import * as path from 'node:path';

export function addTitleField(fileInfo) {
	const fileName = path.basename(fileInfo.url_path);
	const decoded = decodeURIComponent(fileName);

	fileInfo.title = decoded;
}
