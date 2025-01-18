import type { Processor } from 'vault/parser';

import { IdentifyIngredients } from './ingredients';

export function setupProcessor(processor: Processor): Processor {
	return processor.use(IdentifyIngredients);
}
