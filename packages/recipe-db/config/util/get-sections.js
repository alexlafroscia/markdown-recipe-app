export function getSections(ast) {
	let chunks = [];

	let chunk = [];

	for (const child of ast.children) {
		if (child.type !== 'thematicBreak') {
			chunk.push(child);
		} else {
			chunks.push(chunk);
			chunk = [];
		}
	}

	chunks.push(chunk);

	if (chunks.length > 0) {
		return chunks;
	}
}
