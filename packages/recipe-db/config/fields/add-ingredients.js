function isIngredient(node) {
	return node.children.some(
		(child) => child.type === 'text' && child.value.toLowerCase() === 'ingredients',
	);
}

export function addIngredients(fileInfo, ast) {
	const headerNode = ast.children.find((node) => node.type === 'heading' && isIngredient(node));

	if (headerNode) {
		const headerIndex = ast.children.indexOf(headerNode);
		const maybeList = ast.children[headerIndex + 1];

		if (maybeList && maybeList.type === 'list') {
			fileInfo.ingredients = JSON.stringify(
				maybeList.children.map(
					(child) =>
						// List item
						// Value
						// Text
						// Paragraph
						child.children[0].children[0].value,
				),
			);
			return;
		}
	}

	fileInfo.ingredients = [];
}
