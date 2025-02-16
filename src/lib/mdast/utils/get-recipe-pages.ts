import type { Root, RootContent, List } from 'vault/mdast';
import { getSectionByHeader } from './get-section-by-header';

export type Page = RootContent[];

function isPage(elements: RootContent[]): boolean {
	const allValidChildren = elements.every((element) => {
		return element.type === 'list' || element.type === 'paragraph';
	});

	return allValidChildren;
}

function isOrderedList(element: RootContent): element is List & { ordered: true } {
	return (element.type === 'list' && element.ordered) ?? false;
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
	let pages = sections.filter((section) => isPage(section));
	if (pages.length > 0) {
		return pages;
	}

	// If there are no sections, look for a numbered list under a reasonable
	// header
	section = getSectionByHeader(ast, 'Directions') ?? getSectionByHeader(ast, 'Steps') ?? [];

	const list = section.find((element) => isOrderedList(element));

	if (list) {
		return list.children.map((element) => element.children);
	}

	return [];
}
