import type { Root } from 'mdast';

/**
 * Returns a copy of {@linkcode doc} without child nodes that are
 * actually the frontmatter
 */
export function removeFrontmatter(doc: Root): Root {
	const { children, ...rest } = doc;
	const clone = [...children];

	const firstNode = clone[0];

	// Looks like we have frontmatter; otherwise the file would not
	// start with a "break"
	if (firstNode?.type === 'thematicBreak') {
		// Pop off the first node
		clone.shift();

		while (true) {
			// Pop off the next node
			const topNode = clone.shift();

			// If it's the next break, we can stop
			if (!topNode || topNode.type === 'thematicBreak') {
				break;
			}
		}
	}

	return { ...rest, children: clone };
}
