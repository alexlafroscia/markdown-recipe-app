import { getSteps } from '../util/get-steps.js';

function isIngredient(node) {
	return node.children.some(
		(child) => child.type === 'text' && child.value.toLowerCase() === 'ingredients',
	);
}

function getListContents(ast) {
	return ast.children.map(
		(child) =>
			// List item
			// Value
			// Text
			// Paragraph
			child.children[0].children[0].value,
	);
}

function getIngredientsFromHeading(ast) {
	const headerNode = ast.children.find((node) => node.type === 'heading' && isIngredient(node));

	if (headerNode) {
		const headerIndex = ast.children.indexOf(headerNode);
		const maybeList = ast.children[headerIndex + 1];

		if (maybeList && maybeList.type === 'list') {
			return getListContents(maybeList);
		}
	}
}

function getIngredientsFromSteps(steps) {
	return steps.flatMap((step) => getListContents(step[0]));
}

export function addIngredients(fileInfo, ast) {
	const steps = getSteps(ast);

	if (steps) {
		fileInfo.ingredients = getIngredientsFromSteps(steps) ?? [];
	} else {
		fileInfo.ingredients = getIngredientsFromHeading(ast) ?? [];
	}
}
