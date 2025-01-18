import type { Root, RootContent } from 'vault/mdast';

export type Page = RootContent[];

function isPage(elements: RootContent[]): boolean {
	const allValidChildren = elements.every((element) => {
		return element.type === 'list' || element.type === 'paragraph';
	});

	return allValidChildren;
}

export function getRecipePages(ast: Root): Page[] {
	let sections: RootContent[][] = [];
	let section: RootContent[] = [];

	for (const child of ast.children) {
		if (child.type === 'thematicBreak') {
			sections.push(section);
			section = [];
		} else {
			section.push(child);
		}
	}

	// Handle the final page, after the last break
	if (section.length > 0) {
		sections.push(section);
	}

	// Only present valid pages
	return sections.filter((section) => isPage(section));
}
