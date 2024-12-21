import { getSections } from './get-sections.js';

function isStep(section) {
	const [firstChild] = section;

	return firstChild?.type === 'list' ?? false;
}

export function getSteps(ast) {
	const sections = getSections(ast);

	if (sections) {
		const steps = sections.filter((section) => isStep(section));

		if (steps.length) {
			return steps;
		}
	}
}
